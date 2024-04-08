"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/settings">
              Profile
            </Link>
            <Link href="/accounts" className="font-semibold text-primary">Account</Link>
            <Link href="#">Apperance</Link>
            <Link href="#">Notifications</Link>
            <Link href="#">Display</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Update your account settings. Set your preferred language and
                  timezone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <label>Name</label>
                  <Input placeholder="Your name" />
                  <CardDescription className="text-sm">
                    This is the name that will be displayed on your profile and
                    in emails.
                  </CardDescription>
                  <br />
                  <label>Date of birth</label>
                  <Input type="date" placeholder="pick a date" />
                  <CardDescription>
                    Your date of birth is used to calculate your age.
                  </CardDescription>
                  <br />
                  <label>Language</label>
                  <select>
                    <option>English</option>
                    <option>French</option>
                  </select>
                  <CardDescription>
                    You can @mention other users and organizations to link to
                    them.
                  </CardDescription>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Update Account</Button>
              </CardFooter>
            </Card>
            <Card>
              
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
