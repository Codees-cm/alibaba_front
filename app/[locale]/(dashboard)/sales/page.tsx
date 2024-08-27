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
import { DataTable } from "@/components/DataTable";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { useRouter } from "next/navigation";
export type SaleInfo = {
  price(price: any): number;
  sale_price: any;
  product: string;
  quantity_sold: string;
  productName: string;
};

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Supplier() {
  const [saleFormData, setSaleFormData] = useState({ product: "", quantity_sold: "", sale_price: "", productName: "", price: 0 });
  const [salesData, setSalesData] = useState<SaleInfo[]>([]);
  const { products, allLoading } = useProducts();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (allLoading) {
    return (
      <>
        ...isLoading
      </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

     
    // Convert value to a number
    const numericValue = parseInt(value, 10);

    // Get the available quantity of the selected product
    const selectedProduct = products?.data.find(product => product.id.toString() === saleFormData.product);
    const availableQuantity = selectedProduct ? selectedProduct.quantity : 0;

    setSaleFormData({ ...saleFormData, [id]: value });
  };

  const handleProductChange = (product: any) => {
    setSaleFormData({
      ...saleFormData,
      product: product.id,
      productName: product.name,
      price: product.price,
      sale_price: product.price,
    });
    setValue(product.name);
    setOpen(false);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedSalesData = [...salesData];
    updatedSalesData.splice(index, 1);
    setSalesData(updatedSalesData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { product, quantity_sold } = saleFormData;
    if (product && quantity_sold.trim()) {
      setSalesData([...salesData, saleFormData]);
      setSaleFormData({ product: "", quantity_sold: "", productName: "", price: 0, sale_price: "" });
      setValue(""); // Reset selected value
    }
  };

  const columns = [
    { header: "Name", accessorKey: "productName" },
    { header: "Quantity", accessorKey: "quantity_sold" },
    {
      header: "Remove",
      cell: ({ row, rowIndex }) => {
        return (
          <button className="text-orange-400 hover:text-orange-700" onClick={() => handleRemoveProduct(rowIndex)}>remove</button>
        );
      },
    },
  ];

  const getTotalPrice = () => {
    return salesData.reduce((total, sale) => total + (parseFloat(sale.price) * parseInt(sale.quantity_sold)), 0);
  };

  const handleSaleSubmit = async () => {
    const typedSalesData: SaleInfo[] = salesData.map(sale => ({
      product_name: sale.productName, // Convert product to number (product ID)
      quantity_sold: sale.quantity_sold,
      product: parseInt(sale.product, 10),
      sale_price: sale.sale_price,
      price: parseFloat(sale.price) // Convert price to number
    }));

    localStorage.setItem('salesData', JSON.stringify(typedSalesData));
    setSalesData([]);
    router.push('sales/0');
  };

  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100 to-white">
      <div className="flex justify-between mt-10">
        <div className="w-[100%] flex justify-center" style={{ height: "max-content" }}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full gap-4">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value ? value : "Select product..."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search product..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No product found.</CommandEmpty>
                            <CommandGroup>
                              {products?.data.map((product) => (
                               <>
                               {
                               (product.quantity  > 0)&&(
                                <CommandItem
                                key={product.id}
                                value={product.name}
                                onSelect={() => handleProductChange(product)}
                              >
                                {product.name} <small style={{ margin: "1vh" }}>remains {product.quantity}</small>
                              </CommandItem>
                               )

                               }
                               </>
                              
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

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
        <div className="w-[100%] flex justify-center">
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
