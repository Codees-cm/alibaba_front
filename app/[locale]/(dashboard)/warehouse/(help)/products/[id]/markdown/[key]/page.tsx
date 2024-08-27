"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/components/Editor";
type Props = {
    params: {
        key: string;
        id: string;
    };  
 };
export default function Page({ params }:Props) {
    const [content, setContent] = useState("");
console.log(params)

    useEffect(() => {
        const storedContent = localStorage.getItem(params.key);
        if (storedContent) {
          setContent(storedContent);
        }
      }, [params.key]);
    console.log(content,params.id)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-100 to-white">
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
            {(params.id && content) ? (
                    <Editor param={params} initialContent={content} />
            ) : (
            <p>No valid ID found in the URL path</p>
            )}
            </div>
        </div>
    );
}
