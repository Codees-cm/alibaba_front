"use client"
import React, { useEffect, useState } from 'react'
import Editor from '@/components/Editor'
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  params: {
    
      id: string;
  };  
};
export default function Page({ params }:Props) {
 

// console.log()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-100 to-white">
    
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        {params.id ? (
          <Editor id={params.id}  />
        ) : (
          <p>No valid ID found in the URL path</p>
        )}
      </div>
    </div>
  )
}
