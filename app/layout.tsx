import type React from "react"
import "@/app/globals.css"
import { Pretendard } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "이민주 - 프론트엔드 개발자 포트폴리오",
  description: "감성적이면서도 정돈된 코드를 작성하는 프론트엔드 개발자 이민주의 포트폴리오입니다.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={Pretendard.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
