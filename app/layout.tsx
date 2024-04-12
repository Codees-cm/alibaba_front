
import React, { ReactNode } from 'react'

import TanstackProvider from './providers/TanstackProvider'


interface Props {
  children: ReactNode
}

export default async function layout({ children }: Props) {

  return (
    <>
      <html lang="en">
      <head>
          <link rel='manifest' href='/manifest.json' />
          <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </head>
        <body>
            <TanstackProvider>
              {children}
            </TanstackProvider>
        
      {/* swDev() */}
        </body>
      </html>
    </>


  )
}

