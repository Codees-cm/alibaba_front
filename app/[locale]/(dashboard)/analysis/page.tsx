
"use client"

import { useTranslation } from '@/app/i18n/client';
import Card, { CardContent, CardProps } from "@/components/Card";
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Activity, ArrowRightLeft, Users, DollarSign } from "lucide-react";
import Barchart from "@/components/barchart";
import { Skeleton } from "@/components/ui/skeleton"
import { useAnalysis } from "@/hooks/analysis/use-analysis";
import PieChartComponent from '@/components/PieChart';
import LineChartComponent from '@/components/LineChart';
const UserSalesData: SalesProps[] = [
  {
    name: "Oliviia Martin",
    email: "olivia.marting@gmail.com",
    saleAmount: "$1,999.0"
  },
];


export default function Analysis({ params: { locale } }) {
  const { t } = useTranslation(locale, "dashboard")

  const { data, isLoading , data_bar,loading_bar, data_inventStat,data_catInsight,data_topSellingReview , loading_inventStat,
    loading_catInsight,
    loading_topSellingReview} = useAnalysis()

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
    {
      label: "products out of stock",
      amount: data_inventStat?.data["out_of_stock_count"],
      discription: "+12.1% from last month",
      icon: ArrowRightLeft,
    },
    {
      label: "Total products in stock",
      amount: data_inventStat?.data["total_available_quantity"],
      discription: "+12.1% from last month",
      icon: ArrowRightLeft,
    },
    {
      label: "High value category",
      amount: data_catInsight?.data[0]["name"],
      discription: `the average price of this category is ${data_catInsight?.data[0]["average_price"]}` ,
      icon: Activity,
    },
    {
      label: "Top sale Product",
      amount: data_topSellingReview?.data['top_selling_products'][0]["name"],
      discription: `the total revenue is ${data_topSellingReview?.data["total_revenue"]}` ,
      icon: Activity,
    },
  ];
  const dummyData = [
    { name: "Product A", total: 150 },
    { name: "Product B", total: 200 },
    { name: "Product C", total: 120 },
    { name: "Product D", total: 350 },
    { name: "Product E", total: 280 },
  ];

  const salesDateData = [
    { date: "2022-01-01", quantitySold: 150 },
    { date: "2022-01-02", quantitySold: 200 },
    { date: "2022-01-03", quantitySold: 120 },
    { date: "2022-01-04", quantitySold: 350 },
    { date: "2022-01-05", quantitySold: 280 },
    { date: "2022-01-06", quantitySold: 400 },
    // Add more data points for different dates
  ];
  const salesData = [
    { productName: "Product A", quantitySold: 150 },
    { productName: "Product B", quantitySold: 200 },
    { productName: "Product C", quantitySold: 120 },
    { productName: "Product D", quantitySold: 350 },
    { productName: "Product E", quantitySold: 280 },
  ];
  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100  to-white">
      <div className="flex flex-col gap-8 w-full">
        <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Analysis" /></div>

          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>


        <section
          className="grid w-full grid-cols-1 gap-4 gap-x-4 transition-all 
      sm:grid-cols-2 xl:grid-cols-4"
        >
          {
            (isLoading && loading_inventStat &&
              loading_catInsight &&  loading_topSellingReview ) ? (
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
              <CardContent>
                  <p className="p-4 font-semibold">{t('overview')}</p>

                  <Barchart data={dummyData}/>

                </CardContent>
              </>
            )
          }




          {/**/}
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

                  {/* <Barchart data={data_bar?.data}/> */}
                  <LineChartComponent data={salesDateData} />

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
              <CardContent>
                  <p className="p-4 font-semibold">{t('overview')}</p>

                  <PieChartComponent data={salesData}/>

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
