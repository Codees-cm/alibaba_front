"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
// import { usePromoCode } from '@/hooks/use-promo-code';
import { usePromoCode } from '@/hooks/transactions/use-promo-code';

export default function GeneratePromoCode() {
    const { generatePromoCode } = usePromoCode();
    const [productId, setProductId] = useState("");

    const handleInputChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await generatePromoCode(productId);
            setProductId("");
        } catch (error) {
            console.error("Error generating promo code:", error);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Generate Promo Code</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="product">Product ID</Label>
                            <Input id="product" value={productId} onChange={handleInputChange} placeholder="Enter Product ID" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Generate</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
