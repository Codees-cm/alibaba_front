"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useCategories } from '@/hooks/stock_manage/use-category'
import { CollectionsOutlined } from '@mui/icons-material'
export default function AddCategory() {
const {addCategorie} = useCategories()
    const [categoryData, setCategoryData] = useState({
        name: "",
       
    });

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
            await addCategorie(categoryData);
            // Reset form after successful submission
            setCategoryData({
                name: "",
            });
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Add Category</CardTitle>
    </CardHeader>
    <form onSubmit={handleSubmit} >
    <CardContent>
    
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Category Name</Label>
            <Input id="name" value={categoryData.name} onChange={handleInputChange} placeholder="Enter Category Name"/>
          </div>
        </div>
     
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button type='submit'>Save</Button>
    </CardFooter>
    </form>
  </Card>
  )
}
