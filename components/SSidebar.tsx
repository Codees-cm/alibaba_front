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
export default function SSidenavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative w-max border-r px-3 pb-10 pt-24">
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
            title: "warehouse",
            href: "/warehouse",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "products",
            href: "/warehouse/products",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "suppliers",
            href: "/warehouse/supplier",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "category",
            href: "/warehouse/category",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/warehouse/Orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
