
"use client"

import { useTranslation } from '@/app/i18n/client';
import Card, { CardContent, CardProps } from "@/components/Card";
import Navigation from "@/components/Navigation";
import PageTitle from "@/components/PageTitle";
import { Activity, ArrowRightLeft, Users, DollarSign } from "lucide-react";
import Barchart from "@/components/barchart";
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from 'react';
import instance from '@/utils/api';
import { useAnalysis } from "@/hooks/analysis/use-analysis";
import LineChartComponent from '@/components/LineChart';

export default function Accounting({ params: { locale } }) {
  const { t } = useTranslation(locale, "dashboard")

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const [
          grossProfit,
          netProfit,
          operateProfit,
          totalRev,
          totalExpense,
          productSalesData,
          salesDateData,
          salesData,
          incomeStatementData
        ] = await Promise.all([
          instance.get('analysis/gross-profit/'),
          instance.get('analysis/net-profit/'),
          instance.get('analysis/operating-profit/'),
          instance.get('analysis/total-revenue/'),
          instance.get('analysis/total-expenses/'),
          instance.get('api/product-sales-data/'), // Product sales data
          instance.get('api/sales-date-data/'), // Sales per date
          instance.get('api/sales-data/'), // Sales data
          instance.get('income-statement/'), 
        ]);
  
        setData({
          gross: grossProfit.data || "",
          net: netProfit.data || "",
          operating: operateProfit.data || "",
          revenue: totalRev.data || "",
          expenses: totalExpense.data || "",
          productSales: productSalesData.data || [], // Store product sales data
          salesDate: salesDateData.data || [], // Store sales per date
          sales: salesData.data || [], 
          incomeStatement: incomeStatementData.data || {}, // Store sales data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  
  const {
  
    data_profit_per_day,
data_profit_per_week,
data_total_sales_per_day,
data_total_sales_per_week,
loading_profit_per_day,
loading_profit_per_week,
loading_total_sales_per_day,
loading_total_sales_per_week
  } = useAnalysis()


 
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


  const cardData = loading ? defaultCardData : [
   
    {
      label: "Operation Profit",
      amount: data.operating.operating_profit || 0,
      discription: '',
      icon: ArrowRightLeft,
    },
    {
      label: "Total Revenue",
      amount: data.revenue.total_revenue || 0,
      discription: '',
      icon: Activity,
    },
    {
      label: "Beginning Inventory",
      amount: data.incomeStatement.beginning_inventory || 0,  // New data
      discription: '',
      icon: Activity,
    },
    {
      label: "Ending Inventory",
      amount: data.incomeStatement.ending_inventory || 0,  // New data
      discription: '',
      icon: Activity,
    },
    {
      label: "Purchases of Goods",
      amount: data.incomeStatement.purchases_of_goods || 0,  // New data
      discription: '',
      icon: Activity,
    },
    {
      label: "Current Expenses",
      amount: data.incomeStatement.current_expenses || 0,  // New data
      discription: '',
      icon: Activity,
    },
    {
      label: "Gross Profit",
      amount: data.incomeStatement.gross_profit || 0,  // New data
      discription: '',
      icon: DollarSign,
    },
    {
      label: "Net Profit",
      amount: data.incomeStatement.net_profit || 0,  // New data
      discription: '',
      icon: DollarSign,
    },
  ];
  


  return (
    <div className="p-8 w-full bg-gradient-to-r from-amber-100  to-white" style={{ maxHeight:"100%", overflow: "auto" }}>
      <div className="flex flex-col gap-8 w-full">
      <section className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div className="col-span-1"><PageTitle title="Accounting" /></div>

          <div className="col-span-1"><Navigation lang={locale} /></div>
        </section>

        <section
          className="grid w-full grid-cols-1 gap-4 gap-x-4 transition-all 
      sm:grid-cols-2 xl:grid-cols-4"
        >
         {loading ? (
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
            (loading_profit_per_day) ? (
              <>
                <Skeleton className="h-[300px] w-[470px] rounded-xl" />
              </>
            ) : (
              <>
                <CardContent>
                  <p className="p-4 font-semibold">{t('data_profit_per_day')}</p>
                  <LineChartComponent data={data_profit_per_day?.data} dataKey="total_profit" xKey="sale_date" />

                  {/* <Barchart data={data_profit_per_day?.data} dataKey={"total_sale per day"} xKey={"profit"}/> */}

                </CardContent>
              </>
            )
          }
          {
            loading_profit_per_week ? (
              <>
                <Skeleton className="h-[300px] w-[450px] rounded-xl" />
              </>
            ) : (
              <>
              <CardContent>
                  <p className="p-4 font-semibold">{t('data_profit_per_week')}</p>
                  {/* <LineChartComponent data={data_profit_per_day?.data} /> */}
                  {/* <Barchart data={data_total_sales_per_day?.data} dataKey="total_sales" xKey="sale_date" /> */}

                  <Barchart data={data_profit_per_week?.data} dataKey="total_profit" xKey="week"/>
                  {/* <PieChartComponent data={data_prof dataKey="total_profit" xKey="sale_date"it_per_week?.data}/> */}
                </CardContent>
              </>
            )
          }
          {
            loading_total_sales_per_day ? (
              <>
                <Skeleton className="h-[300px] w-[450px] rounded-xl" />
              </>
            ) : (
              <>
              <CardContent>
                  <p className="p-4 font-semibold">{t('data_total_sales_per_day')}</p>
                  {/* <LineChartComponent data={data_profit_per_day?.data} /> */}
                  {/* <Barchart data={data_total_sales_per_day?.data} dataKey="total_sales" xKey="sale_date" /> */}

                  <LineChartComponent data={data_total_sales_per_day?.data} dataKey="total_sales" xKey="sale_date"/>
                  {/* <PieChartComponent data={data_prof dataKey="total_profit" xKey="sale_date"it_per_week?.data}/> */}
                </CardContent>
              </>
            )
          }
    {
            loading_total_sales_per_week ? (
              <>
                <Skeleton className="h-[300px] w-[450px] rounded-xl" />
              </>
            ) : (
              <>
              <CardContent>
                  <p className="p-4 font-semibold">{t('data_total_sales_per_week')}</p>
                  {/* <LineChartComponent data={data_profit_per_day?.data} /> */}
                  {/* <Barchart data={data_total_sales_per_day?.data} dataKey="total_sales" xKey="sale_date" /> */}

                  <LineChartComponent data={data_total_sales_per_week?.data} dataKey="total_sales" xKey="week"/>
                  {/* <PieChartComponent data={data_prof dataKey="total_profit" xKey="sale_date"it_per_week?.data}/> */}
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
