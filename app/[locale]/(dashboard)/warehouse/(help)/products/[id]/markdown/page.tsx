"use client"
import React from 'react'
import Editor from '@/components/Editor'
import { usePathname } from 'next/navigation'

export default function Page() {
  const pathname = usePathname()

  // Extract the number between "products" and "markdown"
  const parts = pathname.split('/')
  const productIndex = parts.indexOf('products') + 1
  const markdownIndex = parts.indexOf('markdown')
  const id = parts[productIndex] && parts[productIndex] !== 'markdown' && productIndex < markdownIndex ? parts[productIndex] : null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-100 to-white">
    
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        {id ? (
          <Editor id={id} />
        ) : (
          <p>No valid ID found in the URL path</p>
        )}
      </div>
    </div>
  )
}
