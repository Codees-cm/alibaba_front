"use client"

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useSuppliers } from "@/hooks/stock_manage/use-suppliers";
import AddSupplier from "@/components/AddSupplier";
export default function Dashboard() {
  const { suppliers,allFetchError,allLoading, deletingSupplier } = useSuppliers()

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  return (
    <div >
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Header content */}
            <h1 className="text-lg font-semibold">Suppliers</h1>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Button size="sm" variant="outline">
                Add Supplier
              </Button>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Tabs and add supplier button */}
            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Suppliers</CardTitle>
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
                          <AddSupplier/>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {
                  allLoading ? (<>isLoading</>) : (<>
                   {suppliers?.data.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.contact_number}</TableCell>
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
                              <DropdownMenuItem onClick={()=>deletingSupplier(supplier.id)}>Delete</DropdownMenuItem>
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
