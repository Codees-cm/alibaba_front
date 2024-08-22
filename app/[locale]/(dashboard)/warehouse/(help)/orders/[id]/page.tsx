'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useStockItem } from '@/hooks/stock_manage/use-stockitem'
import Loader from "@/components/Loader";
import { useOrders } from '@/hooks/stock_manage/use-order'
type Props = {
  params: {
    id: number
  }
}

export default function OrderDetail({ params }: Props) {
 const {oneOrder,singleLoading ,singleFetchError } = useOrders(true ,params.id)
//   const { warehouseproducts,allLoading,allFetchError } = useStockItem(params.id)

  if (singleLoading) {
    return <Loader/>; // Show error message if fetching data fails
  }
 

  if (singleFetchError) {
    return <div>Error: {singleFetchError.message}</div>; // Show error message if fetching data fails
  }


  return (

    <div className='p-8  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Order Details" /></div>
          <div className="col-span-1"><Navigation /></div>
        </section>
        {
          singleLoading ? (<>Loading...</>) : (<>
          { console.log(oneOrder?.data.items) }
          <DataTable columns={columns} data={oneOrder?.data.items} />
          
          </>)

        }
      </div>
    </div>

  )
}


export const columns: ColumnDef[] = [
  {
    accessorKey: "product",
    header: "Product Name"
  },
  {
    accessorKey: "price",
    header: "Product Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
 
];

