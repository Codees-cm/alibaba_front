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
import AddProduct from "@/components/AddProduct";
import AddCategory from "@/components/AddCategory";





export default function Category() {


  const { categories, allFetchError, allLoading, deletingCategorie } = useCategories();


  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  return (
    <div className="flex min-h-screen w-full flex-col  bg-gradient-to-r from-amber-100 to-white">

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

        {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <h1>Category</h1>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header> */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  ml-15 mt-10 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                  <div className="ml-auto flex items-center gap-2">
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
                    {
                  allLoading ? (<>isLoading</>) : (<>
                   {categories?.data.map((categori) => (
                        <TableRow key={categori.id}>
                          <TableCell className="font-medium">{categori.name}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deletingCategorie(categori.id)}>Delete</DropdownMenuItem>

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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
