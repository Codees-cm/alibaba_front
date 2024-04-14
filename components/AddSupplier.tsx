"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSuppliers } from '@/hooks/stock_manage/use-suppliers'
export default function AddSupplier() {
    const {addSupplier} = useSuppliers()
    const [supplierData, setSupplierData] = useState({
        name: "",
        email: "",
        contact_number: "",

       
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSupplierData({ ...supplierData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("hello",supplierData)
            await addSupplier(supplierData);
            // Reset form after successful submission
            setSupplierData({
                name: "",
                email: "",
                contact_number: ""})
        } catch (error) {
            console.error("Error adding supplier:", error);
        }
    };
  return (

    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Add Supplier</CardTitle>
      <CardDescription>Lorem description.</CardDescription>
    </CardHeader>
    <CardContent>
    <form onSubmit={handleSubmit} >
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework"> Name</Label>
            <Input id="name"  value={supplierData.name} onChange={handleInputChange} placeholder="Enter Name.."/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Email</Label>
           <Input type="email" id="email"  value={supplierData.email} onChange={handleInputChange} placeholder="joedoe@gmail.com" required></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="quantity">Phone Number</Label>
            <Input type="number" id="telephone"  value={supplierData.contact_number} onChange={handleInputChange} placeholder="6XXXXXXXX" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </CardFooter>
  </Card>
  )
}
