"use client"

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/stock_manage/use-product";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AddProduct from "@/components/AddProduct";
import PageTitle from "@/components/PageTitle";





export default function Dashboard() {
  // Sample supplier data
  const { products, allLoading, allFetchError ,deletingProduct } = useProducts()


 
  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  return (
    <div className=" bg-gradient-to-r from-amber-100 to-white" >
      <div className="flex min-h-screen w-full flex-col ">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          
          <main className="grid flex-1 items-start ml-15 mt-10 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Tabs and add supplier button */}
            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Lorem description.</CardDescription>
                <div className="ml-auto flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Product</AlertDialogTrigger>
                      <AlertDialogContent className="w-fit">
                        <AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                          <AlertDialogDescription>
                          <AddProduct/>
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {
                  allLoading ? (<>isLoading</>) : (<>
                   {products?.data.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.product_code}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={()=> deletingProduct(product.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>)
                }
                   
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
