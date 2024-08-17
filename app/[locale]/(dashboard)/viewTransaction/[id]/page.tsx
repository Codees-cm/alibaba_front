'use client'

import React from 'react'
// import { usePathname, useSearchParams } from "next/navigation";
import { useTransactions } from '@/hooks/transactions/use-transactions';
import { ColumnDef } from '@tanstack/react-table'
import Navigation from '@/components/Navigation'
import { DataTable } from '@/components/DataTable'

import PageTitle from '@/components/PageTitle';
type Props = {
    locale:any;
    params: {
      id: number
    }
  }

function page({ locale, params }: Props) {
   
  const { oneTransaction ,singleLoading } = useTransactions(true,params.id)

 
  if (singleLoading) {
    return <div>..loading</div>; // Show error message if fetching data fails
  }
 

  console.log(oneTransaction)

  return (

    <div className='p-8  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title=" Transactions in Sale" /></div>
          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>
        {
          singleLoading ? (<>Loading...</>) : (<>
          {/* { console.log(warehouseproducts?.data) } */}
        <DataTable columns={columns} data={oneTransaction?.data} />
          {/* hello */}
          </>)

        }
      </div>
    </div>
)
}


export const columns: ColumnDef<any>[] = [
    {
      accessorKey: "product.product_code",
      header: " Product Code"
    },
    {
      accessorKey: "quantity_sold",
      header: "Quantity",
    },
    {
      accessorKey: "sale_date",
      header: "Date"
    },
    {
      accessorKey: "sale_price",
      header: "Price"
    },
   
  ];

export default page