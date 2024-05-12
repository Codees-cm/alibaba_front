"use client"
import React, { useState, useEffect } from 'react';
import { PaymentMethod } from '@/components/PaymentMethod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export default function Page() {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const storedSalesData = localStorage.getItem('salesData');
        const initialSalesData = storedSalesData ? JSON.parse(storedSalesData) : [];
        setSalesData(initialSalesData); // Update salesData state after component mounts
    }, []); // Empty dependency array to ensure useEffect runs only once after mount

    console.log(salesData);

    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="flex flex-col ml-10 lg:flex-row gap-8">
                {/* Product Selection Box */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                                <CardDescription>Lorem description.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salesData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan="4" className="text-center">Loading...</TableCell>
                                            </TableRow>
                                        ) : (
                                            salesData.map((product) => (
                                                <TableRow key={product.product_id}>
                                                    <TableCell className="font-medium">{product.product_id}</TableCell>
                                                    <TableCell>{product.product}</TableCell>
                                                    <TableCell>{product.quantity_sold}</TableCell>
                                                    <TableCell>XAF{product.sale_price}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Payment Method Selection Box */}
                <div className="lg:w-1/3 h-4/5">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <PaymentMethod />
                    </div>
                </div>
            </div>
        </div>
    );
}
