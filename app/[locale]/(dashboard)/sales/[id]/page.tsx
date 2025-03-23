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
            <Card className="mt-8 shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Server className="h-5 w-5" />
                            <CardTitle>Server Management</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${serverStatus.isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                            <span className="text-sm font-medium">{serverStatus.isRunning ? 'Running' : 'Stopped'}</span>
                        </div>
                    </div>
                    <CardDescription className="text-slate-300">Manage your server status</CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle className={`h-5 w-5 mt-0.5 ${serverStatus.isRunning ? 'text-green-500' : 'text-red-500'}`} />
                            <div>
                                <h4 className="font-medium text-slate-900">Status</h4>
                                <p className="text-sm text-slate-600">{serverStatus.message}</p>
                            </div>
                        </div>

                        <Button
                            onClick={toggleServer}
                            variant={serverStatus.isRunning ? "destructive" : "default"}
                            className={`px-4 py-2 transition-all duration-200 ${
                                serverStatus.isRunning
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {serverStatus.isRunning ? (
                                    <>
                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                        Stop Server
                                    </>
                                ) : (
                                    <>
                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                        Start Server
                                    </>
                                )}
                            </div>
                        </Button>
                    </div>

                    {!serverStatus.isRunning && (
                        <div className="text-center p-3 border border-dashed border-slate-300 rounded-md bg-slate-50">
                            <p className="text-sm text-slate-600">
                                The server is currently offline. Start the server to enable printing and other services.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
