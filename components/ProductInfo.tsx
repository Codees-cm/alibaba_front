"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"
import { useProducts } from '@/hooks/stock_manage/use-product';

type Product = {
    id:number;
    name: string;
    code: string;
    available: number;
    description: string;
    category: string;
    price: number;
    price_with_tax: number;
    online:boolean;
};

type Props = {
    product: Product;
    role:any
};

const ProductInfo: React.FC<Props> = ({ product ,role }) => {
    const { id,name, code, available, description, price, price_with_tax,  online ,category } = product;
    const isAvailable = available > 0;
    // State for the switch
    const [isOnline, setIsOnline] = useState(online); // Set the initial state to false (off)

    const { modifyProduct } = useProducts( false,id);

    const handleSwitchChange = async () => {
        try {
            // Toggle the online state
            setIsOnline((prevIsOnline) => !prevIsOnline);

            const updateData = {
                id:id,
                data:{
                    available: !online
                }
            }
           
            // Update the product availability directly when the switch is toggled
            await modifyProduct(updateData);
            
        } catch (error) {
            console.error("Error updating product availability:", error);
        }
    };

    return (
        <Card className="shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="bg-gray-200 py-3 px-4 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-6">
                <p className="text-sm text-gray-600 mb-2">Product Code: {code}</p>
                <p className="text-sm text-gray-600 mb-2">Availability: {isAvailable ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-800 mb-4"> Category :{category}</p>
                <p className="text-sm text-gray-800 mb-4"> Description : {description}</p>
                <small className="text-lg font-medium text-blue-400">XAF{price_with_tax}</small>

                {role === 'admin' && (
                <>
                     <p className="text-lg font-semibold text-blue-600">XAF{price}</p>
                <p className="text-sm text-gray-800 mb-4"> Place product online as available ?:
                    <Switch className='text-sm' checked={isOnline} onClick={handleSwitchChange} />
                </p>
                </>
              
              )}
              
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
