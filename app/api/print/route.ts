import escpos from 'escpos';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
    
        const { filePath } = await req.json();

        if (!filePath) {
            return new Response("No file path provided", { status: 400 });
        }
        try {
            const response = await fetch('http://localhost:4000/print', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ filePath }),
            });
        
            const result = await response.json();
        
            if (response.ok) {
                return new Response(result, { status: 200 });
            //   res.status(200).json(result);
            } else {
                return new Response(result, { status: response.status });

            //   res.status(response.status).json(result);
            }
          } catch (error) {
            console.error('Error communicating with the print server:', error);
            return new Response("Failed to communicate with print server", { status: 500 });

            // res.status(500).json({ error: 'Failed to communicate with print server' });
          }
};
