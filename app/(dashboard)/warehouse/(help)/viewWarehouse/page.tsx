'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

type Props = {}

export default function WarehouseDetail({}: Props) {
  return (
    
    <div className='p-8 w-full'>
  <div className="flex flex-col gap-5 w-full">
      <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
  <div className="col-span-1"><PageTitle title="Warehouse Details" /></div>
  <div className="col-span-1"><Navigation/></div>
</section>
      <DataTable columns={columns} data={data} />
    </div>
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
    header: "Product Name",
    cell:({row})=>{
      return (
      <div className="flex gap-2 items-center"> 
      <p>
        {row.getValue("name")}
         </p>
      </div>
      );  
  }

  },
  {
    accessorKey: "productcode",
    header: "Product Code"
  },
  {
    accessorKey: "quantity",
    header: "Available quantity"
  },
  
  
];

type Payment = {
  id:number;
  name:string;
  productcode:string;
  quantity: string;
};


export const data: Payment[] = [
  {
    id:1,
    name: "Product 1",
    productcode: "Prod-001",
    quantity: "50",
  },
  {
    id:2,
    name: "Product 2",
    productcode: "Prod-002",
    quantity: "25",
  },
  {
    id:3,
    name: "Product 3",
    productcode: "Prod-003",
    quantity: "120",
  },
  {
    id:4,
    name: "Product 4",
    productcode: "Prod-004",
    quantity: "0",
  },
  {
    id:5,
    name: "Product 5",
    productcode: "Prod-005",
    quantity: "10",
  },
  {
    id:6,
    name: "Product 6",
    productcode: "Prod-006",
    quantity: "250",
  },
  {
    id:7,
    name: "Product 7",
    productcode: "Prod-007",
    quantity: "0",
  },
  {
    id:8,
    name: "Product 8",
    productcode: "Prod-008",
    quantity: "25",
  },
  {
    id:9,
    name: "Product 9",
    productcode: "Prod-009",
    quantity: "100",
  },
  {
    id:10,
    name: "Product 10",
    productcode: "Prod-010",
    quantity: "65",
  },
  {
    id:11,
    name: "Product 11",
    productcode: "Prod-011",
    quantity: "1000",
  },
  {id:12,
    name: "Product 12",
    productcode: "Prod-012",
    quantity: "250",
  },
  {
    id:13,
    name: "Product 13",
    productcode: "Prod-013",
    quantity: "0",
  },
  {
    id:14,
    name: "Product 14",
    productcode: "Prod-014",
    quantity: "100",
  },
  {
    id:15,
    name: "Product 15",
    productcode: "Prod-015",
    quantity: "1",
  },
  {
    id:16,
    name: "Product 16",
    productcode: "Prod-016",
    quantity: "0",
  },
  {
    id:17,
    name: "Product 17",
    productcode: "Prod-017",
    quantity: "2",
  },
  {
    id:18,
    name: "Product 18",
    productcode: "Prod-018",
    quantity: "0",
  }
  // ...
]
