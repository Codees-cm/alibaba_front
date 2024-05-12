"use client"
import React, { useState } from 'react'
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { uploadEditorFile } from '@/lib/actions';
import { useProducts } from '@/hooks/stock_manage/use-product';
function Editor(id) {
    const [text, setText] = useState("hello md-editor-rt！");
    const { createProductMarkdown,isCreatingProductsMarkdown,}=useProducts()
    const handleSave = async () => {
        const fileName = 'editor_content.md'; // Define the filename for the content

        try {
            const response = await uploadEditorFile(text, fileName); // Upload content to S3
            const payload = {
                product_id: id.id,
                file_url:`https://larcraft-storage.s3.eu-north-1.amazonaws.com/${fileName}`
            }
            await createProductMarkdown(payload)
            console.log("File uploaded successfully:", response);
        } catch (error) {
            console.error("Failed to upload file:", error);
        }
    };

    return (
        <MdEditor
            language='en-US'
            modelValue={text}
            onChange={(modelValue) => {
                setText(modelValue);
            }}
            onSave={handleSave} // Call handleSave when onSave is triggered
        />
    );
}

export default Editor;