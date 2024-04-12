"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddInto() {
  return (
<div className="p-8 w-full">
<Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Add products to diffrent warehouse.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Product Name</Label>
              <Select>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Product Name" />
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
              <Label htmlFor="framework">Warehouse</Label>
              <Select>
                <SelectTrigger id="Warehouse">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Warehouse1">Warehouse 1</SelectItem>
                  <SelectItem value="Warehouse2">Warehouse 2</SelectItem>
                  <SelectItem value="Warehouse3">Warehouse 3</SelectItem>
                  <SelectItem value="Warehouse4">Warehouse 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Product Quantity</Label>
              <Input id="quantity" placeholder="Product quantity" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
</div>
    
  )
}
