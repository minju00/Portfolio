import { Noto_Sans_KR } from "next/font/google"
import localFont from "next/font/local"

export const NotoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

// Pretendard 폰트 (로컬 폰트로 가정)
export const Pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Noto Sans KR", "sans-serif"],
})
