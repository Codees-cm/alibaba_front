"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePromoCode } from "@/hooks/transactions/use-promo-code";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AddPromoCode from "@/components/AddPromoCode"; // Replace this with the actual component for adding a promo codeimportEditPromoCodefrom"@/components/EditPromoCode"; // Replace this with the actual component for editing a promo codeimport { useRouter } from"next/navigation";
import useCSVExport from '@/hooks/handleExportToCSV';
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import EditPromoCode from "@/components/EditPromoCode";
export default function PromoCodesDashboard() {
  const { promoCodes, allLoading, allFetchError , deletePromoCodes } = usePromoCode(); // Replace with your promo code fetching hookconst router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPromoCode, setSelectedPromoCode] = useState(null); // Track the selected promo code for editingconst exportToCSV = useCSVExport(); 
  const exportToCSV = useCSVExport();
  const router = useRouter();
  if (allLoading) {
    return <div>Loading...</div>;
  }

  if (allFetchError) {
    return <div>Error: {allFetchError.message}</div>;
  }

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const filteredPromoCodes = promoCodes?.data.filter((promo: { code: string; }) =>
    promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredPromoCodes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredPromoCodes.slice(startIndex, endIndex);

  const handleExportToCSV = () => {
    exportToCSV(promoCodes.data, 'promoCodes');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-amber-100 to-white"><div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"><main className="grid flex-1 items-start gap-4 p-4 sm:px-6  ml-15 mt-10 sm:py-0 md:gap-8"><Tabs defaultValue="all"><TabsContent value="all"><Card className="shadow-lg"><CardHeader><div className="space-y-1"><CardTitle className="text-2xl font-extrabold tracking-tight lg:text-4xl">
      Promo Codes
    </CardTitle><CardDescription>
        List of all your promo codes
      </CardDescription><div className="ml-auto flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search promo codes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mr-2"
        /><div>
          <Button onClick={handleExportToCSV} >Export</Button></div>
        <AlertDialog style={{ width: "fit-content" }}>
          <AlertDialogTrigger className="text-sm font-semibold text-white rounded-lg p-2  bg-orange-500 border-slate-950">Add Promo Code
          </AlertDialogTrigger><AlertDialogContent className="w-max">
            <AlertDialogHeader><AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel></AlertDialogFooter>
              <AlertDialogDescription style={{ minWidth: 'max-content' }}><AddPromoCode />
                {/* Replace this with your add promo code component */}
              </AlertDialogDescription></AlertDialogHeader>
          </AlertDialogContent></AlertDialog></div></div></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Promo Code</TableHead><TableHead>Usage Limit</TableHead><TableHead>Expiration Date</TableHead><TableHead>Discount (%)</TableHead> <TableHead>Number of usage</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>
            {displayedItems.map((promo: React.SetStateAction<null>) => (
              <TableRow key={promo.id}><TableCell className="font-medium">{promo.code}</TableCell><TableCell>{promo.max_usage}</TableCell><TableCell> {new Date(promo.expiry_date).toLocaleDateString("en-US", { year: "numeric",month: "long", day: "2-digit"})}</TableCell>
              <TableCell>{promo.discount}</TableCell><TableCell>{promo.usage_count}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button
                variant="ghost"
                className="h-8 w-8 p-0"
              ><MoreHorizontal className="h-4 w-4" />
              </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem onClick={() => router.push(`promo-codes/${promo.id}`)}>Details</DropdownMenuItem> */}
                  {/* <DropdownMenuItem onClick={() => setSelectedPromoCode(promo)}>
                    Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={async () => deletePromoCodes(promo.id)}>
                                Delete
                              </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </TableCell>
              </TableRow>
            ))}
          </TableBody></Table>
        {pageCount > 1 && (
          <div className="flex justify-center mt-4">
            {[...Array(pageCount)].map((_, index) => (
              <Button key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? 'solid' : 'ghost'}
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-orange-200 text-orange-800' : 'text-gray-600'
                  }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
      </CardContent></Card><div className="mt-4 text-center text-sm text-gray-600">
        Showing page {currentPage} of {pageCount}
      </div></TabsContent></Tabs></main></div>

      {/* Edit Promo Code Dialog */}
      {selectedPromoCode && (
        <AlertDialog open={!!selectedPromoCode} onOpenChange={(open) => !open && setSelectedPromoCode(null)}>
          <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Edit Promo Code</AlertDialogTitle><AlertDialogDescription>
            <EditPromoCode
            id={selectedPromoCode.id}
            initialData={selectedPromoCode}
            onClose={() => setSelectedPromoCode(null)}
          /> 
            {/* Replace this with your edit promo code component */}
          </AlertDialogDescription>
          </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedPromoCode(null)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
