
import React, { ReactNode } from 'react'
import AuthProvider from './providers/AuthProvider'
import TanstackProvider from './providers/TanstackProvider'
// import swDev from './swDev'

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
          <AuthProvider>
            <TanstackProvider>
              {children}
            </TanstackProvider>
          </AuthProvider>

        
      {/* swDev() */}
        </body>
      </html>
    </>


  )
}

