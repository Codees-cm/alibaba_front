"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/stock_manage/use-category";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Textarea } from "@/components/ui/textarea";

export default function AddProduct() {
  const { categories } = useCategories();
  const { addProduct } = useProducts();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price_with_tax: "",
    price: "",
    quantity: "",
    category: "",
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value })

    setProductData({ ...productData, [id]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(productData)
      await addProduct(productData);
      setProductData({
        name: "",
        description: "",
        price_with_tax: "",
        price: "",
        quantity: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="mx-auto max-w-[59rem]">
    <Card className="p-5">
    <h1 className="text-xl font-semibold">Add Product</h1>
    <form onSubmit={handleSubmit}>
     
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid gap-4 lg:col-span-2">
              <Input id="name" type="text" placeholder="Name" value={productData.name} onChange={handleInputChange} />
              <Textarea id="description" placeholder="Description" value={productData.description} onChange={handleInputChange} />
              <Input id="price_with_tax" type="number" placeholder="Price with Tax" value={productData.price_with_tax} onChange={handleInputChange} />
              <Input id="price" type="number" placeholder="Price without Tax" value={productData.price} onChange={handleInputChange} />
              <Input id="quantity" type="number" placeholder="Quantity" value={productData.quantity} onChange={handleInputChange} />
            </div>
            <div className="grid gap-4">
              <Select onValueChange={(value) => setProductData({ ...productData, category: value })} >
                <SelectTrigger id="category" aria-label="Select category" name="category" value={productData.category} >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger >
                <SelectContent >
                  {categories?.data.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      
    </form>
    </Card>
  </div>
  );
}
