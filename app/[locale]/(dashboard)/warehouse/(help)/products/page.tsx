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
import { TabsContent ,Tabs} from "@/components/ui/tabs";

export default function Dashboard() {
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
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start ml-15 mt-10">
          <Tabs defaultValue="all">
            <TabsContent value="all">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-wrap justify-between mb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-extrabold tracking-tight lg:text-4xl">
                      Products
                    </CardTitle>
                    <CardDescription>
                      List of your all products you have added
                    </CardDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="mt-4 mr-4">Add Product</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[425px]">
                          <AlertDialogHeader>
                            <AlertDialogDescription>
                              <AddProduct />
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div>
                      <Button onClick={handleExportToCSV} className="mt-4 mr-4">Export</Button>
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mt-4 mr-4"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedItems.map((product: React.SetStateAction<null>) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price_with_tax}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`products/${product.id}`)}>Details</DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => setSelectedProduct(product)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={async () => deletingProduct(product.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="mt-4">
                {/* Add pagination controls */}
                <div className="flex justify-center">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
              </TabsContent>
            </Tabs>
       
          </main>
        </div>
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
