"use client"
import React, { useState, useEffect } from 'react';
import { PaymentMethod } from '@/components/PaymentMethod';
import Receipt from '@/components/Receipt';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
    const [salesData, setSalesData] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState({ paymentMethod: '', name: '', phoneNumber: '', location: '' });
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountReceived, setAmountReceived] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const storedSalesData = localStorage.getItem('salesData');
        const initialSalesData = storedSalesData ? JSON.parse(storedSalesData) : [];
        setSalesData(initialSalesData);
        // Calculate the total amount
        const total = initialSalesData.reduce((acc, product) => acc + product.quantity_sold * product.sale_price, 0);
        setTotalAmount(total);
    }, []);

    const handlePaymentSubmit = (details) => {
        console.log(details)
        setPaymentDetails(details);
        setAmountReceived(details.amountReceived);
        setBalance(details.amountReceived - totalAmount);
    };

    const downloadReceipt = () => {
        const input = document.getElementById('receipt');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("receipt.pdf");
        });
    };

    return (
        <div className="container mx-auto mt-10 px-4 bg-gradient-to-r from-amber-100 to-white">
            <div className="flex flex-col ml-10 lg:flex-row gap-8">
                <div className="lg:w-[30%]  md:w-1/3">
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
                                                <TableRow key={product.id}>
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
                <div className="lg:w-[30%]   h-4/5">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <PaymentMethod onSubmit={handlePaymentSubmit} />
                    </div>
                </div>
                <div className="lg:w-[30%] ">
                    <div className="p-4 rounded-lg">
                        <div id="receipt">
                            <Receipt
                                salesData={salesData}
                                paymentMethod={paymentDetails.paymentMethod}
                                name={paymentDetails.name}
                                phoneNumber={paymentDetails.phoneNumber}
                                location={paymentDetails.location}
                                totalAmount={totalAmount}
                                amountReceived={amountReceived}
                                balance={balance}
                            />
                        </div>
                        <button onClick={downloadReceipt} className="mt-4 btn btn-primary">Download Receipt</button>

                    </div>
                </div>
            </div>
        </div>
    );
}
