"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"

type Product = {
    name: string;
    code: string;
    available: number;
    description: string;
    price: number;
    price_with_tax: number;
    online:boolean;
};

type Props = {
    product: Product;
};

const ProductInfo: React.FC<Props> = ({ product }) => {
    const { name, code, available, description, price, price_with_tax,  online } = product;
    const isAvailable = available > 0;

    // State for the switch
    const [isOnline, setIsOnline] = useState(online); // Set the initial state to false (off)

    return (
        <Card className="shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="bg-gray-200 py-3 px-4 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-6">
                <p className="text-sm text-gray-600 mb-2">Product Code: {code}</p>
                <p className="text-sm text-gray-600 mb-2">Availability: {isAvailable ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-800 mb-4">{description}</p>
                <p className="text-lg font-semibold text-blue-600">XAF{price}</p>
                <small className="text-lg font-medium text-blue-400">XAF{price_with_tax}</small>
                <p className="text-sm text-gray-800 mb-4"> Place product online as available ?:
                    <Switch className='text-sm' checked={isOnline} onClick={() =>  setIsOnline(!isOnline) } />
                </p>
            </CardContent>
            <CardFooter className="bg-gray-100 py-3 px-4 rounded-b-lg">
                <p className="text-sm">
                    {isAvailable ? 'This product is available.' : 'This product is currently out of stock.'}
                </p>
            </CardFooter>
        </Card>
    );
};

export default ProductInfo;
