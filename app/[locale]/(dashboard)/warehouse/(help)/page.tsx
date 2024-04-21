import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import Warehouse from "@/components/Warehouse";

export default function page({ params: { locale } }) {
 

  console.log(locale)
return (
  <>
  

  <Warehouse lang={locale}/>
  
  </>

)
}