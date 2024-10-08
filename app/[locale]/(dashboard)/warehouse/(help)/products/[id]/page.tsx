
"use client"
import  ProductDetails  from "@/components/ProductDetails";
import { useMe } from "@/hooks/use-retiveme";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
type Props = {
   params: {
       id: number;
   };  
};
const Page: React.FC<Props> = ({ params }) => {
       const { me, isLoading, error } = useMe();
      const router = useRouter();

       if (error) {
         router.replace('auth/login');
       }
     
       if (isLoading) {
         return <Loader />;
       }
     
   return(
    <>
    <ProductDetails params={params}  role={me?.data.role} />
    
    </>
   )
};


export default Page;