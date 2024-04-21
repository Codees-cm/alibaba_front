"use client"
import SSidenavbar from "@/components/SSidebar";
export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  return (
    <>
      {/* <div className="p-8 w-full"> */}
      <SSidenavbar  lang={locale}/>
        {/*main page */}
        {/* <div className=" p-4 w-auto">
          </div> */}
        {/* <main className=" w-full"> */}
        {children}
         
        {/* </main> */}
      {/* </div> */}
      
    </>
      
    
  );
}
