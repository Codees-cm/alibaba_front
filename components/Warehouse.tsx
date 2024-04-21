
"use client"

import { Home, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/app/i18n/client";
import { useWarehouses } from "@/hooks/stock_manage/use-warehouse";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation";
import AddWarehouse from "@/components/AddWarehouse";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import AddProductToWarehouse from "./AddProductToWarehouse";
import Navigation from "./Navigation";
import PageTitle from "./PageTitle";
import { Progress } from "./ui/progress";

export default function Warehouse({ lang }) {
  const { warehouses, allLoading, allFetchError, deletingWarehouse } = useWarehouses();
  const router = useRouter()

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }

  const editWarehouse = (warehouse) => {
    console.log(1)
  }

  const { t } = useTranslation(lang,'warehouse')

  return (
    <>

      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
            </div>
          </header> */}

          <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                  <CardTitle>
                   { t('warehouses')}
                    
                  </CardTitle>
                  <CardDescription>Lorem description.</CardDescription>
                </div>
                {/* <Button aria-haspopup="true" size="icon" variant="ghost" className="flex items-center"> */}
                <AlertDialog>
                  <AlertDialogTrigger className=" text-sm font-semibold  border-slate-950">Add Product</AlertDialogTrigger>
                  <AlertDialogContent className="w-fit">
                    <AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                      <AlertDialogDescription>
                        <AddProductToWarehouse />
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                  </AlertDialogContent>
                </AlertDialog>
                {/* </Button> */}
              </CardHeader>


              <CardContent className="p-10">

                {
                  allLoading ? (<>isLoading</>) : (<>
                    <div className="grid md:grid-cols-2 md:gap-8 ">
                      {warehouses?.data.map((warehouse) => (
                        <Card key={warehouse.id}>
                          <div onClick={() => router.push(`warehouse/${warehouse.id}`)}>

                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">{warehouse.name}</CardTitle>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <Home className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => editWarehouse(warehouse.id)}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deletingWarehouse(warehouse.id)}>Delete</DropdownMenuItem>

                                </DropdownMenuContent>
                              </DropdownMenu>

                            </CardHeader>
                            <CardContent>
                              <div className="text-sm font-bold">{t('location')}: {warehouse.location}</div>
                              <p className="text-xs text-muted-foreground">{t('capacity')}: {warehouse.capacity}</p>
                            </CardContent>
                            <CardFooter>
                              <Progress value={warehouse.percentage_full} aria-label={`${warehouse.percentage_full}% increase`} />
                            </CardFooter>

                          </div>
                        </Card>
                      ))}
                      <Card className="flex items-center justify-center">
                        <Popover>
                          <PopoverTrigger>Open</PopoverTrigger>
                          <PopoverContent>
                            <AddWarehouse />
                          </PopoverContent>
                        </Popover>
                      </Card>
                    </div>
                  </>)
                }

              </CardContent>

            </Card>

          </main>
        </div>
      </div>





    </>

  );
}
