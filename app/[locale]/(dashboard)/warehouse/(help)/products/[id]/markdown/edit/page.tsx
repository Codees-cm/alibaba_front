"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/components/Editor";
import { usePathname, useSearchParams } from "next/navigation";

export default function Page() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [markdownContent, setMarkdownContent] = useState<string | null>(null);

    // Extract product ID from the URL path
    const parts = pathname.split("/");
    const productIndex = parts.indexOf("products") + 1;
    const markdownIndex = parts.indexOf("markdown");
    const id =
        parts[productIndex] && parts[productIndex] !== "markdown" && productIndex < markdownIndex
            ? parts[productIndex]
            : null;

    // Fetch the markdown content using the file_url query parameter
    useEffect(() => {
        const fetchMarkdownContent = async () => {
            const file_url = searchParams.get("file_url");
            if (file_url) {
                try {
                    const response = await fetch(file_url);
                    const text = await response.text();
                    setMarkdownContent(text);
                } catch (error) {
                    console.error("Failed to fetch markdown content:", error);
                }
            }
        };

        fetchMarkdownContent();
    }, [searchParams]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-100 to-white">
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
                {id ? (
                    <Editor id={id} initialContent={markdownContent} />
                ) : (
                    <p>No valid ID found in the URL path</p>
                )}
            </div>
        </div>
    );
}
