"use client"
import React, { useState, useEffect } from 'react';
import { PaymentMethod } from '@/components/PaymentMethod';
import Receipt from '@/components/Receipt';
import html2canvas from 'html2canvas';

import { AlertCircle, Server } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSales } from '@/hooks/use-sales';
import { useOrders } from '@/hooks/stock_manage/use-order';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export default function Page() {
    const [salesData, setSalesData] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState({ paymentMethod: '',customerId:"", name: '', phoneNumber: '', location: '' ,order:'' });
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountReceived, setAmountReceived] = useState(0);
    const [balance, setBalance] = useState(0);
    const [serverStatus, setServerStatus] = useState({ isRunning: false, message: 'Server not started' });
    const [serverDirectory, setServerDirectory] = useState('/path/to/your/server');
    const {addSale,isAddingSale,isSuccess} = useSales()
    const receiptCode = 'LABC' + Math.floor(Math.random() * 1000000).toString();
    const {createNewOrder} = useOrders()
    const router = useRouter()

    useEffect(() => {
        const storedSalesData = localStorage.getItem('salesData');
        const initialSalesData = storedSalesData ? JSON.parse(storedSalesData) : [];
        console.log(storedSalesData)
        setSalesData(initialSalesData);
        // Calculate the total amount
        const total = initialSalesData.reduce((acc: number, product: { quantity_sold: number; sale_price: number; }) => acc + product.quantity_sold * product.sale_price, 0);
        setTotalAmount(total);
        setAmountReceived(totalAmount);
    }, []);

    const toggleServer = async () => {
        try {
            const response = await fetch('------', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: serverStatus.isRunning ? 'stop' : 'start',
                    directory: serverDirectory
                }),
            });

            const result = await response.json();

            setServerStatus({
                isRunning: result.isRunning,
                message: result.message
            });
        } catch (error) {
            console.error('Server management error:', error);
            setServerStatus({
                ...serverStatus,
                message: 'Error managing server: ' + error.message
            });
        }
    };
    const handlePaymentSubmit = (details: React.SetStateAction<{ paymentMethod: string; name: string; phoneNumber: string; location: string; }>) => {
        setPaymentDetails(details);
        setAmountReceived(details.amountReceived);
        setBalance(details.amountReceived - totalAmount);
    };

    const sendImageToPrinter = (filePath) => {
        fetch('/api/print', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            router.push('/sale/')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    const printReceipt =  async () => {
        const input = document.getElementById('receipt');
        if (paymentDetails.order == true) {
            console.log(salesData)
            await createNewOrder(
                {
                    "user": paymentDetails.customerId,
                    "address": paymentDetails.phoneNumber,
                    "city":paymentDetails.location.value,
                    "items": salesData
                }
            )
        }else{

            await addSale(salesData)
        }
      
        html2canvas(input).then((canvas) => {
            canvas.toBlob((blob) => {
                const file = new File([blob], 'receipt.png', { type: 'image/png' });
                const formData = new FormData();
                formData.append('file', file);
    
                // Save the image to the server
               fetch('/api/save-image', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        sendImageToPrinter(data.filePath);
                    }
                })
                .catch((error) => {
                    console.error('Error saving image:', error);
                });
            });
        });
    };
    
    return (
        <div className=" px-4 py-10 bg-gradient-to-r from-amber-100 to-white">
            <div className="flex flex-col ml-10 lg:flex-row gap-8">
                <div className="lg:w-[30%]  md:w-1/3">
                    <div className="p-4 rounded-lg">
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                                <CardDescription>Lorem description.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
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
                                                    <TableCell>{product.product_name}</TableCell>
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
                <div className="lg:w-[25%] ">
                    <div className="rounded-lg">
                        <div id="receipt">
                            <Receipt
                            receiptCode ={receiptCode}
                                salesData={salesData}
                                paymentMethod={paymentDetails.paymentMethod}
                                name={paymentDetails.name}
                                phoneNumber={paymentDetails.phoneNumber}
                                location={paymentDetails.location}
                                totalAmount={totalAmount}
                                amountReceived={amountReceived}
                                balance={balance + paymentDetails.location.extra_fees}
                                isOrder={paymentDetails.order}
                            />
                        </div>
                        <Button className="w-full" onClick={printReceipt}>
                        Print Receipt
                </Button>
                    
                    </div>
                </div>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Server Management</CardTitle>
                    <CardDescription>Launch or stop the server</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <Alert variant={serverStatus.isRunning ? "success" : "destructive"}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{serverStatus.message}</AlertDescription>
                    </Alert>

                    <Button
                        onClick={toggleServer}
                        className={`w-full ${serverStatus.isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        <Server className="mr-2 h-4 w-4" />
                        {serverStatus.isRunning ? 'Stop Server' : 'Start Server'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
