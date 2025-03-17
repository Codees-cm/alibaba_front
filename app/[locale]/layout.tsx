/* eslint-disable @next/next/no-sync-scripts */
// "use client"
import React, { ReactNode } from 'react'
import TanstackProvider from '../providers/TanstackProvider'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { Toaster } from "@/components/ui/toaster"

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
 
  return (
    <>
      <html lang={locale}  dir={dir(locale)}>
      <head>
          {/* <link rel='manifest' href='/manifest.json' /> */}
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="./manifest.json" />
        </head>
        <body style={{ overflowX: "hidden" }}>
            <TanstackProvider>
              {children}
        </TanstackProvider>
        <Toaster />
        </body>
      </html>
    </>


  )
}

