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

  // useEffect(()=>{
  //   console.log(me)
  //   if(me){
  //     if (me?.status != 200) router.push('/auth/login')
  //   }
  // },[me,router])


if (isLoading){
  return(
  <>
  ...Loading
  </>
  )
}

if(me?.data){
  if (me?.status != 200) router.push('/auth/login')
}

  console.log(" this is the user credential:",error)



  return (

    <div style={{ margin:0 , lineHeight:"inherit",paddingBottom:"0",display:"-webkit-inline-box"}}>
          <Sidenavbar />
            {/*main page */}
            {/* <div className="p-8 w-full"> */}
              {children}
              {/* </div> */}
      </div>

  
     
       
   
  );
}
