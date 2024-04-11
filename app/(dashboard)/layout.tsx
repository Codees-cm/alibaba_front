"use client"
import "./../globals.css"
import { cn } from "@/lib/utils";
import Sidenavbar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/use-retiveme";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const router = useRouter()
  const { me , isLoading, error } =  useMe(); 

  useEffect(()=>{
    if(me){
      if (me?.status != 200) router.push('/auth/login')
    }
  },[me,router])


if (isLoading){
  return(
  <>
  ...Loading
  </>
  )
}


  console.log(" this is the user credential:",error)



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
        <Sidenavbar />
        {/*main page */}
        {/* <div className="p-8 w-full"> */}
          {children}
          {/* </div> */}
       
      </body>
    </html>
  );
}
