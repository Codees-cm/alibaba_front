/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/stock_manage/use-category";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { CirclePlus as AddCircleIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

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
  
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
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
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold ">Add Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} method="post">
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Product Name" 
                  value={productData.name} 
                  onChange={handleInputChange} 
                  className="w-full" 
                />
                <Textarea 
                  id="description" 
                  placeholder="Description" 
                  value={productData.description} 
                  onChange={handleInputChange} 
                  className="w-full" 
                />
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="Buying Price" 
                  value={productData.price} 
                  onChange={handleInputChange} 
                  className="w-full" 
                />
                <Input 
                  id="price_with_tax" 
                  type="number" 
                  placeholder="Selling Price" 
                  value={productData.price_with_tax} 
                  onChange={handleInputChange} 
                  className="w-full" 
                />
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder="Quantity" 
                  value={productData.quantity} 
                  onChange={handleInputChange} 
                  className="w-full" 
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                  <div className="flex items-center space-x-2">
                    <Select onValueChange={handleFormChange}>
                      <SelectTrigger id="category" aria-label="category" name="category" value={productData.category}>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data.map((category: { id: React.Key | null | undefined; name: string; }) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AddCircleIcon className="text-green-500 cursor-pointer" onClick={() => router.replace('category')} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full" />
                  {imagePreview && (
                    <div className="mt-2 w-40 h-40 rounded-md overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Available Online:</span>
                  <Switch
                    checked={productData.available}
                    onCheckedChange={(checked) =>
                      setProductData((prevState) => ({
                        ...prevState,
                        available: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
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
