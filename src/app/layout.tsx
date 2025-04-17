import type React from "react"
import "../assets/stylesheets/globals.css"
import { Inter, Poppins } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastContainer } from "react-toastify"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Neopets",
  description: "Cuide da saúde de seu pet, com atendimento prioritário e agendamento on-line!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ToastContainer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
