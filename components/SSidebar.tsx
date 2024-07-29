"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ArrowRightLeft ,
  UsersRound,
  LayoutDashboard,
  Settings,
  ChevronRight,
  LineChart,
  BellRing,
  Home,
  ShoppingCart,
  DollarSign,
  Package
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { useTranslation } from "@/app/i18n/client";
export default function SSidenavbar({lang}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {t} = useTranslation(lang,'side-sidebar')

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative w-max border-r  bg-amber-100 px-3 pb-10 pt-24">
     {/* {!mobilewidth && (
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
        </Button>
      </div>
     )}  */}
      <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title:  t('warehouse'),
            href: `/${lang}/warehouse`,
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title:  t('products'),

            href: `/${lang}/warehouse/products`,
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title:  t('suppliers'),

            href:`/${lang}/warehouse/supplier`,
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title:  t('category'),

            href:`/${lang}/warehouse/category`,
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title:  t('orders'),

            href:`/${lang}/warehouse/orders`,
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title:  'Customers',

            href:`/${lang}/warehouse/customers`,
            icon: UsersRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
