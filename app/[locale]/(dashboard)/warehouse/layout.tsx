"use client"
import SSidenavbar from "@/components/SSidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      {/* <div className="p-8 w-full"> */}
      <SSidenavbar />
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
