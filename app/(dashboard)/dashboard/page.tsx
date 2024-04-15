"use client"
import Card, { CardContent, CardProps } from "@/components/Card";
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Activity, CreditCard, ArrowRightLeft, Users, Folder, DollarSign } from "lucide-react";

import Image from "next/image";
import { useDashboard } from "@/hooks/analysis/use-dashboard";



const UserSalesData: SalesProps [] = [
  {
    name: "Oliviia Martin",
    email: "olivia.marting@gmail.com",
    saleAmount: "$1,999.0"
  },
  {
    name: "Ricky Farel",
    email: "ricky.farel@gmail.com",
    saleAmount: "$3,999.0"
  },
  {
    name: "William kit",
    email: "wiliam.kit@gmail.com",
    saleAmount: "$299.0"
  },
  {
    name: "Jackson luc",
    email: "jackson.luc@gmail.com",
    saleAmount: "$799.0"
  }
];

export default function Home() {
  const {data} = useDashboard()

  // console.log(data?.data)

  const cardData: CardProps[] = [
    {
      label: "Total Sales",
      amount: "----",
      discription:"",
      icon: DollarSign,
    },
    {
      label: "Total Employees",
      amount: "----",
      discription:"",
      icon: Users,
    },
    {
      label: "Today Transactions",
      amount: "----",
      discription: "+12.1% from last month",
      icon: ArrowRightLeft,
    },
    {
      label: "Total Products",
      amount: data?.data["total_products"],
      discription: "+281 sold from last month",
      icon: Activity,
    },
  ];

  return (
    <div className="p-8 w-full">
 <div className="flex flex-col gap-8 w-full">
     <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
  <div className="col-span-1"><PageTitle title="Dashboard" /></div>
  
  <div className="col-span-1"><Navigation/></div>
</section>
      

      <section
        className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all 
      sm:grid-cols-2 xl:grid-cols-4"
      >
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
        
      </section>
      <section className=" grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>


          
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent transactions</p>
            <p className="text-sm text-gray-400">
            you made 26 transactions in one months
            </p>
 

          </section>
          {UserSalesData.map((d,i)=>(
<SalesCard
key={i}
name={d.name}
email={d.email}
saleAmount={d.saleAmount}
/>
          ))}
          
        </CardContent>


        {/**/}
      </section>
    </div>

    </div>
   

  );
}
