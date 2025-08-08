
import React, { ReactNode } from 'react'
// import {NextIntlClientProvider} from 'next-intl';
import TanstackProvider from '../providers/TanstackProvider'
// import NextIntClint
import { dir } from 'i18next'
import { languages } from '../i18n/settings'



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
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#3a3a3c" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="onerp-cm" />
          <link rel='manifest' href='/manifest.json' />
          <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </head>
        <body style={{ overflowX: "hidden" }}>
            <TanstackProvider>
            {children}
        </TanstackProvider>
        
      {/* swDev() */}
        </body>
      </html>
    </>


  )
}

