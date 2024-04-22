'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

type Props = {
  locale:string;
}

export default function UsersPage({locale}: Props) {
  return (
    <div className='p-8 w-full bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Employees" /></div>
          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>
        <DataTable columns={columns} data={data} />
      </div>
    </div>

  )
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (<div className="flex gap-2 items-center">
        <img
          className="h-10 w-10"
          src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue}(
        "name"
        )}`}
          alt="user-image"
        />
        <p>{row.getValue("name")} </p>
      </div>
      );
    }

  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "lastTransaction",
    header: "Last Transaction"
  },
  {
    accessorKey: "method",
    header: "Method"
  },

];

type Payment = {
  name: string;
  email: string;
  lastTransaction: string;
  method: string;
};


export const data: Payment[] = [
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
  },
  {
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
  },
  {
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
  }
  // ...
]
