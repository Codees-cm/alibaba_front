"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useProducts } from '@/hooks/stock_manage/use-product';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { usePromoCode } from '@/hooks/transactions/use-promo-code';
export default function AddPromoCode() {
    const { addPromoCode } = usePromoCode();
    const [promoCodeData, setPromoCodeData] = useState({
        discount: "",
        max_usage: "",
        expiry_date: "",
        product: "", // Assuming product ID or name
    });
    const {products,allLoading} = useProducts()

    if (allLoading) {
        return <div>loading</div>; 
      }
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPromoCodeData({ ...promoCodeData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPromoCode(promoCodeData);
            setPromoCodeData({
                discount: "",
                max_usage: "",
                expiry_date: "",
                product: "",
            });
        } catch (error) {
            console.error("Error adding promo code:", error);
        }
    };

    const handleFormChangeCustomer = (value: any) => {
        const selectedCustomers = products.data.find((product) => product.id === value);
        if (selectedCustomers) {
            setPromoCodeData({ ...promoCodeData , product: selectedCustomers})
        }
        };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Add Promo Code</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                       
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="discount">Discount (%)</Label>
                            <Input id="discount" value={promoCodeData.discount} onChange={handleInputChange} placeholder="Enter Discount" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="max_usage">Max Usage</Label>
                            <Input id="max_usage" value={promoCodeData.max_usage} onChange={handleInputChange} placeholder="Enter Max Usage" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="expiry_date">Expiry Date</Label>
                            <Input id="expiry_date" type="date" value={promoCodeData.expiry_date} onChange={handleInputChange} placeholder="Enter Expiry Date" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="product">Product</Label>
                            <Select onValueChange={handleFormChangeCustomer}>
                      <SelectTrigger id="category" aria-label="product" value={promoCodeData.product} >
                        <SelectValue placeholder="product" />
                      </SelectTrigger>

                      <SelectContent>
                        {products?.data.map((product: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; }) => (
                     <>
                    
                            <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                       
                     </>
                     
                        ))}
                      </SelectContent>
                    </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Save</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
