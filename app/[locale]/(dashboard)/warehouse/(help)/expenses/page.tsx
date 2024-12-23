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
import AddExpenses from "@/components/AddExpenses";
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
// import EditProduct from "@/components/EditProduct"; // Import the new component
import { useRouter } from "next/navigation";
import useCSVExport from '@/hooks/handleExportToCSV';
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { useMe } from "@/hooks/use-retiveme";

import { useExpenses } from "@/hooks/use-expenses";
import EditExpenses from "@/components/EditExpenses";
export default function Expenses() {

  const { me, isLoading, error } = useMe();
  const { expenses, allLoading, allFetchError, deletingExpense } = useExpenses();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected product for editing
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

  console.log(expenses)
  const filteredItems = expenses?.data.filter((category: { name: string; }) =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, endIndex);

  const handleExportToCSV = () => {
    exportToCSV(expenses.data, 'labcraft');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-amber-100 to-white" style={{ maxWidth: "150vh" }}>
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
                      Expenses
                    </CardTitle>
                    <CardDescription>
                      List of your all expenses you have added
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
                            <AlertDialogTrigger className=" text-sm font-semibold text-white rounded-lg p-2  bg-orange-500 border-slate-950">AddExpenses</AlertDialogTrigger>
                            <AlertDialogContent className="w-max">
                              <AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                                <AlertDialogDescription style={{ minWidth: 'max-content' }}>
                                  <AddExpenses />
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
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>

                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayedItems.map((product: React.SetStateAction<null>) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.description}</TableCell>
                          <TableCell className="font-medium">{product.amount}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">

                                {me?.data.role === 'admin' && (
                                  <>
                                    <DropdownMenuItem onClick={() => setSelectedItem(product)}>
                                      Edit
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem
         onClick={() => setSelectedItem()}>
          Edit</DropdownMenuItem> */}
      
                                    <DropdownMenuItem onClick={async () => deletingExpense(product.id)}>
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
      {selectedItem && (
        <AlertDialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Product</AlertDialogTitle>
              <AlertDialogDescription>
                <EditExpenses
                  productId={selectedItem.id}
                  initialData={selectedItem}
                  onClose={() => setSelectedItem(null)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedItem(null)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
