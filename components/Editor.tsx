"use client";
import React, { useState } from 'react';
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useProducts } from '@/hooks/stock_manage/use-product';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from "@/lib/edgestore";

function Editor(id: { id: any; }) {
    const [text, setText] = useState("hello md-editor-rt！");
    const { createProductMarkdown, isCreatingProductsMarkdown } = useProducts();
    const { edgestore } = useEdgeStore();
    const router = useRouter();

    const generateRandomFilename = () => {
        const timestamp = new Date().getTime();
        return `editor_content_${timestamp}.md`;
    };

    const handleSave = async () => {
        const fileName = generateRandomFilename();

        try {
            const file = new File([text], fileName, { type: 'text/markdown' });

            const res = await edgestore.myPublicImages.upload({
                file,
                onProgressChange: (progress) => {
                    console.log(progress);
                }
            });

            const payload = {
                product_id: id.id,
                file_url: res.url
            };

            await createProductMarkdown(payload);
            router.back();
        } catch (error) {
            console.error("Failed to upload file:", error);
        }
    };

    return (
        <div>
            <MdEditor
                style={{ zIndex: "300" }}
                language='en-US'
                modelValue={text}
                onChange={(modelValue) => {
                    setText(modelValue);
                }}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Editor;
