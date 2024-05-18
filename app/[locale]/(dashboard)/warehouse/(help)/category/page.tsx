"use client"
import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  PanelLeft,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,

  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/stock_manage/use-category";

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

import AddCategory from "@/components/AddCategory";
import { useRouter } from "next/navigation";
import { useState } from "react";





export default function Category() {


  const { categories, allFetchError, allLoading, deletingCategorie } = useCategories();
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  if (allLoading) {
    return <div>loading</div>; // Show error message if fetching data fails
  }


  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }


  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

   // Filter categories based on search term
   const filteredCategories = categories?.data.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(filteredCategories.length / itemsPerPage); // Calculate number of pages


  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredCategories.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen w-full flex-col  bg-gradient-to-r from-amber-100 to-white">

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">


        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  ml-15 mt-10 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                  <div className="ml-auto flex items-center gap-2">
                  <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mr-2"
                />
                    <AlertDialog>
                      <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Category</AlertDialogTrigger>
                      <AlertDialogContent className="w-fit">
                        <AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                          <AlertDialogDescription>
                            <AddCategory />
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
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  {allLoading ? (
                    <TableRow>
                      <TableCell colSpan={2}>Loading...</TableCell>
                    </TableRow>
                  ) : (
                    displayedItems.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`category/${category.id}`)}>Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deletingCategorie(category.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
  );
}
