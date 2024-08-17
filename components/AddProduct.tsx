/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/stock_manage/use-category";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { CirclePlus as AddCircleIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch"
export default function AddProduct() {
  const router = useRouter();
  const { categories } = useCategories();
  const { addProduct, isAddingProduct, isSuccess, errorMessage } = useProducts();
  const { edgestore } = useEdgeStore();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price_with_tax: "",
    price: "",
    available: false,
    quantity: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  const handleFormChange = (value: any) => {
    const selectedCategory = categories.data.find((category: { id: { toString: () => any; }; }) => category.id.toString() === value);
    if (selectedCategory) {
      setProductData(prevState => ({
        ...prevState,
        category: selectedCategory.id,
      }));
    }
  };

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setProductData({ ...productData, [id]: value });
  };

  const handleImageChange = (e: { target: { files: any[]; }; }) => {
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!imageFile) {
        console.error("Please select an image.");
        setLoading(false);
        return;
      }

      const res = await edgestore.myPublicImages.upload({ 
        file: imageFile,
        onProgressChange: (progress) => {
          console.log(progress);
        }
      });

      const fileName = res.url;
      const updatedProductData = {
        ...productData,
        image_urls: fileName,
      };

      await addProduct({ ...updatedProductData });

      setProductData({
        name: "",
        description: "",
        price_with_tax: "",
        price: "",
        available: false,
        quantity: "",
        category: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="mx-auto">
      <Card >
        <h1 className="text-xl font-semibold">Add Product</h1>
        <form onSubmit={handleSubmit} method="post">
          <CardContent className="p-2">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
              <div className="grid gap-4 lg:col-span-1">
                <Input id="name" type="text" placeholder="Name" value={productData.name} onChange={handleInputChange} />
                <Textarea id="description" placeholder="Description" value={productData.description} onChange={handleInputChange} />
                <Input id="price" type="number" placeholder="Buying Price" value={productData.price} onChange={handleInputChange} />
                <Input id="price_with_tax" type="number" placeholder="Selling Price " value={productData.price_with_tax} onChange={handleInputChange} />
                <Input id="quantity" type="number" placeholder="Quantity" value={productData.quantity} onChange={handleInputChange} />
              </div>
              <div className="grid gap-4 lg:col-span-1">
                <div className="mb-32">
                  <div className="flex items-center p-5">
                    <Select onValueChange={handleFormChange}>
                      <SelectTrigger id="category" aria-label="category" name="category" value={productData.category}>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data.map((category: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; }) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AddCircleIcon className="text-green-500 cursor-pointer" onClick={() => router.replace('category')} />
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
                    <p className="text-sm text-gray-800 mb-4">
    Place product online as available?:
    <Switch 
      className="text-sm"  
      checked={productData.available}
      onCheckedChange={(checked) => setProductData(prevState => ({ 
        ...prevState, 
        available: checked 
      }))} 
    />
  </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding Product..." : "Save"}
            </Button>
            {isSuccess && <p className="text-green-500">Product added successfully!</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
