'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
// import { useStockItem } from '@/hooks/stock_manage/use-stockitem'
import { useCategories } from '@/hooks/stock_manage/use-category'
type Props = {
  locale:any;
  params: {
    id: number
  }
}

export default function Page({ locale, params }: Props) {

  const { oneCategorie ,singleLoading } = useCategories(true,params.id)

  if (singleLoading) {
    return <div>..loading</div>; // Show error message if fetching data fails
  }
 

  console.log(oneCategorie)

  return (

    <div className='p-8  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title=" Product in Category" /></div>
          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>
        {
          singleLoading ? (<>Loading...</>) : (<>
          {/* { console.log(warehouseproducts?.data) } */}
        <DataTable columns={columns} data={oneCategorie?.data} />
          {/* hello */}
          </>)

        }
      </div>
    </div>

  )
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "product_code",
    header: "Code"
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price_with_tax",
    header: "Price with tax"
  },
  {
    accessorKey: "quantity",
    header: "Available quantity"
  },
  {
    accessorKey: "available",
    header: "On shop"
  }

];

type Payment = {
  id: number;
  name: string;
  productcode: string;
  quantity: string;
};

