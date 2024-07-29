'use client'
import { DataTable } from '@/components/DataTable'
import Navigation from '@/components/Navigation'
import PageTitle from '@/components/PageTitle'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
// import { useSales } from '@/hooks/use-sales'
import { useTransactions } from '@/hooks/transactions/use-transactions'
type Props = {}


export default function UsersPage({locale}: Props) {
  const { transactions, allLoading } = useTransactions(true)


  if (allLoading) {
    return (<>
      ... is loading
    </>)
  }
  console.log(transactions?.data)

  return (

    <div className='p-8 w-full  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Transactions" /></div>
          <div className="col-span-1">
            <Navigation lang={locale}  />
            </div>
        </section>
        {transactions?.data !== undefined ? (
       <DataTable columns={columns} data={transactions?.data} />
      ) : (
        <div>Non data</div>
      )}
       
      </div>
    </div>

  )
}


export const columns = [
  {
    accessorKey: "user",
    header: "User"
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction type"
  },
  {
    accessorKey: "payment_method",
    header: " method"
  },
  {
    accessorKey: "amount",
    header: "Amount"
  },
  {
    accessorKey: "sale_id",
    header: "Sales Id"
  },
];
