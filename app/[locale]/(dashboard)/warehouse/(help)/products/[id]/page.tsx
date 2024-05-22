
import  ProductDetails  from "@/components/ProductDetails";


const Page: React.FC<Props> = ({ params }) => {
   return(
    <>
    <ProductDetails params={params} />
    
    </>
   )
};


export default Page;