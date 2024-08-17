"use client"
import React, { useState } from 'react';
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { useOrders } from '@/hooks/stock_manage/use-order';

const cameroonRegions = [
    { value: 'adamawa', label: 'Adamawa' },
    { value: 'centre', label: 'Centre' },
    { value: 'east', label: 'East' },
    { value: 'farNorth', label: 'Far North' },
    { value: 'littoral', label: 'Littoral' },
    { value: 'north', label: 'North' },
    { value: 'northwest', label: 'North-West' },
    { value: 'south', label: 'South' },
    { value: 'southwest', label: 'South-West' },
    { value: 'west', label: 'West' },
];

export function PaymentMethod({ onSubmit }) {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [isOrder, setIsOrder] = useState(false);
    const [amountReceived, setAmountReceived] = useState('');
    const {createNewOrder} = useOrders()


    const handleSubmit = (e) => {
        e.preventDefault();
        const paymentDetails = {
            paymentMethod,
            name,
            phoneNumber,
            location,
            amountReceived
        };
        onSubmit(paymentDetails);
    };

   
    

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                    Add a new payment method to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup defaultValue="cash" className="grid grid-cols-3 gap-4">
                    {/* Radio buttons for payment methods */}
                    <div>
                        <RadioGroupItem
                            value="cash"
                            id="cash"
                            className="peer sr-only"
                            aria-label="Cash"
                            onClick={() => setPaymentMethod('cash')}
                        />
                        <Label
                            htmlFor="cash"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
                        >
                            Cash Payment
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="orange"
                            id="orange"
                            className="peer sr-only"
                            aria-label="Orange Money"
                            onClick={() => setPaymentMethod('orange')}
                        />
                        <Label
                            htmlFor="orange"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
                        >
                            Orange Money
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="mtn"
                            id="mtn"
                            className="peer sr-only"
                            aria-label="MTN Mobile Money"
                            onClick={() => setPaymentMethod('mtn')}
                        />
                        <Label
                            htmlFor="mtn"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground"
                        >
                            MTN Mobile Money
                        </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="First Last" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Phone Number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                        <SelectTrigger id="location" aria-label="Location" value={location} onChange={(value) => setLocation(value)}>
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {cameroonRegions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amountReceived">Amount Received</Label>
                    <Input id="amountReceived" placeholder="Amount Received" type="number" value={amountReceived} onChange={(e) => setAmountReceived(e.target.value)} />
                </div>

                <Switch onChange={() => setIsOrder(!isOrder)} />
                
                {isOrder ? (
                    <Button className="w-full" onClick={handleOrderSubmit}>
                        Submit Order
                    </Button>
                ) : (
                    <Button className="w-full" onClick={handleSubmit}>
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
