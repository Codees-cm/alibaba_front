import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response("No file uploaded", { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'receipt.png');
        await fs.writeFile(filePath, Buffer.from(buffer));

        return new Response(JSON.stringify({ success: true, filePath }), { status: 200 });
    } catch (error) {
        console.error('Error saving image:', error);
        return new Response("Failed to save image", { status: 500 });
    }
};
