"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEmployee } from '@/hooks/use-employees'
export default function AddEmployee() {
const {register} = useEmployee()
    const [employeeData, setCustomersData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role:"employee"
    });

    // Function to handle input change

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCustomersData({ ...employeeData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await register(employeeData);

            setCustomersData({
              first_name: "",
              last_name: "",
              email: "",
              role:"employee"
            });

         
        } catch (error) {
        
        }
    };

  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Add Employee</CardTitle>
    </CardHeader>
    <form onSubmit={handleSubmit} >
    <CardContent>
    
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Name</Label>
            <Input id="first_name" value={employeeData.first_name} onChange={handleInputChange} placeholder="Enter first name"/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Surname</Label>
            <Input id="last_name" value={employeeData.last_name} onChange={handleInputChange} placeholder="Enter sur name"/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Email</Label>
            <Input id="email" type='email' value={employeeData.email} onChange={handleInputChange} placeholder="Enter email"/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Password</Label>
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
