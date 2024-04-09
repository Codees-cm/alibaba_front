'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

type Props = {}

export default function UsersPage({}: Props) {
  return (
    
    <div className="flex flex-col gap-5 w-full">
      <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
  <div className="col-span-1"><PageTitle title="Transactions" /></div>
  <div className="col-span-1"><Navigation/></div>
</section>
      <DataTable columns={columns} data={data} />
    </div>
  )
} 


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "ID"
      },
  {
    accessorKey: "name",
    header: "Name",
    cell:({row})=>{
      return (
      <div className="flex gap-2 items-center"> 
      <img 
      className="h-10 w-10"
      src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue}(
        "name"
        )}`}
        alt="user-image"
      />
      <p>
        {row.getValue("name")}
         </p>
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
  {
    accessorKey: "status",
    header: "Status"
  },
];

type Payment = {
  id:number;
  name:string;
  email:string;
  lastTransaction: string;
  method: string;
  status:string;
};


export const data: Payment[] = [
  {
    id:1,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
    status:"Pending",
  },
  {
    id: 2,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
    status:"Pending",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
    status:"Completed",
  },
  {
    id: 4,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
    status:"Cancelled",
  },
  {
    id:5,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
    status:"Completed",
  },
  {
    id:6,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
    status:"Pending",
  },
  {
    id:7,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
    status:"Cancelled",
  },
  {
    id:8,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
    status:"pending",
  },
  {
    id:9,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
    status:"Cancelled",
  },
  {
    id:10,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
    status:"Pending",
  },
  {
    id:11,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
    status:"Pending",
  },
  {id:12,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
    status:"Completed",
  },
  {
    id:13,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "paypal",
    status:"Cancelled",
  },
  {
    id:14,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Credit card",
    status:"Pending",
  },
  {
    id:15,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "Cash",
    status:"Rejected",
  },
  {
    id:16,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "Orange Money",
    status:"Rejected",
  },
  {
    id:17,
    name: "John Doe",
    email: "john.doee@gmail.com",
    lastTransaction: "12/03/2023",
    method: "MTN MoMo",
    status:"Rejected",
  },
  {
    id:18,
    name: "Rick Thompson",
    email: "rick.thompsonl@gmail.com",
    lastTransaction: "01/03/2024",
    method: "paypal",
    status:"Completed",
  }
  // ...
]
