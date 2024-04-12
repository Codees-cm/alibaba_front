'use client'
import * as React from "react";
import { useState } from "react";
import QRCode from "qrcode.react"; // Import QRCode library

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
import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";

// Define an interface for the sales data
export type SaleInfo = {
  name: string;
  quantity: string;
  status: string;
};

export default function Supplier() {
  const [isOrder, setIsOrder] = useState(false); // State to manage whether it's an order or not
  const [salesData, setSalesData] = useState<SaleInfo[]>([]); // State to manage sales data
  const [showQRCode, setShowQRCode] = useState(false); // State to manage QR code display

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const quantity = formData.get("quantity") as string;
    const status = isOrder ? "Order" : "Not an Order";
    const saleInfo: SaleInfo = { name, quantity, status };
    setSalesData([...salesData, saleInfo]);
    event.currentTarget.reset();
    if (isOrder) {
      setShowQRCode(true);
    } else {
      setShowQRCode(false);
    }
  };

  const columns: ColumnDef<SaleInfo>[] = [
    // Columns for DataTable
    { header: "Name", accessorKey: "name" },
    { header: "Quantity", accessorKey: "quantity" },
    { header: "Status", accessorKey: "status" },
  ];

  // Function to generate QR code if it's an order
  const generateQRCode = () => {
    if (showQRCode && salesData.length > 0) {
      const saleInfo = salesData[salesData.length - 1]; // Get the latest sale info
      const qrData = `Name: ${saleInfo.name}, Quantity: ${saleInfo.quantity}`;
      return (
        <div className="mt-4">
          <QRCode value={qrData} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between">
        <div className="w-[50%]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>Lorem description.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input type="number" id="quantity" />
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
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="w-[50%]">
          <DataTable columns={columns} data={salesData} />
          {generateQRCode()}
        </div>
      </div>
    </div>
  );
}
