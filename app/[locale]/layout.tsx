"use client"

import React, { ReactNode } from 'react'
import TanstackProvider from '../providers/TanstackProvider'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { Toaster } from "@/components/ui/toaster"


// We're keeping this as a client component so we can use hooks
export default function LocaleLayout({
                                         children,
                                         params: {locale}
                                     }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    // The orders will be fetched via React Query at the Sidebar component level
    // This allows the data to be cached and shared across the application

    return (
        <html lang={locale} dir={dir(locale)}>
        <head>
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
    )
}