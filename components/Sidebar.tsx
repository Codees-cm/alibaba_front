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
export default function Sidenavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative w-max border-r px-3 pb-10 pt-24">
     {!mobilewidth && (
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
     )} 
      <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Employee",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          // {
          //   title: "Products",
          //   href: "/products",
          //   icon: Package ,
          //   variant: "ghost",
          // },
          {
            title: "Warehouse",
            href: "/warehouse",
            icon: Home,
            variant: "ghost",
          },
          {
            title: "Transactions",
            href: "/viewTransaction",
            icon: ArrowRightLeft,
            variant: "ghost",
          },
          {
            title: "Analysis",
            href: "/#",
            icon: LineChart,
            variant: "ghost",
          },
          {
            title: "Sales",
            href: "sales",
            icon: DollarSign,
            variant: "ghost",
          },
          {
            title: "Notifications",
            href: "/#",
            icon: BellRing,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings, 
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
