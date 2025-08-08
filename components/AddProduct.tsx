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
    price: "",
    original_price: "",
    image_url: "",
    images: [] as string[],
    quantity: "",
    category: "",
    tags: [] as string[],
    brand: "",
    specifications: "",
    product_code: "",
    available: true as boolean,
  });
  const handleFormChange = (value) => {
    const selectedCategory = categories.data.find(category => category.id.toString() === value);
    if (selectedCategory) {
      // console.log(selectedCategory)
      setProductData(prevState => ({
            ...prevState,
            category: selectedCategory.id,
            // quantity: selectedProduct.quantity
        }));
    }
};

  // Function to handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // console.log({ id, value })
    setProductData({ ...productData, [id]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // productData.category =  JSON.parse(productData.category)
      // console.log(productData)
      await addProduct(productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        original_price: "",
        image_url: "",
        images: [],
        quantity: "",
        category: "",
        tags: [],
        brand: "",
        specifications: "",
        product_code: "",
        available: true,
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
              <Input id="price" type="number" placeholder="Price" value={productData.price} onChange={handleInputChange} />
              <Input id="original_price" type="number" placeholder="Original Price" value={productData.original_price} onChange={handleInputChange} />
              <Input id="image_url" type="text" placeholder="Main Image URL" value={productData.image_url} onChange={handleInputChange} />
              <Input id="quantity" type="number" placeholder="Quantity" value={productData.quantity} onChange={handleInputChange} />
              <Input id="brand" type="text" placeholder="Brand" value={productData.brand} onChange={handleInputChange} />
              <Input id="product_code" type="text" placeholder="Product Code" value={productData.product_code} onChange={handleInputChange} />
              <Textarea id="specifications" placeholder='Specifications (JSON or key:value pairs)' value={productData.specifications} onChange={handleInputChange} />
            </div>
            <div className="grid gap-4">
              <Select  onValueChange={handleFormChange} >
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
              <Input id="tags" type="text" placeholder="Tags (comma separated)" value={Array.isArray(productData.tags) ? productData.tags.join(', ') : productData.tags as any} onChange={(e)=> setProductData(prev=>({...prev, tags: e.target.value}))} />
              <Input id="images" type="text" placeholder="Additional Image URLs (comma separated or JSON array)" value={Array.isArray(productData.images) ? productData.images.join(', ') : productData.images as any} onChange={(e)=> setProductData(prev=>({...prev, images: e.target.value}))} />
              <div className="flex items-center space-x-2">
                <label htmlFor="available" className="text-sm text-gray-700">Available</label>
                <input id="available" type="checkbox" checked={productData.available} onChange={(e)=> setProductData(prev=>({...prev, available: e.target.checked}))} />
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
