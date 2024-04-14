
"use client"
import { useEffect } from "react";
import Link from "next/link";
import { CircleUser, Home, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useWarehouses } from "@/hooks/stock_manage/use-warehouse";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AddWarehouse from "@/components/AddWarehouse";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
export default function Warehouse() {
  const { warehouses, allLoading, allFetchError,deletingWarehouse } = useWarehouses();


  if (allLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  const editWarehouse = (warehouse) =>{
    console.log(1)
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
            </div>
          </header>
          <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                  <CardTitle>
                    Warehouses
                  </CardTitle>
                  <CardDescription>Lorem description.</CardDescription>
                </div>
                <Button aria-haspopup="true" size="icon" variant="ghost" className="flex items-center">
                  <PlusCircle className="h-6 w-6 text-muted-foreground mr-2" />
                  <span>Add Product</span>
                </Button>
              </CardHeader>


              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 md:gap-8 ">
                  {warehouses?.data.map((warehouse) => (
                    <Card key={warehouse.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{warehouse.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <Home className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => editWarehouse(warehouse.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deletingWarehouse(warehouse.id)}>Delete</DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>

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
              </CardContent>

            </Card>

          </main>
        </div>
      </div>





    </>

  );
}
