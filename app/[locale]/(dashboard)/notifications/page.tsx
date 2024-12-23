'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Navigation from '@/components/Navigation'
import { DataTable } from '@/components/DataTable'
import PageTitle from '@/components/PageTitle';
import { useNotifications } from '@/hooks/stock_manage/use-notifications';
import instance from '@/utils/api';

type Props = {
    locale: any;
    params: {
        id: number
    }
}

function Page({ locale, params }: Props) {
    const { notifications, allLoading } = useNotifications();
    const deleteAllNotifications = async () => {
      console.log("Delete button clicked");
      const confirmDelete = window.confirm("Are you sure you want to delete all notifications?");
      if (!confirmDelete) {
          console.log("Delete action canceled"); // Debugging step
          return;
      }
  
      try {
          console.log("Sending DELETE request to /notifications/delete_all/"); // Debugging step
          const response = await instance.delete('/notifications/delete_all/');
          console.log("API response:", response); // Debugging step
          alert("All notifications deleted successfully.");
      } catch (error) {
          console.error("Error deleting notifications:", error); // Debugging step
          alert("An error occurred while deleting notifications.");
      }
  };
  

    return (
        <div className='p-8 bg-gradient-to-r from-amber-100 to-white'>
            <div className="flex flex-col gap-5 w-full">
                <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
                    <div className="col-span-1"><PageTitle title="Notifications" /></div>
                    <div className="col-span-1"><Navigation lang={locale} /></div>
                </section>
                <div className="flex justify-end">
                    <button
                        onClick={deleteAllNotifications}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete All Notifications
                    </button>
                </div>
                {
                    allLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            <DataTable columns={columns} data={notifications?.data} />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Page;

const columns: ColumnDef<Payment>[] = [
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
