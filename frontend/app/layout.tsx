import type { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: "AI 360 Camera",
  description: "Surveillance & Tracking System",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
