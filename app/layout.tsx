import type React from "react"
import "@/app/globals.css"
import { Pretendard } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script";

export const metadata = {
  title: "이민주 - 프론트엔드 개발자 포트폴리오",
  description: "감성적이면서도 정돈된 코드를 작성하는 프론트엔드 개발자 이민주의 포트폴리오입니다.",
  generator: 'v0.dev'
}

import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { Pretendard } from "@/lib/fonts"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics (GA4) Script 삽입 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M532B6V4EB"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M532B6V4EB');
            `,
          }}
        />
      </head>
      <body className={Pretendard.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

