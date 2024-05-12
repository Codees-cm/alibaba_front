
"use client"

import { useDashboard } from "@/hooks/analysis/use-dashboard";
import { useTranslation } from '@/app/i18n/client';
import Card, { CardContent, CardProps } from "@/components/Card";
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Activity, ArrowRightLeft, Users, DollarSign } from "lucide-react";
import Barchart from "@/components/barchart";
import { Skeleton } from "@/components/ui/skeleton"

const UserSalesData: SalesProps[] = [
  {
    name: "Oliviia Martin",
    email: "olivia.marting@gmail.com",
    saleAmount: "$1,999.0"
  },
];


export default function Home({ params: { locale } }) {
  const { t } = useTranslation(locale, "dashboard")

  const { data, isLoading , data_bar,loading_bar} = useDashboard()

  const cardData: CardProps[] = [
    {
      label: t('total-sales'),
      amount: data?.data["total_sale_month"],
      discription: "",
      icon: DollarSign,
    },
    {
      label: t('total-employees'),
      amount: data?.data["number_of_employee"],
      discription: "",
      icon: Users,
    },
    {
      label: t('today-transaction'),
      amount: data?.data["today_sales_count"],
      discription: "+12.1% from last month",
      icon: ArrowRightLeft,
    },
    {
      label: t('total-products'),
      amount: data?.data["total_products"],
      discription: "+281 sold from last month",
      icon: Activity,
    },
  ];

  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100  to-white">
      <div className="flex flex-col gap-8 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Dashboard" /></div>

          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>


        <section
          className="grid w-full grid-cols-1 gap-4 gap-x-4 transition-all 
      sm:grid-cols-2 xl:grid-cols-4"
        >
          {
            isLoading ? (
              <>
                {cardData.map((d, i) => (

                  <Skeleton key={i} className="h-[125px] w-[210px] rounded-xl" />

                ))}
              </>
            ) : (
              <>
                {cardData.map((d, i) => (
                  <Card
                    key={i}
                    amount={d.amount}
                    discription={d.discription}
                    icon={d.icon}
                    label={d.label}
                  // className="shadow-sm"
                  />
                ))}
              </>
            )
          }



        </section>
        <section className=" grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
          {
            (isLoading&&loading_bar) ? (
              <>
                <Skeleton className="h-[300px] w-[470px] rounded-xl" />
              </>
            ) : (
              <>
                <CardContent>
                  <p className="p-4 font-semibold">{t('overview')}</p>

                  <Barchart data={data_bar?.data}/>

                </CardContent>
              </>
            )
          }
          {
            isLoading ? (
              <>
                <Skeleton className="h-[300px] w-[450px] rounded-xl" />
              </>
            ) : (
              <>
                <CardContent className="flex justify-between gap-4">
                  <section>
                    <p>Recent transactions</p>
                    <p className="text-sm text-gray-400">
                      you made 26 transactions in one months
                    </p>


                  </section>
                  {UserSalesData.map((d, i) => (
                    <SalesCard
                      key={i}
                      name={d.name}
                      email={d.email}
                      saleAmount={d.saleAmount}
                    />
                  ))}

                </CardContent>
              </>
            )
          }




          {/**/}
        </section>
      </div>

    </div>


  );
}
