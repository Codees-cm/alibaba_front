'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useSales } from '@/hooks/use-sales'
type Props = {}


export default function UsersPage({ }: Props) {
  const { sale, allLoading } = useSales(true)


  if (allLoading) {
    return (<>
      ... is loading
    </>)
  }
  console.log(sale?.data)

  return (

    <div className='p-8 w-full  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Transactions" /></div>
          <div className="col-span-1"><Navigation /></div>
        </section>
        <DataTable columns={columns} data={sale?.data} />
      </div>
    </div>

  )
}


export const columns = [
 
  {
    accessorKey: "quantity_sold",
    header: "Quantity"
  },
  {
    accessorKey: "product.name",
    header: "Product"
  },
  {
    accessorKey: "sale_date",
    header: " Date"
  },
  {
    accessorKey: "sale_price",
    header: " Price"
  },
  
];
