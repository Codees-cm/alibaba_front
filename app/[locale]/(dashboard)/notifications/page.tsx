'use client'

import React from 'react'
// import { usePathname, useSearchParams } from "next/navigation";
import { ColumnDef } from '@tanstack/react-table'
import Navigation from '@/components/Navigation'
import { DataTable } from '@/components/DataTable'

import PageTitle from '@/components/PageTitle';
import { useNotifications } from '@/hooks/stock_manage/use-notifications';
type Props = {
    locale:any;
    params: {
      id: number
    }
  }

function page({ locale, params }: Props) {
    const { notifications , allLoading} = useNotifications()


  return (
    <div className='p-8  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title=" Notifications" /></div>
          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>
        {
          allLoading ? (<>Loading...</>) : (<>
          {/* { console.log(warehouseproducts?.data) } */}
        <DataTable columns={columns} data={notifications?.data} />
          {/* hello */}
          </>)

        }
      </div>
    </div>
  )
}




export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "message",
      header: "Message"
    },
  ];
  
  type Payment = {
    id: number;
    name: string;
    productcode: string;
    quantity: string;
  };
  
  

export default page