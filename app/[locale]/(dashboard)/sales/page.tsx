"use client"
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { useSales } from "@/hooks/use-sales";
export type SaleInfo = {
  product: string;
  quantity_sold: string;
  productName: string;
};

export default function Supplier() {
  const [saleFormData, setSaleFormData] = useState({ product: "", quantity_sold: "",sale_price:"", productName: "" , price: 0});
  const [salesData, setSalesData] = useState<SaleInfo[]>([]);
  const { products, allLoading } = useProducts();
  const {addSale,isAddingSale,isSuccess} = useSales()


  if (allLoading) {
    return (
      <>
        ...isLoading
      </>
    )
  }

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
        productName: selectedProduct.name,
        price: selectedProduct.price ,
        sale_price: selectedProduct.price
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { product, quantity_sold } = saleFormData;
    if (product.trim() && quantity_sold.trim()) {
      setSalesData([...salesData, saleFormData]);
      setSaleFormData({ product: "", quantity_sold: "", productName: "",price: 0,sale_price:"" });
    }
  };

  const columns = [
    { header: "Name", accessorKey: "productName" },
    { header: "Quantity", accessorKey: "quantity_sold" },
  ];

  const getTotalPrice = () => {
    return salesData.reduce((total, sale) => total + (parseFloat(sale.price) * parseInt(sale.quantity_sold)), 0);
  };


  const handleSaleSubmit = async () => {
    await addSale(salesData)
    setSalesData([]);
  };

  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100 to-white">
      <div className="flex justify-between mt-10">
        <div className="w-[100%]  flex justify-center" style={{ height:"max-content" }} >
          <Card className="w-[350px]" >
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full gap-4">
                    <Select onValueChange={handleProductChange}>
                      <SelectTrigger id="product" value={saleFormData.product} aria-label="Select product" name="product">
                        <SelectValue placeholder="select product" />
                      </SelectTrigger>
                      <SelectGroup>
                        <SelectContent>
                          {products?.data.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectGroup>
                    </Select>
                    <div className="flex flex-col">
                      <Label htmlFor="quantity_sold">Quantity</Label>
                      <Input id="quantity_sold" type="number" placeholder="Quantity" value={saleFormData.quantity_sold} onChange={handleInputChange} />
                    </div>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="w-[100%]  flex justify-center">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Sales Information</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={salesData} />
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div>
                <span className="font-semibold">Total Price</span> : {getTotalPrice()} XAF
              </div>
              <Button onClick={handleSaleSubmit}>Submit Sale</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
