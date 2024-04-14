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
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add Product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" className="w-full" value={productData.name} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" className="min-h-32" value={productData.description} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price_with_tax">Price with Tax</Label>
                    <Input id="price_with_tax" type="number" className="w-full" value={productData.price_with_tax} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price without Tax</Label>
                    <Input id="price" type="number" className="w-full" value={productData.price} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" className="w-full" value={productData.quantity} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select  onValueChange={(value) => setProductData({ ...productData, category: value })} >
  <SelectTrigger
    id="category"
    aria-label="Select category"
    name="category"
    value={productData.category}  // Pass the selected category value directly to the SelectTrigger
    // onChange={(value) => setProductData({ ...productData, category: value })}  // Update the category state when a new value is selected
    onChange={(value) => console.log(value)}  // Update the category state when a new value is selected
  >
    <SelectValue placeholder="Select category" />

  </SelectTrigger >
  <SelectContent >
    {categories?.data.map((category) => (
      <SelectItem key={category.id} value={category.id}>
        {category.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <CardFooter className="flex justify-between pt-5">
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </div>
  );
}
