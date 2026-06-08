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
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Grid icon */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: "#00FF88" }} />
              <div style={{ width: 18, height: 18, borderRadius: 4, background: "#00CC6A" }} />
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: "#009950" }} />
              <div style={{ width: 18, height: 18, borderRadius: 4, background: "#006633" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>API</span>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#00FF88", letterSpacing: -1, fontFamily: "monospace" }}>Vault</span>
          </div>
        </div>

        {/* Main text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            The Developer Directory
            <br />
            of{" "}
            <span style={{ color: "#00FF88" }}>Free AI APIs.</span>
          </div>
          <div style={{ fontSize: 26, color: "#888", fontWeight: 400, maxWidth: 700 }}>
            Ranked transparently · Copy-paste code on every page.
          </div>
        </div>

        {/* Bottom pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["LLM", "Image", "Speech", "Embeddings", "Search", "Video"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#aaa",
                fontSize: 16,
                fontFamily: "monospace",
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
