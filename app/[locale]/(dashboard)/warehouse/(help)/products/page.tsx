"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/stock_manage/use-product";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct"; // Import the new component
import { useRouter } from "next/navigation";
import useCSVExport from '@/hooks/handleExportToCSV';
import { TabsContent, Tabs } from "@/components/ui/tabs";

import { useMe } from "@/hooks/use-retiveme";
export default function Dashboard() {
    const { me, isLoading, error } = useMe();
  const { products, allLoading, allFetchError, deletingProduct } = useProducts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for editing
  const exportToCSV = useCSVExport();

  if (allLoading) {
    return <div>loading</div>;
  }


  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>;
  }
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const filteredProducts = products?.data.filter((category: { name: string; }) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredProducts.slice(startIndex, endIndex);

  const handleExportToCSV = () => {
    exportToCSV(products.data, 'labcraft');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-amber-100 to-white">
      {/* <div className="flex min-h-screen w-full flex-col"> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* <main className="grid flex-1 items-start ml-15 mt-10"> */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  ml-15 mt-10 sm:py-0 md:gap-8">

          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card className="shadow-lg">
                <CardHeader>
                  {/* <div className="flex flex-wrap justify-between mb-2"> */}
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-extrabold tracking-tight lg:text-4xl">
                      Products
                    </CardTitle>
                    <CardDescription>
                      List of your all products you have added
                    </CardDescription>
                    <div className="ml-auto flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mr-2"
                      />
                      <div>
                        <Button onClick={handleExportToCSV} >Export</Button>
                      </div>

                      {me?.data.role === 'admin' && (
                <>
                 <AlertDialog style={{ width: "fit-content" }}>
                        <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Product</AlertDialogTrigger>
                        <AlertDialogContent className="w-max">
                          <AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                            <AlertDialogDescription style={{ minWidth: 'max-content' }}>
                              <AddProduct />
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                        </AlertDialogContent>
                      </AlertDialog>
                </>
              
              )}
                    
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Quantity</TableHead><TableHead>Buying Price</TableHead><TableHead>Selling Price</TableHead><TableHead>Promo Code</TableHead> {/* New Column for Promo Code */}
                      <TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>
                      {displayedItems.map((product: React.SetStateAction<null>) => (
                        <TableRow className={product.quantity <= 5 ? "bg-red-300" : ""} key={product.id}>
                          <TableCell className="font-medium">{product.product_code}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.price_with_tax}</TableCell>
                          <TableCell>
                            {product.promo_codes.length > 0 ? (
                              product.promo_codes.map((promo) => (
                                <span key={promo.code}>{promo.code} ({promo.discount}%)</span>
                              ))
                            ) : (
                              <span>No Promo</span>
                            )}
                          </TableCell> {/* Display Promo Codes or "No Promo" */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`products/${product.id}`)}>
                                  Details
                                </DropdownMenuItem>
                                {me?.data.role === 'admin' && (
                <>
                 <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={async () => deletingProduct(product.id)}>
                                  Delete
                                </DropdownMenuItem>
                </>
              
              )}
                              
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {pageCount > 1 && (
                    <div className="flex justify-center mt-4">
                      {[...Array(pageCount)].map((_, index) => (
                        <Button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          variant={currentPage === index + 1 ? 'solid' : 'ghost'}
                          className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-orange-200 text-orange-800' : 'text-gray-600'
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
      {/* </div> */}

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <AlertDialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Product</AlertDialogTitle>
              <AlertDialogDescription>
                <EditProduct
                  productId={selectedProduct.id}
                  initialData={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedProduct(null)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
