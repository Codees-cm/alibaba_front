"use client"

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import { useProducts } from "@/hooks/stock_manage/use-product";
export type SaleInfo = {
  product: string;
  quantity: string;
  productName:string;
};

export default function Supplier() {
  const [saleFormData, setSaleFormData] = useState<SaleInfo>({ product: "", quantity: "", productName:"" });
  const [salesData, setSalesData] = useState<SaleInfo[]>([]);
  const { products,allLoading } = useProducts();


  if(allLoading){
    return(
    <>
    ...isLoading
    </>
    )
  }
  console.log(saleFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSaleFormData({ ...saleFormData, [id]: value });
  };

  const handleProductChange = (value) => {
    const selectedProduct = products.data.find(product => product.id.toString() === value);
    if (selectedProduct) {
      setSaleFormData(prevState => ({
            ...prevState,
            product: value,
            productName: selectedProduct.name
            // quantity: selectedProduct.quantity
        }));
    }
};



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { product, quantity } = saleFormData;
    if (product.trim() && quantity.trim()) {
      setSalesData([...salesData, saleFormData]);
      setSaleFormData({ product: "", quantity: "", productName:"" });
    }
  };

  const columns = [
    { header: "Name", accessorKey: "productName" },
    { header: "Quantity", accessorKey: "quantity" },
  ];

  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100 to-white">
      <div className="flex justify-between">
        <div className="w-[100%]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full gap-4">
                    {/* <div className="flex flex-col">
                      <Label htmlFor="product">Name</Label>
                      <Input id="product" type="text" placeholder="Product Name" value={saleFormData.product} onChange={handleInputChange} />
                    </div> */}
                    <Select value={saleFormData.product} onValueChange={handleProductChange}>
                                <SelectTrigger id="product" value={saleFormData.product} name="product">
                                    <SelectValue placeholder="select product" />
                                </SelectTrigger>
                                <SelectGroup>
                                    <SelectContent position="popper">
                                        {products?.data.map((product) => (
                                            <SelectItem key={product.id} value={product.id.toString()}>
                                                {product.product}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectGroup>
                            </Select>
                    <div className="flex flex-col">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="Quantity" value={saleFormData.quantity} onChange={handleInputChange} />
                    </div>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="w-[100%]">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Sales Information</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={salesData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}