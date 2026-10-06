import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 링크를 공유할 때 보이는 썸네일 (모든 페이지 공통)
export const alt = "링크 - 흩어진 링크를 한곳에 모아 보세요";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 이 이미지에 쓰인 글자만 담은 Noto Sans KR Bold (SIL OFL)
// 문구를 바꾸면 assets 폰트도 새 글자를 포함하도록 다시 받아야 한다.
const notoSansKr = await readFile(
  join(process.cwd(), "assets/NotoSansKR-Bold-subset.ttf"),
);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#ffffff",
          fontFamily: "Noto Sans KR",
          borderBottom: "24px solid #2ac1bc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 144,
              height: 144,
              borderRadius: 40,
              background: "#2ac1bc",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <div
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 36,
                height: 36,
                borderRadius: 18,
                background: "#ffd600",
                border: "6px solid #ffffff",
              }}
            />
          </div>
          <div style={{ fontSize: 120, color: "#1e1e1e" }}>링크</div>
        </div>
        <div style={{ marginTop: 56, fontSize: 64, color: "#1e1e1e" }}>
          흩어진 링크를 한곳에 모아 보세요
        </div>
        <div style={{ marginTop: 16, fontSize: 40, color: "#1a9e99" }}>
          폴더별로 정리하는 나만의 북마크
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans KR", data: notoSansKr, weight: 700 }],
    },
  );
}
