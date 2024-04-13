
"use client"
import { useEffect } from "react";
import Link from "next/link";
import { CircleUser, Home, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useWarehouses } from "@/hooks/stock_manage/use-warehouse";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AddWarehouse from "@/components/AddWarehouse";
export default function Warehouse() {
  const { warehouses, allLoading, allFetchError } = useWarehouses();

  useEffect(() => {
    console.log(warehouses)
  }, [warehouses])

  if (allLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  return (
    <>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-2">
        <div className="grid md:grid-cols-2 md:gap-8 ">
            {warehouses?.data.map((warehouse) => (
              <Card key={warehouse.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{warehouse.name}</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">Location: {warehouse.location}</div>
                  <p className="text-xs text-muted-foreground">Capacity: {warehouse.capacity}</p>
                </CardContent>
                <CardFooter>
                  {/* <Progress value={warehouse.progress} aria-label={`${warehouse.progress}% increase`} /> */}
                </CardFooter>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                  <AddWarehouse />
                </PopoverContent>
              </Popover>
            </Card>
          </div>
        </main>
      </div>
    </div>



    
     
    </>

  );
}
