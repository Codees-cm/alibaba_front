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
        <CardTitle>Add Warehouse</CardTitle>
        <CardDescription>Lorem description.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Warehouse Name</Label>
              <Input id="name" placeholder="Wharehouse A"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Location</Label>
              <Input id="location" placeholder="Second floor block A"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Capacity</Label>
              <Input id="capacity" placeholder="capacity" />
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
