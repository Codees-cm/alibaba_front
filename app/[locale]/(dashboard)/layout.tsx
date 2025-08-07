"use client"
import "./../globals.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/use-retiveme";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Header from "@/components/ecommerce/Header";
import Sidebar from "@/components/ecommerce/Sidebar";

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { me, isLoading, error } = useMe(); 
  const [authChecked, setAuthChecked] = useState(false);

  // useEffect(() => {
  //   // Check authentication after loading is complete
  //   if (!isLoading) {
  //     setAuthChecked(true);
      
  //     // If no user data and there's an error, redirect to login
  //     if (!me && error) {
  //       console.log("No authenticated user found, redirecting to login");
  //       router.push(`/${locale}/auth/login`);
  //       return;
  //     }
  //   }
  // }, [me, isLoading, error, router, locale]);

  // Show loading while checking authentication
  // if (isLoading || !authChecked) { 
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading Tondo...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Show loading if user is not authenticated
  // if (!me) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600">Redirecting to login...</p>
  //       </div>
  //     </div>
  //   );
  // }

  console.log("Authenticated user:", me);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            locale={locale}
          />
          
          {/* Main Content */}
          <main className="flex-1 min-h-screen bg-gray-50 md:ml-0">
            {children}
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}
