import { ImageResponse } from "next/og";

export const alt = "CK Works — Websites. Systems. Clarity.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #FAF7F0 0%, #E8F0E4 48%, #DDE8D8 100%)",
          color: "#1F2420",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "linear-gradient(145deg, #A0CC75 0%, #3B8846 100%)",
            }}
          />
          CK Works
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Websites. Systems. Clarity.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5F665F",
              maxWidth: 720,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Clean websites and practical systems for growing businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#2F5B3F",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          ckworks.co
        </div>
      </div>
    ),
    { ...size },
  );
}
