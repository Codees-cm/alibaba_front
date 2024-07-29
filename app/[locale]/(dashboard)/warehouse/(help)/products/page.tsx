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
// import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCSVExport from '@/hooks/handleExportToCSV';
import { TabsContent ,Tabs} from "@/components/ui/tabs";




export default function Dashboard() {
  // Sample supplier data
  const { products, allLoading, allFetchError ,deletingProduct } = useProducts()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const exportToCSV = useCSVExport(); 



  if (allLoading) {
    return <div>loading</div>;
  }

 
  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; 
  }


    // Function to handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  

     const filteredProducts = products?.data.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1); // Reset to first page on new search
    };
  
    const itemsPerPage = 5; // Number of items to display per page
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage); // Calculate number of pages
  
  
    // Calculate start and end index based on currentPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = filteredProducts.slice(startIndex, endIndex);
    
    const handleExportToCSV = () => {
        exportToCSV(products.data, 'labcraft');
    };
    
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-amber-100 to-white" >
      <div className="flex min-h-screen w-full flex-col ">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          
          <main className="grid flex-1 items-start ml-15 mt-10 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Tabs and add supplier button */}
            {/* Table */}
            <Tabs defaultValue="all">
            <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Lorem description.</CardDescription>
               
                <div className="ml-auto flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mr-2"
                />
                <Button onClick={handleExportToCSV}>
                  export CSV
                </Button>
                    <AlertDialog>
                      <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Product</AlertDialogTrigger>
                      <AlertDialogContent style={{ maxInlineSize : 'min-content' , placeContent :'center' }}>
                        <AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                          <AlertDialogDescription style={{ minWidth : 'max-content' }}>
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
                   {displayedItems.map((product) => (
                      <TableRow className={(product.quantity <= 5) ? " bg-red-300":"" } key={product.id}>
                        <TableCell className="font-medium">{product.product_code}</TableCell>
                        <TableCell>{product.name}</TableCell>
                      
                         <TableCell className="">{product.quantity}</TableCell>
    
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`products/${product.id}`)}>Details</DropdownMenuItem>
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
                {pageCount > 1 && (
                <div className="flex justify-center mt-4">
                  {[...Array(pageCount)].map((_, index) => (
                    <Button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      variant={currentPage === index + 1 ? 'solid' : 'ghost'}
                      className={`px-3 py-1 ${
                        currentPage === index + 1 ? 'bg-orange-200 text-orange-800' : 'text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              )}
              </CardContent>
            </Card>
            <div className="mt-4 text-center text-sm text-gray-600">
          
            Showing page {currentPage} of {pageCount}
            </div>
            </TabsContent>
          </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
