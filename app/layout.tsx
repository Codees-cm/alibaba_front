
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

