// 'use client'
// import { DataTable } from '@/components/DataTable'
// import Navigation from '@/components/Navigation'
// import PageTitle from '@/components/PageTitle'
// import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'

// type Props = {
//   locale:string;
// }

// export default function UsersPage({locale}: Props) {
//   return (
//     <div className='p-8 w-full bg-gradient-to-r from-amber-100 to-white'>
//       <div className="flex flex-col gap-5 w-full">
//         <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
//           <div className="col-span-1"><PageTitle title="Employees" /></div>
//           <div className="col-span-1"><Navigation lang={locale} /></div>
//         </section>
//         <DataTable columns={columns} data={data} />
//       </div>
//     </div>

//   )
// }


// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       return (<div className="flex gap-2 items-center">
//         <img
//           className="h-10 w-10"
//           src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue}(
//         "name"
//         )}`}
//           alt="user-image"
//         />
//         <p>{row.getValue("name")} </p>
//       </div>
//       );
//     }

//   },
//   {
//     accessorKey: "email",
//     header: "Email"
//   },
//   {
//     accessorKey: "lastTransaction",
//     header: "Last Transaction"
//   },
//   {
//     accessorKey: "method",
//     header: "Method"
//   },

// ];

// type Payment = {
//   name: string;
//   email: string;
//   lastTransaction: string;
//   method: string;
// };


// export const data: Payment[] = [
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "paypal",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Credit card",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "Cash",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Orange Money",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "MTN MoMo",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "paypal",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "paypal",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Credit card",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "Cash",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Orange Money",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "MTN MoMo",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "paypal",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "paypal",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Credit card",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "Cash",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "Orange Money",
//   },
//   {
//     name: "John Doe",
//     email: "john.doee@gmail.com",
//     lastTransaction: "12/03/2023",
//     method: "MTN MoMo",
//   },
//   {
//     name: "Rick Thompson",
//     email: "rick.thompsonl@gmail.com",
//     lastTransaction: "01/03/2024",
//     method: "paypal",
//   }
//   // ...
// ]

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEmployee } from "@/hooks/use-employees";

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
// import AddEmployees from "@/components/AddEmployees";
import { useRouter } from "next/navigation";
import { SetStateAction, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";

import AddEmployee from "@/components/AddEmployee";
import Loader from "@/components/Loader";


export default function Employee() {


  const { employees, allFetchError, allLoading, } = useEmployee();
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  if (allLoading) {
    return <Loader/>; // Show error message if fetching data fails
  }


  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }


  // Function to handle page change
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  // Filter employees based on search term
  const filteredEmployees = employees?.data.filter((employees: { first_name: string; }) =>
    employees.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(filteredEmployees.length / itemsPerPage); // Calculate number of pages


  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen w-full flex-col  bg-gradient-to-r from-amber-100 to-white">

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">


        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  ml-15 mt-10 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Employees</CardTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="mr-2"
                    />
                    <AlertDialog>
                      <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Employees</AlertDialogTrigger>
                      <AlertDialogContent className="w-fit">
                        <AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                          <AlertDialogDescription>
                            <AddEmployee />
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
                        <TableHead> #</TableHead>
                        <TableHead> First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allLoading ? (
                        <TableRow>
                          <TableCell colSpan={2}>Loading...</TableCell>
                        </TableRow>
                      ) : (
                        displayedItems.map((employees: { id: Key | null | undefined; first_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; last_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; }) => (
                          <TableRow key={employees.id}>
                            <TableCell><div className="flex gap-2 items-center">
                              <img
                                className="h-10 w-10"
                                src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${employees.last_name}("name")}`}
                                alt="user-image"
                              />
                            </div> </TableCell>
                            <TableCell className="font-medium">{employees.first_name}</TableCell>
                            <TableCell className="font-medium">{employees.last_name}</TableCell>
                            <TableCell className="font-medium">{employees.email}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {/* <DropdownMenuItem onClick={() => router.push(`category/${category.id}`)}>Details</DropdownMenuItem> */}
                                  {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                                  {/* <DropdownMenuItem onClick={() => deletingCategorie(category.id)}>Delete</DropdownMenuItem> */}
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
    </div>
  );
}
