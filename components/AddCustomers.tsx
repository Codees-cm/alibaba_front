"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
// import { useCategories } from '@/hooks/stock_manage/use-category'
import { useCustomer } from '@/hooks/use-customers'
import { CollectionsOutlined } from '@mui/icons-material'
export default function AddCustomers() {
const {register} = useCustomer()
    const [categoryData, setCustomersData] = useState({
      
        first_name : "",
        last_name: " ",
        email: "",
        password:"",
        phone_number: "",
        role: "user"
    });

    // Function to handle input change

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCustomersData({ ...categoryData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        
            await register(categoryData);
            // Reset form after successful submission
            setCustomersData({
        first_name : "",
        last_name: " ",
        email: "",
        phone_number: "",
                phone_number: "",
            });
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Add Customers</CardTitle>
    </CardHeader>
    <form onSubmit={handleSubmit} >
    <CardContent>
    
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Customers Name</Label>
            <Input id="first_name" value={categoryData.first_name} onChange={handleInputChange} placeholder="Enter Customers first name"/>
            <Input id="last_name" value={categoryData.last_name} onChange={handleInputChange} placeholder="Enter Customers last name"/>
            <Input id="email" value={categoryData.email} onChange={handleInputChange} placeholder="Enter Customers email"/>
            
            <Input id="phone_number" value={categoryData.phone_number} onChange={handleInputChange} placeholder="Enter Customers Phone number"/>
     
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
