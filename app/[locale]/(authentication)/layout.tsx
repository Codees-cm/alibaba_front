"use client"
import "./../globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <main className="h-screen flex flex-col justify-center items-center">
          {children}
        </main>
  
  );
}
