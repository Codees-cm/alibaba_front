"use client";
import React, { useEffect, useState } from 'react';
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useProducts } from '@/hooks/stock_manage/use-product';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from "@/lib/edgestore";
type EditorProps = {
    param: any;
    initialContent?: string | null;
};

function Editor({ param, initialContent }: EditorProps) {
    const [text, setText] = useState(initialContent || "Product details ....");
    const { edgestore } = useEdgeStore();
console.log(param)

    const { createProductMarkdown, isCreatingProductsMarkdown ,markdown_update_product } = useProducts(false,param.id);
    const router = useRouter();

    useEffect(() => {
        if (initialContent) {
            setText(initialContent);
        }
    }, [initialContent]);
    
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
                product_id: param.id,
                file_url: res.url
            };

            await createProductMarkdown(payload);
            router.back();
        } catch (error) {
            console.error("Failed to upload file:", error);
        }
    };

    const handleUpdate = async () => {

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
                id:param.key,
                product_id: param.id,
                file_url: res.url
            };

            await markdown_update_product(payload);
            localStorage.removeItem(param.key);
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
             {
                initialContent ? (<>
            <button onClick={handleUpdate} className='text-sm font-semibold text-white mt-3 rounded-lg p-2  bg-orange-500 border-slate-950'>update</button>
                </>) : (<>
                    <button onClick={handleSave} className='text-sm font-semibold text-white mt-3 rounded-lg p-2  bg-orange-500 border-slate-950'>Save</button>
                </>)
             }
        </div>
    );
}

export default Editor;
