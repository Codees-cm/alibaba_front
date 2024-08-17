"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSuppliers } from '@/hooks/stock_manage/use-suppliers'
export default function EditSupplier({ id, initialData, onClose }) {
    const {modifySupplier } = useSuppliers(false, id)
    const [supplierData, setSupplierData] = useState(initialData);

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSupplierData({ ...supplierData, [id]: value });
    };

    useEffect(() => {
      setSupplierData(initialData);
    }, [initialData]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         
            await modifySupplier(supplierData);
            // Reset form after successful submission
                onClose(); 
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
    <form onSubmit={handleSubmit} >
    <CardContent>
   
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
            <Input type="text" id="contact_number"  value={supplierData.contact_number} onChange={handleInputChange} placeholder="6XXXXXXXX" />
          </div>
        </div>
     
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button type='submit'>Save</Button>
    </CardFooter>
    </form>
  </Card>
  )
}
