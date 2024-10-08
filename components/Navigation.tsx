// 'use client'
// import React, { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import Cookies from 'js-cookie';
// import {
//   Package2,
//   PanelLeft,
//   Search,
// } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export default function Navigation({ lang }) {
//   const router = useRouter()
//   const [newLang, setNewLang] = useState("")

//   useEffect(() => {
//     (lang === 'en' ) ? setNewLang("fr") : setNewLang("en")
//   }, [lang])
  
//   function handleLogOut(): void {
//     Cookies.remove('accessToken')
//     Cookies.remove('refreshToken')

//     router.push(`/${lang}/auth/login`)
//   }

//   function hanbleContactSupport(): void {
//     window.open('https://wa.me/+237697122421', '_blank')
//   }

//   return (
//     <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button size="icon" variant="outline" className="sm:hidden">
//             <PanelLeft className="h-5 w-5" />
//             <span className="sr-only">Toggle Menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="sm:max-w-xs">
//           <nav className="grid gap-6 text-lg font-medium">
//             <Link
//               href="#"
//               className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//             >
//               <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//               <span className="sr-only">Labcraft Inc</span>
//             </Link>
//           </nav>
//         </SheetContent>
//       </Sheet>
//       <div className="relative ml-auto flex-1 md:grow-0">
//         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//         <Input
//           type="search"
//           placeholder="Search..."
//           className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
//         />
//       </div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="outline"
//             size="icon"
//             className="overflow-hidden rounded-full"
//           >
//             <img width={200} height={200} src={`https://api.dicebear.com/7.x/lorelei/svg?seed=JoelAdmin`} alt="avatar" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => router.push(`/${lang}/settings`)}>Settings</DropdownMenuItem>
//           <DropdownMenuItem onClick={hanbleContactSupport}>Support</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => router.push(`/${newLang}/dashboard`)}>Switch to {newLang}</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </header>
//   )
// }
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import instance from '@/utils/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button"


export default function Navigation({ lang }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter()
  const [newLang, setNewLang] = useState("")

  useEffect(() => {
    (lang === 'en' ) ? setNewLang("fr") : setNewLang("en")
  }, [lang])
  
  function handleLogOut(): void {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push(`/${lang}/auth/login`)
  }

  function hanbleContactSupport(): void {
    window.open('https://wa.me/+237697122421', '_blank')
  }

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await instance.get(`/dashboard_search/?q=${value}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
        {query && searchResults && (
          <div className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-2 w-full max-h-60 overflow-y-auto" style={{ overflowX:"clip" }}>
            {searchResults.products?.map((product) => (
              <div key={product.id} className="p-2 hover:bg-gray-100">
                <p>Product: {product.name}</p>
                <p>{product.description}</p>
              </div>
            ))}
            {searchResults.categories?.map((category) => (
              <div key={category.id} className="p-2 hover:bg-gray-100">
                <p>Category: {category.name}</p>
              </div>
            ))}
            {searchResults.users?.map((user) => (
              <div key={user.id} className="p-2 hover:bg-gray-100">
                <p>User: {user.first_name} {user.last_name}</p>
                <p>{user.email}</p>
              </div>
            ))}
            {searchResults.transactions?.map((transaction) => (
              <div key={transaction.id} className="p-2 hover:bg-gray-100">
                <p>Transaction: {transaction.reference}</p>
                <p>Amount: {transaction.amount}</p>
              </div>
            ))}
          </div>
        )}
      
      </div>
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img width={200} height={200} src={`https://api.dicebear.com/7.x/lorelei/svg?seed=JoelAdmin`} alt="avatar" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => router.push(`/${lang}/settings`)}>Settings</DropdownMenuItem> */}
          <DropdownMenuItem onClick={hanbleContactSupport}>Support</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${newLang}/dashboard`)}>Switch to {newLang}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
