"use client";
import React, { useState } from "react";
import { Nav } from "./ui/nav";
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
import Image from "next/image";
import LogoPic from '../public/img/icon-512x512.png'

export default function Sidenavbar({lang}) {
  const { t } =  useTranslation(lang,'sidebar')
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative w-max h-screen border-r bg-amber-100 px-3 pb-10 pt-24">
     
     {!mobilewidth && (<>
   
       <div className="flex items-center justify-center mb-6">
       <Image src={LogoPic} alt={"logo"}   width={isCollapsed ? 40 : 100}
          height={isCollapsed ? 40 : 100}
          className="transition-all" />
     </div>
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary" 
          className=" rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      </>
     )} 
      <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title: t('dashboard'),
            // href: "dashboard",
            href: `/${lang}/dashboard`,

            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: t('employee'),
            href: `/${lang}/employees`,
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: t('warehouse'),
            href: `/${lang}/warehouse`,
            icon: Home,
            variant: "ghost",
          },
          {
            title:  t('transactions'),
            href: `/${lang}/viewTransaction`,
            icon: ArrowRightLeft,
            variant: "ghost",
          },
          {
            title:  t('analysis'),
            href: `/${lang}/analysis`,
            icon: LineChart,
            variant: "ghost",
          },
          {
            title: t('sales'),
            href: `/${lang}/sales`,
            icon: DollarSign,
            variant: "ghost",
          },
          {
            title:  t('notifications'),
           href: `/${lang}/sales`,
            icon: BellRing,
            variant: "ghost",
          },
          {
            title:  t('settings'),
            href: `/${lang}/settings`,
            icon: Settings, 
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
