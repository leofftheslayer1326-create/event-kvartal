import { ImageResponse } from "next/og";
import { brand } from "@/lib/config";

export const runtime = "edge";
export const alt = brand.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 18% 20%, #FFC93C 0%, transparent 35%)," +
            "radial-gradient(circle at 82% 30%, #FF5A5F 0%, transparent 35%)," +
            "radial-gradient(circle at 50% 100%, #A06CD5 0%, transparent 45%)," +
            "linear-gradient(180deg, #FFF6E8 0%, #FDECD3 100%)",
          fontFamily: "system-ui",
          color: "#1a1226",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#1a1226",
              color: "#fff6e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            eК
          </div>
          <div style={{ display: "flex", fontWeight: 700, fontSize: 28 }}>
            event·квартал
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            Праздник, который запомнят все.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              opacity: 0.7,
              maxWidth: 800,
              lineHeight: 1.35,
            }}
          >
            Детские ДР, утренники, выпускные и шоу-программы под ключ
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            opacity: 0.55,
          }}
        >
          <div style={{ display: "flex" }}>
            {brand.city} · 4 года · 500+ праздников
          </div>
          <div style={{ display: "flex" }}>{brand.phone}</div>
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 160,
            right: 120,
            fontSize: 96,
          }}
        >
          🎈
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 90,
            right: 260,
            fontSize: 64,
          }}
        >
          🎉
        </div>
      </div>
    ),
    { ...size }
  );
}
