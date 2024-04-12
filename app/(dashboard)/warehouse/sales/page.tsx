'use client'
import * as React from "react";
import { useState } from "react"; // Import useState hook for managing state

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";

export default function Supllier() {
  const [isOrder, setIsOrder] = useState(false); // State to manage whether it's an order or not
  const [salesData, setSalesData] = useState([]); // State to manage sales data

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    const status = isOrder ? "Order" : "Not an Order";
    const saleInfo = { name, quantity, status };
    setSalesData([...salesData, saleInfo]);
    event.target.reset();
  };

  const columns = [
    // Columns for DataTable
    { Header: "Name", accessor: "name" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div>
          <Button variant="outline" onClick={() => handleEdit(row)}>Edit</Button>
          <Button onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  // Function to handle editing sale information
  const handleEdit = (row) => {
    // Implement edit functionality
    console.log("Editing sale information:", row.original);
  };

  // Function to handle deleting sale information
  const handleDelete = (row) => {
    // Implement delete functionality
    console.log("Deleting sale information:", row.original);
  };

  return (
    <div className="p-8 w-full">
      <DataTable columns={columns} data={salesData} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>Lorem description.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Select>
                  <SelectTrigger id="name">
                    <SelectValue placeholder="Product " />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Product1">Product 1</SelectItem>
                    <SelectItem value="Product2">Product 2</SelectItem>
                    <SelectItem value="Product3">Product 3</SelectItem>
                    <SelectItem value="Product4">Product 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <Input type="number" id="quantity"></Input>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="order">Order?</Label>
                <input
                  type="checkbox"
                  id="order"
                  checked={isOrder}
                  onChange={(e) => setIsOrder(e.target.checked)}
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
