"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useCategories } from '@/hooks/stock_manage/use-category'
import { usePromoCode } from '@/hooks/transactions/use-promo-code'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
export default function EditPromoCode({ id, initialData, onClose }) {
const { modifyPromoCode} = usePromoCode(false, id)
    const [categoryData, setCategoryData] = useState(initialData);

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCategoryData({ ...categoryData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("hello",categoryData)
            await modifyPromoCode(categoryData);
            // Reset form after successful submission
            onClose(); 
           
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

  return (
  //   <Card className="w-[350px]">
  //   <CardHeader>
  //     <CardTitle>Add Category</CardTitle>
  //   </CardHeader>
  //   <form onSubmit={handleSubmit} >
  //   <CardContent>
    
  //       <div className="grid w-full items-center gap-4">
  //       <div className="flex flex-col space-y-1.5">
  //           <Label htmlFor="framework">Category Name</Label>
  //           <Input id="name" value={categoryData.name} onChange={handleInputChange} placeholder="Enter Category Name"/>
  //         </div>
  //       </div>
     
  //   </CardContent>
  //   <CardFooter className="flex justify-between">
  //     <Button variant="outline">Cancel</Button>
  //     <Button type='submit'>Save</Button>
  //   </CardFooter>
  //   </form>
  // </Card>
  <Card className="w-[350px]">
  <CardHeader>
      <CardTitle>Add Promo Code</CardTitle>
  </CardHeader>
  <form onSubmit={handleSubmit}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
             
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" value={categoryData.discount} onChange={handleInputChange} placeholder="Enter Discount" />
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="max_usage">Max Usage</Label>
                  <Input id="max_usage" value={categoryData.max_usage} onChange={handleInputChange} placeholder="Enter Max Usage" />
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expiry_date">Expiry Date</Label>
                  <Input id="expiry_date" type="date" value={categoryData.expiry_date} onChange={handleInputChange} placeholder="Enter Expiry Date" />
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="product">Product</Label>
                  <Select onValueChange={handleFormChangeCustomer}>
            <SelectTrigger id="category" aria-label="product" value={categoryData.product} >
              <SelectValue placeholder="product" />
            </SelectTrigger>

            <SelectContent>
              {products?.data.results.map((product: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; }) => (
           <>
          
                  <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
             
           </>
           
              ))}
            </SelectContent>
          </Select>
              </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
      </CardFooter>
  </form>
</Card>
  )
}
