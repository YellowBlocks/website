import Link from "@/components/ui/Link";
import type { ReactNode } from "react";
import type { PortableText, PtBlock, PtSpan } from "@/lib/content/types";

/** Renders the Portable Text subset used by YellowBlocks content. */
function renderSpan(span: PtSpan, block: PtBlock): ReactNode {
  let node: ReactNode = span.text;
  for (const mark of span.marks ?? []) {
    if (mark === "strong") node = <strong key={`${span._key}s`}>{node}</strong>;
    else if (mark === "em") node = <em key={`${span._key}e`}>{node}</em>;
    else if (mark === "code") node = <code key={`${span._key}c`}>{node}</code>;
    else {
      const def = block.markDefs.find((d) => d._key === mark);
      if (def) {
        const internal = def.href.startsWith("/");
        node = internal ? (
          <Link key={`${span._key}l`} href={def.href} className="link">
            {node}
          </Link>
        ) : (
          <a key={`${span._key}l`} href={def.href} className="link" rel="noopener noreferrer" target="_blank">
            {node}
          </a>
        );
      }
    }
  }
  return <span key={span._key}>{node}</span>;
}

const inline = (b: PtBlock) => b.children.map((c) => renderSpan(c, b));

export function PortableTextView({ value }: { value: PortableText }) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < value.length) {
    const block = value[i];
    if (block.listItem) {
      const type = block.listItem;
      const items: PtBlock[] = [];
      while (i < value.length && value[i].listItem === type) items.push(value[i++]);
      const List = type === "number" ? "ol" : "ul";
      out.push(
        <List key={block._key}>
          {items.map((it) => (
            <li key={it._key}>{inline(it)}</li>
          ))}
        </List>,
      );
      continue;
    }
    if (block.style === "h2") out.push(<h2 key={block._key}>{inline(block)}</h2>);
    else if (block.style === "h3") out.push(<h3 key={block._key}>{inline(block)}</h3>);
    else if (block.style === "blockquote") out.push(<blockquote key={block._key}>{inline(block)}</blockquote>);
    else out.push(<p key={block._key}>{inline(block)}</p>);
    i++;
  }
  return <div className="prose-yb">{out}</div>;
}
