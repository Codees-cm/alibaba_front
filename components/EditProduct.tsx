"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/stock_manage/use-category";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";

export default function EditProduct({ productId, initialData, onClose }) {
  const router = useRouter();
  const { categories } = useCategories();
  const { modifyProduct, isEditingProduct, isSuccess, errorMessage } = useProducts(false, productId);
  const { edgestore } = useEdgeStore();
  
  const [productData, setProductData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.images?.[0] || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductData(initialData);
    setImagePreview(initialData.image_urls || null);
    console.log(initialData.image_urls)
  }, [initialData]);

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.data.find((category) => category.id.toString() === value);
    if (selectedCategory) {
      setProductData((prevState) => ({
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
      setLoading(true);
      let fileName = imagePreview;

      if (imageFile) {
        const res = await edgestore.myPublicImages.upload({ 
          file: imageFile,
          onProgressChange: (progress) => {
            console.log(progress);
          }
        });
        fileName = res.url;
      }

      const updatedProductData = {
        ...productData,
        image_urls: fileName,
      };

      await modifyProduct({ ...updatedProductData });

      setLoading(false);
      onClose(); // Close the dialog after a successful update

    } catch (error) {
      setLoading(false);
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="mx-auto">
      <Card className="p-2">
        <h1 className="text-xl font-semibold">Edit Product</h1>
        <form onSubmit={handleSubmit} method="post">
          <CardContent className="p-2">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
              <div className="grid gap-4 lg:col-span-1">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={productData.name}
                  onChange={handleInputChange}
                />
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={productData.description}
                  onChange={handleInputChange}
                />
                <Input
                  id="price_with_tax"
                  type="number"
                  placeholder="Price with Tax"
                  value={productData.price_with_tax}
                  onChange={handleInputChange}
                />
                <Input
                  id="price"
                  type="number"
                  placeholder="Price without Tax"
                  value={productData.price}
                  onChange={handleInputChange}
                />
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={productData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-4 lg:col-span-1">
                <div className="mb-32">
                  <div className="flex items-center p-5">
                    <Select
                      onValueChange={handleCategoryChange}
                      
                      // defaultValue={productData.category.toString()}
                    >
                      <SelectTrigger id="category" aria-label="category" name="category">
                        <SelectValue placeholder={productData.category.toString()} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data.map((category) => (
                          <SelectItem key={category.id}  value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <div className="mt-2 w-40 h-40">
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                    {initialData.images?.[0] && (
                      <div className="mt-2 w-30 h-30">
                        <p className="text-sm">Original Image:</p>
                        <img src={initialData.image_urls} alt="Original" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating Product..." : "Save"}
            </Button>
            {isSuccess && <p className="text-green-500">Product updated successfully!</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
