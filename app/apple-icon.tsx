import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Solid apple-touch icon so iOS home screens get a crisp branded tile. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F0",
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: 999,
            background: "linear-gradient(145deg, #A0CC75 0%, #3B8846 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
