'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
// import Image from "next/image"
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Cookies from 'js-cookie';
import {
  Package2,
  PanelLeft,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation({ lang }) {
  const router = useRouter()
  const [newLang, setNewLang] = useState("")

  useEffect(() => {
    (lang === 'en' ) ? setNewLang("fr") : setNewLang("en")
  }, [lang])
  
  function handleLogOut(): void {
    // Delete the tokens from cookies
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    // Redirect to the sign-in page
    router.push(`/${lang}/auth/login`)
  }

  function hanbleContactSupport(): void {
    // Redirect to WhatsApp with the specified number
    window.open('https://wa.me/+237697122421', '_blank')
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Labcraft Inc</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
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
          <DropdownMenuItem onClick={() => router.push(`/${lang}/settings`)}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={hanbleContactSupport}>Support</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${newLang}/dashboard`)}>Switch to {newLang}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
