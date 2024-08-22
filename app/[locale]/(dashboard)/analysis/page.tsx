
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
import { useEffect, useState } from 'react';
import instance from '@/utils/api';

export default function Analysis({ params: { locale } }) {
  const { t } = useTranslation(locale, "dashboard")

  const [productSalesData, setProductSalesData] = useState([]);
  const [salesDateData, setSalesDateData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const [productSalesResponse, salesDateResponse, salesResponse] = await Promise.all([
          instance.get('/api/product-sales-data/'),
          instance.get('/api/sales-date-data/'),
          instance.get('/api/sales-data/'),
        ]);

        setProductSalesData(productSalesResponse.data);
        setSalesDateData(salesDateResponse.data);
        setSalesData(salesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { data, isLoading , data_bar,loading_bar, data_inventStat,data_catInsight,data_topSellingReview , loading_inventStat,
    loading_catInsight,
    loading_topSellingReview,
  
    data_profit_per_day,
data_profit_per_week,
data_total_sales_per_day,
data_total_sales_per_week,
loading_profit_per_day,
loading_profit_per_week,
loading_total_sales_per_day,
loading_total_sales_per_week
  } = useAnalysis()


    if(isLoading && loading_inventStat &&
      loading_catInsight &&  loading_topSellingReview){
        return(<> ...</>)
    }

    if (loading) {
      return <Skeleton className="h-[300px] w-[450px] rounded-xl" />;
    }


  // Define default values for cardData
  const defaultCardData: CardProps[] = [
    {
      label: t('total-sales'),
      amount: 'Loading...', // Default amount while data is loading
      discription: '',
      icon: DollarSign,
    },
    {
      label: t('total-employees'),
      amount: 'Loading...',
      discription: '',
      icon: Users,
    },
    {
      label: t('today-transaction'),
      amount: 'Loading...',
      discription: '+12.1% from last month',
      icon: ArrowRightLeft,
    },
    {
      label: t('total-products'),
      amount: 'Loading...',
      discription: '+281 sold from last month',
      icon: Activity,
    },
    {
      label: 'products out of stock',
      amount: 'Loading...',
      discription: '+12.1% from last month',
      icon: ArrowRightLeft,
    },
    {
      label: 'Total products in stock',
      amount: 'Loading...',
      discription: '+12.1% from last month',
      icon: ArrowRightLeft,
    },
    {
      label: 'High value category',
      amount: 'Loading...',
      discription: `the average price of this category is Loading...`,
      icon: Activity,
    },
    {
      label: 'Top sale Product',
      amount: 'Loading...',
      discription: `the total revenue is Loading...`,
      icon: Activity,
    },
  ];

  // Use default values if data is loading or not available
  const cardData = loading_profit_per_day ||
  loading_profit_per_week ||
  loading_total_sales_per_day ||
  loading_total_sales_per_week ||  isLoading || loading_inventStat || loading_catInsight || loading_topSellingReview ? defaultCardData : [
    {
      label: t('total-sales'),
      amount: data?.data['total_sale_month'],
      discription: '',
      icon: DollarSign,
    },
    {
      label: t('total-employees'),
      amount: data?.data['number_of_employee'],
      discription: '',
      icon: Users,
    },
    {
      label: t('today-transaction'),
      amount: data?.data['today_sales_count'],
      discription: '',
      icon: ArrowRightLeft,
    },
    {
      label: t('total-products'),
      amount: data?.data['total_products'],
      discription: '',
      icon: Activity,
    },
    {
      label: 'products out of stock',
      amount: data_inventStat?.data['out_of_stock_count'],
      discription: '',
      icon: ArrowRightLeft,
    },
    {
      label: 'Total products in stock',
      amount: data_inventStat?.data['total_available_quantity'],
      discription: '',
      icon: ArrowRightLeft,
    },
    {
      label: 'High value category',
      amount: data_catInsight?.data[0]?.name || 'N/A',
      discription: `the average price of this category is ${data_catInsight?.data[0]?.average_price || 'N/A'}`,
      icon: Activity,
    },
    {
      label: 'Top sale Product',
      amount: data_topSellingReview?.data['top_selling_products'][0]?.name || 'N/A',
      discription: `the total revenue is ${data_topSellingReview?.data['total_revenue'] || 'N/A'}`,
      icon: Activity,
    },
  ];



  console.log(
    data_profit_per_day,
    data_profit_per_week,
    data_total_sales_per_day,
    data_total_sales_per_week,
  )

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
         {isLoading || loading_inventStat || loading_catInsight || loading_topSellingReview ? (
            <>
              {cardData.map((d, i) => (
                <Skeleton key={i} className="h-[125px] w-[210px] rounded-xl" />
              ))}
            </>
          ) : (
            <>
              {cardData.map((d, i) => (
                <Card key={i} amount={d.amount} discription={d.discription} icon={d.icon} label={d.label} />
              ))}
            </>
          )}



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

                  <Barchart data={productSalesData}/>

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
