"use client"
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SSidenavbar from "@/components/SSidebar";
import { useTranslation } from "@/app/i18n/client";
import { useMe } from "@/hooks/use-retiveme";


export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { me, isLoading, error } = useMe();
  // const { t } = useTranslation(locale,'warehouse')
  return (
    <>
      {/* <div className="p-8 w-full"> */}
      <SSidenavbar  lang={locale} role={me?.data.role}/>
    
            {children}
          
    
    </>
      
    
  );
}
