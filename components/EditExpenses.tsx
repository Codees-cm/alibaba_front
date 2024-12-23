"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useExpenses } from '@/hooks/use-expenses';
export default function EditExpenses({ id, initialData, onClose }) {
    const {modifyExpense} = useExpenses()
    const [supplierData, setSupplierData] = useState(initialData);

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSupplierData({ ...supplierData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         
            await modifyExpense(supplierData);

            setSupplierData({
              amount: "",
              category :"",
              description: ""
            })
            
          } catch (error) {
            console.error("Error adding supplier:", error);
        }
    };
  return (

    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Add Expenses</CardTitle>
    </CardHeader>
    <form onSubmit={handleSubmit} >
    <CardContent>
   
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework"> Amount</Label>
            <Input id="amount"  value={supplierData.amount} onChange={handleInputChange} placeholder="Enter Name.."/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Category</Label>
           <Input type="text" id="category"  value={supplierData.category} onChange={handleInputChange} placeholder="salary or rent" required></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="quantity">Description</Label>
            <Input type="text" id="description"  value={supplierData.description} onChange={handleInputChange} placeholder="description" />
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
