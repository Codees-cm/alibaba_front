"use client"
import React, { useState, useEffect } from "react";
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
import { MoreHorizontal, ChevronUp, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"; // Added navigation icons
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
} from "@/components/ui/alert-dialog";
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import { useRouter } from "next/navigation";
import useCSVExport from '@/hooks/handleExportToCSV';
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { useMe } from "@/hooks/use-retiveme";

export default function Dashboard() {
  const { me } = useMe();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const exportToCSV = useCSVExport();
  const router = useRouter();

  // Custom hook for products with pagination parameters
  const {
    fetchProductsWithParams,
    products,
    allLoading,
    allFetchError,
    deletingProduct
  } = useProducts();

  // Total number of pages based on API response
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products when currentPage changes
  useEffect(() => {
    fetchProductsWithParams(currentPage, searchTerm, sortConfig);
  }, [currentPage, searchTerm, sortConfig]);

  // Update total pages when products data changes
  useEffect(() => {
    if (products?.data?.count) {
      const itemsPerPage = 25; // Items per page as determined by your API
      setTotalPages(Math.ceil(products.data.count / itemsPerPage));
    }
  }, [products]);

  if (allLoading) {
    return <div className="flex justify-center items-center h-screen">Loading products...</div>;
  }

  if (allFetchError) {
    return <div className="p-4 text-red-500">Error: {allFetchError.message}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    // Update sort configuration and reset to page 1
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleExportToCSV = () => {
    exportToCSV(products.data, 'labcraft');
  };

  const displayedItems = products?.data?.results || [];

  return (
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-amber-100 to-white" style={{ maxWidth:"150vh" }}>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 ml-15 mt-10 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-extrabold tracking-tight lg:text-4xl">
                        Products
                      </CardTitle>
                      <CardDescription>
                        List of all products you have added
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
                          <Button onClick={handleExportToCSV}>Export</Button>
                        </div>

                        {me?.data.role === 'admin' && (
                            <>
                              <AlertDialog style={{ width: "fit-content" }}>
                                <AlertDialogTrigger className="text-sm font-semibold text-white rounded-lg p-2 bg-orange-500 border-slate-950">AddProduct</AlertDialogTrigger>
                                <AlertDialogContent style={{ minWidth: 'max-content' }} className="w-max">
                                  <AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                    <AlertDialogDescription>
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
                      <TableHeader>
                        <TableRow>
                          <TableHead onClick={() => handleSort('product_code')}>
                            Code
                            {sortConfig.key === 'product_code' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                            )}
                          </TableHead>
                          <TableHead onClick={() => handleSort('name')}>
                            Name
                            {sortConfig.key === 'name' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                            )}
                          </TableHead>
                          <TableHead onClick={() => handleSort('quantity')}>
                            Quantity
                            {sortConfig.key === 'quantity' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                            )}
                          </TableHead>
                          <TableHead onClick={() => handleSort('price')}>
                            Buying Price
                            {sortConfig.key === 'price' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                            )}
                          </TableHead>
                          <TableHead onClick={() => handleSort('price_with_tax')}>
                            Selling Price
                            {sortConfig.key === 'price_with_tax' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                            )}
                          </TableHead>
                          <TableHead>Promo Code</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayedItems.map((product) => (
                            <TableRow className={product.quantity <= 5 ? "bg-red-300" : ""} key={product.id}>
                              <TableCell className="font-medium">{product.product_code}</TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.price_with_tax}</TableCell>
                              <TableCell>
                                {product.promo_codes?.length > 0 ? (
                                    product.promo_codes.map((promo) => (
                                        <span key={promo.code}>{promo.code} ({promo.discount}%)</span>
                                    ))
                                ) : (
                                    <span>No Promo</span>
                                )}
                              </TableCell>
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

                    {/* Improved pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-4">
                          <Button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              variant="outline"
                              size="sm"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>

                          {/* Display page numbers with ellipsis for large page counts */}
                          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                            let pageNum;

                            // Logic to show pages around current page
                            if (totalPages <= 5) {
                              pageNum = idx + 1;
                            } else if (currentPage <= 3) {
                              pageNum = idx + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + idx;
                            } else {
                              pageNum = currentPage - 2 + idx;
                            }

                            return (
                                <Button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    variant={currentPage === pageNum ? 'default' : 'outline'}
                                    className={`px-3 py-1 ${currentPage === pageNum ? 'bg-orange-500 text-white' : 'text-gray-600'}`}
                                    size="sm"
                                >
                                  {pageNum}
                                </Button>
                            );
                          })}

                          <Button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              variant="outline"
                              size="sm"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                    )}
                  </CardContent>
                </Card>
                <div className="mt-4 text-center text-sm text-gray-600">
                  Showing page {currentPage} of {totalPages}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>

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