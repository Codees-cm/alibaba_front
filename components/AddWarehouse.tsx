"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWarehouses } from "@/hooks/stock_manage/use-warehouse";

export default function AddWarehouse() {
    const { addWarehouse, isAddingWarehouse, isSuccess, errorMessage } = useWarehouses();

    const [warehouseData, setWarehouseData] = useState({
        name: "",
        location: "",
        capacity: ""
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setWarehouseData({ ...warehouseData, [id]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addWarehouse(warehouseData);
            // Reset form after successful submission
            setWarehouseData({
                name: "",
                location: "",
                capacity: ""
            });
        } catch (error) {
            console.error("Error adding warehouse:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Warehouse</CardTitle>
                <CardDescription>Lorem description.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Warehouse Name</Label>
                            <Input id="name" placeholder="Warehouse A" value={warehouseData.name} onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Second floor block A" value={warehouseData.location} onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input id="capacity" placeholder="Capacity" value={warehouseData.capacity} onChange={handleInputChange} />
                        </div>
                    </div>
                    <CardFooter className="flex justify-between pt-5">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="submit" disabled={isAddingWarehouse}>Save</Button>
                    </CardFooter>
                </form>
                {isSuccess && <p className="text-green-500">Warehouse added successfully!</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </CardContent>
        </Card>
    );
}
