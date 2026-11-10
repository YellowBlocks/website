import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded social sharing image: charcoal field, block mark, title. */
export function renderOg(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "radial-gradient(circle at 50% 0%, #2a2412 0%, #0c0e12 60%)", padding: 72, color: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 44, height: 44, gap: 4 }}>
            <div style={{ width: 20, height: 20, border: "2px dashed #3a404b" }} />
            <div style={{ width: 20, height: 20, background: "#fec61f" }} />
            <div style={{ width: 20, height: 20, background: "#ffffff" }} />
            <div style={{ width: 20, height: 20, background: "#ffffff" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, color: "#f2f2f2" }}>YellowBlocks</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#8e95a3", marginBottom: 20 }}>{kicker}</div>
          <div style={{ fontSize: title.length > 70 ? 54 : 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#fec61f" }} />
      </div>
    ),
    ogSize,
  );
}
