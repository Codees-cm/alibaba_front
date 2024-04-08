import { Metadata } from "next";
import "./../globals.css"
// import { cn } from "./../lib/utils";
import { cn } from "@/lib/utils";
import Sidenavbar from "@/components/Sidebar";
// import TanstackProvider from "./providers/TanstackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
      
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        {/* <TanstackProvider> */}
        {/* Slide bar*/}
        {/*<p className="border" >Slidebar</p>*/}
        <Sidenavbar />
        {/*main page */}
        <div className="p-8 w-full">{children}</div>
        <main className="h-screen flex flex-col justify-center items-center">
         
        </main>
        {/* </TanstackProvider> */}
      </body>
    </html>
  );
}
