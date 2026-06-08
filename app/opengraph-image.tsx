import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "APIVault — The Developer Directory of Free AI APIs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0B0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: "#00FF88" }} />
              <div style={{ width: 20, height: 20, borderRadius: 5, background: "#00CC6A" }} />
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: "#009950" }} />
              <div style={{ width: 20, height: 20, borderRadius: 5, background: "#006633" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#ffffff" }}>API</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#00FF88" }}>Vault</span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 68, fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
              The Developer Directory
            </span>
            <span style={{ fontSize: 68, fontWeight: 800, color: "#00FF88", lineHeight: 1.1 }}>
              of Free AI APIs.
            </span>
          </div>
          <span style={{ fontSize: 28, color: "#888888", fontWeight: 400 }}>
            Ranked transparently · Copy-paste code on every page.
          </span>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["LLM", "Image", "Speech", "Embeddings", "Search", "Video"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "1px solid #333333",
                background: "#1a1a1a",
                color: "#aaaaaa",
                fontSize: 18,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
