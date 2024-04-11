
import SSidenavbar from "@/components/SSidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      <SSidenavbar />
        {/*main page */}
        {/* <div className=" p-4 w-auto">
          </div> */}
        <main className="h-screen flex flex-col justify-center items-center">
        {children}
         
        </main>
    </>
      
    
  );
}
