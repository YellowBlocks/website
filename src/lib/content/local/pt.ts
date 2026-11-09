import type { PortableText, PtBlock, PtLinkDef, PtSpan } from "../types";

/**
 * Converts a small markdown dialect into Portable Text, so seed articles are
 * written readably here and imported into Sanity in their native format.
 * Supported: paragraphs, ## / ### headings, > quotes, - bullets, 1. numbers,
 * **bold**, *italic*, `code`, [label](https://url).
 */
let counter = 0;
const key = () => `k${(counter++).toString(36)}`;

function parseInline(text: string): { children: PtSpan[]; markDefs: PtLinkDef[] } {
  const children: PtSpan[] = [];
  const markDefs: PtLinkDef[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) children.push({ _type: "span", _key: key(), text: text.slice(last, index), marks: [] });
    const token = match[0];
    if (token.startsWith("**")) {
      children.push({ _type: "span", _key: key(), text: token.slice(2, -2), marks: ["strong"] });
    } else if (token.startsWith("`")) {
      children.push({ _type: "span", _key: key(), text: token.slice(1, -1), marks: ["code"] });
    } else if (token.startsWith("[")) {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/) ?? [];
      const linkKey = key();
      markDefs.push({ _type: "link", _key: linkKey, href });
      children.push({ _type: "span", _key: key(), text: label, marks: [linkKey] });
    } else {
      children.push({ _type: "span", _key: key(), text: token.slice(1, -1), marks: ["em"] });
    }
    last = index + token.length;
  }
  if (last < text.length) children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return { children, markDefs };
}

export function pt(markdown: string): PortableText {
  const blocks: PtBlock[] = [];
  const paragraphs = markdown
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim());

  for (const para of paragraphs) {
    const lines = para.split("\n").map((l) => l.trim());
    if (lines.every((l) => /^- /.test(l))) {
      for (const line of lines) blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, ...parseInline(line.slice(2)) });
      continue;
    }
    if (lines.every((l) => /^\d+\. /.test(l))) {
      for (const line of lines) blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "number", level: 1, ...parseInline(line.replace(/^\d+\. /, "")) });
      continue;
    }
    const joined = lines.join(" ");
    if (joined.startsWith("### ")) blocks.push({ _type: "block", _key: key(), style: "h3", ...parseInline(joined.slice(4)) });
    else if (joined.startsWith("## ")) blocks.push({ _type: "block", _key: key(), style: "h2", ...parseInline(joined.slice(3)) });
    else if (joined.startsWith("> ")) blocks.push({ _type: "block", _key: key(), style: "blockquote", ...parseInline(joined.slice(2)) });
    else blocks.push({ _type: "block", _key: key(), style: "normal", ...parseInline(joined) });
  }
  return blocks;
}

/** Plain text of a Portable Text document (reading time, excerpts). */
export function ptToPlain(body: PortableText): string {
  return body.map((b) => b.children.map((c) => c.text).join("")).join("\n\n");
}
