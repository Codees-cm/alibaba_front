"use client";
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { CirclePlus as AddCircleIcon } from 'lucide-react';
import { useCustomer } from "@/hooks/use-customers";
import { useRouter } from "next/navigation";

const cameroonRegions = [
    { value: 'adamawa', label: 'Adamawa', extra_fees: 2000 },
    { value: 'centre', label: 'Centre', extra_fees: 2000 },
    { value: 'east', label: 'East', extra_fees: 2000 },
    { value: 'farNorth', label: 'Far North', extra_fees: 2000 },
    { value: 'littoral', label: 'Littoral', extra_fees: 1000 },
    { value: 'north', label: 'North', extra_fees: 2000 },
    { value: 'northwest', label: 'North-West', extra_fees: 2000 },
    { value: 'south', label: 'South', extra_fees: 2000 },
    { value: 'southwest', label: 'South-West', extra_fees: 2000 },
    { value: 'west', label: 'West', extra_fees: 2000 },
];

export function PaymentMethod({ onSubmit }) {
    const { customers, allFetchError, allLoading } = useCustomer();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState({});
    const [isOrder, setIsOrder] = useState(false);
    const [amountReceived, setAmountReceived] = useState('');
    const router = useRouter();

    if (allLoading) {
        return <div>loading</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const paymentDetails = {
            paymentMethod,
            name,
            phoneNumber,
            location,
            amountReceived,
            order: isOrder,
        };
        onSubmit(paymentDetails);
    };

    const handleFormChange = (value) => {
        const selectedRegion = cameroonRegions.find((region) => region.value === value);
        if (selectedRegion) {
            setLocation(selectedRegion);
        }
    };

    const handleFormChangeCustomer = (value) => {
        const selectedCustomer = customers.data.find((customer) => customer.id === value);
        if (selectedCustomer) {
            setName(selectedCustomer.first_name);
            setPhoneNumber(selectedCustomer.phone_number);  // Automatically set phone number
        }
    };

    const getButtonClasses = (method) => {
        return method === paymentMethod
            ? "flex flex-col items-center justify-between rounded-md border-2 border-blue-500 bg-blue-100 p-4 text-blue-700"
            : "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground";
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
                            value="Cash"
                            id="cash"
                            className="peer sr-only"
                            aria-label="Cash"
                            onClick={() => setPaymentMethod('cash')}
                        />
                        <Label
                            htmlFor="cash"
                            className={getButtonClasses('cash')}
                        >
                            Cash Payment
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="OM"
                            id="orange"
                            className="peer sr-only"
                            aria-label="Orange Money"
                            onClick={() => setPaymentMethod('orange')}
                        />
                        <Label
                            htmlFor="orange"
                            className={getButtonClasses('orange')}
                        >
                            Orange Money
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="MOMO"
                            id="mtn"
                            className="peer sr-only"
                            aria-label="MTN Mobile Money"
                            onClick={() => setPaymentMethod('mtn')}
                        />
                        <Label
                            htmlFor="mtn"
                            className={getButtonClasses('mtn')}
                        >
                            MTN Mobile Money
                        </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Select onValueChange={handleFormChangeCustomer}>
                        <SelectTrigger id="category" aria-label="customer" >
                            <SelectValue placeholder="Customer" />
                        </SelectTrigger>

                        <SelectContent>
                            {customers?.data.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                    {customer.first_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <AddCircleIcon className="text-green-500 cursor-pointer" onClick={() => router.push('/warehouse/customers')} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Phone Number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select onValueChange={handleFormChange}>
                        <SelectTrigger id="location" aria-label="Location" >
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {cameroonRegions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label} {isOrder && (<small style={{ margin: "3vh" }}>extra{option.extra_fees}</small>)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Switch onClick={() => setIsOrder(!isOrder)} />

                <Button className="w-full" onClick={handleSubmit}>
                    Save
                </Button>

            </CardContent>
        </Card>
    );
}
