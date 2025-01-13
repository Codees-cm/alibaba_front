'use client'
import React from 'react';
import { DataTable } from '@/components/DataTable';
import Navigation from '@/components/Navigation';
import PageTitle from '@/components/PageTitle';
import { ColumnDef } from '@tanstack/react-table';
import { useTransactions } from '@/hooks/transactions/use-transactions';
import Link from 'next/link';
import Loader from '@/components/Loader';
import useCSVExport from '@/hooks/handleExportToCSV';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function Page({ locale }: any) {
  const { transactions, allLoading, allTransactions, allTLoading, allTFetchError } = useTransactions();
  const exportToCSV = useCSVExport();

  if (allLoading) {
    return <Loader />;
  }

  const handleExportToCSV = () => {
    if (!allTFetchError && allTransactions?.data) {
      exportToCSV(allTransactions.data, 'transactions');
    }
  };

  return (
    <div className='p-8 w-full bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1">
            <div className="flex items-center gap-4">
              <PageTitle title="Transactions" />
              <Button
                onClick={handleExportToCSV}
                className="bg-orange-400 hover:bg-orange-500 text-white"
                disabled={allTLoading || allTFetchError}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <Navigation lang={locale} />
          </div>
        </section>
        
        {transactions?.data !== undefined ? (
          <DataTable columns={columns} data={transactions.data} />
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
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
    header: "Sales Id",
    cell: ({ row }) => (
      <Link href={{pathname: `/viewTransaction/${row.original.sale_id}`}}>
        <button className="text-orange-400 hover:text-orange-700">view</button>
      </Link>
    ),
  },
];