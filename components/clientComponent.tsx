"use client"

import { SessionProvider } from "next-auth/react"
import { Nunito } from 'next/font/google'

const nunito = Nunito({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
  subsets: ['latin' ]})

export default function ClientComponent({
    children,
    }: {
    children: React.ReactNode
    }) {
        return (
            <SessionProvider session={undefined}>
            <html lang="en">
              <body className={nunito.className}>{children}</body>
            </html>
            </SessionProvider>
          )
    }