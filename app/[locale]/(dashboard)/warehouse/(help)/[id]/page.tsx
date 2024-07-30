'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useStockItem } from '@/hooks/stock_manage/use-stockitem'
import Loader from "@/components/Loader";

type Props = {
  params: {
    id: number
  }
}

export default function WarehouseDetail({ params }: Props) {

  const { warehouseproducts,allLoading,allFetchError } = useStockItem(params.id)

  if (allLoading) {
    return <Loader/>; // Show error message if fetching data fails
  }
 

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>; // Show error message if fetching data fails
  }


  return (

    <div className='p-8  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Warehouse Details" /></div>
          <div className="col-span-1"><Navigation /></div>
        </section>
        {
          allLoading ? (<>Loading...</>) : (<>
          { console.log(warehouseproducts?.data) }
        <DataTable columns={columns} data={warehouseproducts?.data} />
          
          </>)

        }
      </div>
    </div>

  )
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "product.product_code",
    header: "Code"
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "product.price_with_tax",
    header: "Price with tax"
  },
  {
    accessorKey: "product.quantity",
    header: "Available quantity"
  },


];

type Payment = {
  id: number;
  name: string;
  productcode: string;
  quantity: string;
};

