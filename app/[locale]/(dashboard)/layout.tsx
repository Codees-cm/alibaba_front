"use client"
import "./../globals.css"
import { cn } from "@/lib/utils";
import Sidenavbar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/use-retiveme";
// import { useEffect } from "react";
export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
const router = useRouter()
  const { me , isLoading, error } =  useMe(); 


if (isLoading){ 

  return(
  <>
  ...Loading
  </>
  )
}

setTimeout(() => {
  console.log(me); // Now 'me' should have a value
  if (!me) {
    router.push('/en/auth/login');
  }
}, 3000);

console.log(" this is the user credential:",error)



  return (

    <div style={{ margin:0 , lineHeight:"inherit",paddingBottom:"0",display:"-webkit-inline-box"}}>
          <Sidenavbar  lang={locale}/>
            {/*main page */}
            {/* <div className="p-8 w-full"> */}
              {children}
              {/* </div> */}
      </div>

  
     
       
   
  );
}
