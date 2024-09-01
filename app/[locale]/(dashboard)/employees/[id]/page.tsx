'use client';

import React from 'react';
import { useTransactions } from '@/hooks/transactions/use-transactions';
import { ColumnDef } from '@tanstack/react-table';
import Navigation from '@/components/Navigation';
import { DataTable } from '@/components/DataTable';
import { useEmployee } from '@/hooks/use-employees';
import PageTitle from '@/components/PageTitle';

type Props = {
  locale: any;
  params: {
    id: number;
  };
};

function Page({ locale, params }: Props) {
  const { employeesHistory, allLoadinghistory } = useEmployee(true, params.id);

  if (allLoadinghistory) {
    return <div>..loading</div>; // Show loading message if fetching data
  }

  // Access the data property
  const historyData = employeesHistory?.data || [];

  // Calculate total quantity and total price
  const totalQuantity = historyData.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = historyData.reduce((total, item) => total + item.quantity * item.product.price, 0);

  console.log(historyData);

  return (
    <div className="p-8 bg-gradient-to-r from-amber-100 to-white">
      <div className="flex flex-col gap-5 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Transactions in Sale" /></div>
          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>
        {historyData.length > 0 ? (
          <>
            <DataTable columns={columns} data={historyData} />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Summary</h3>
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: {totalPrice.toFixed(2)} USD</p>
            </div>
          </>
        ) : (
          <p>No transactions found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default Page;

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "product.product_code",
    header: "Product Code",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "purchased_at",
    header: "Date",
  },
  {
    accessorKey: "product.price",
    header: "Price",
    cell: ({ row }) => <span>{(row.original.quantity * row.original.product.price).toFixed(2)} USD</span>,
  },
];
