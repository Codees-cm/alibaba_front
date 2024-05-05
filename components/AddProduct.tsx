"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/stock_manage/use-category";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/lib/actions";
import { CirclePlus as AddCircleIcon } from 'lucide-react';
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
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleFormChange = (value) => {
    const selectedCategory = categories.data.find(category => category.id.toString() === value);
    if (selectedCategory) {
      setProductData(prevState => ({
        ...prevState,
        category: selectedCategory.id,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData({ ...productData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ ...productData}); // Include image file in product data
      if (!imageFile) {
        console.error("Please select an image.");
        return;
      }
      const formData = new FormData();
      formData.append("file", imageFile);
      console.log("file", imageFile);
      const { status, message, fileName } = await uploadFile(formData);
      if (status === "success") {
        await addProduct({ ...productData, image_urls: fileName });
        setProductData({
          name: "",
          description: "",
          price_with_tax: "",
          price: "",
          quantity: "",
          category: "",
        });
        setImageFile(null);
        setImagePreview(null);
      } else {
        console.error("Failed to upload file:", message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="mx-auto">
      <Card className="p-2">
        <h1 className="text-xl font-semibold">Add Product</h1>
        <form onSubmit={handleSubmit} method="post">
          <CardContent>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
              <div className="grid gap-4 lg:col-span-1">
                <Input id="name" type="text" placeholder="Name" value={productData.name} onChange={handleInputChange} />
                <Textarea id="description" placeholder="Description" value={productData.description} onChange={handleInputChange} />
                <Input id="price_with_tax" type="number" placeholder="Price with Tax" value={productData.price_with_tax} onChange={handleInputChange} />
                <Input id="price" type="number" placeholder="Price without Tax" value={productData.price} onChange={handleInputChange} />
                <Input id="quantity" type="number" placeholder="Quantity" value={productData.quantity} onChange={handleInputChange} />
              </div>
              <div className="grid gap-4 lg:col-span-1 ">

                <div className="mb-32 ">
                  <div className="flex items-center p-5">
                    <Select onValueChange={handleFormChange}>
                      <SelectTrigger id="category" aria-label="category" name="category" value={productData.category}>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AddCircleIcon className="text-green-500 cursor-pointer" />
                  </div>
                  <div className="p-2">
                    {/* File input for image selection */}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {/* Image preview */}
                    <div className="mt-2 w-40 h-40">

                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />

                      )}
                    </div>
                  </div>

                </div>

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
