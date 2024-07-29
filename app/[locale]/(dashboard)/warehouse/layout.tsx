"use client"
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SSidenavbar from "@/components/SSidebar";
import { useTranslation } from "@/app/i18n/client";

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { t } = useTranslation(locale,'warehouse')
  return (
    <>
      {/* <div className="p-8 w-full"> */}
      <SSidenavbar  lang={locale}/>
      {/* <div className='p-8 w-full  bg-gradient-to-r from-amber-100 to-white'>
      <div className="flex flex-col gap-5 w-full">
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title={ t('warehouses')} /></div>
          <div className="col-span-1">
            <Navigation lang={locale}  />
            </div> */}
            {children}
          
        {/* </section>
        </div>
        </div> */}

        {/*main page */}
        {/* <div className=" p-4 w-auto">
          </div> */}
        {/* <main className=" w-full"> */}
       
         
        {/* </main> */}
      {/* </div> */}
      
    </>
      
    
  );
}
