"use client";

import React, { useEffect, useState } from "react";
import { Nav } from "./ui/nav";
import { useOrders } from "@/hooks/stock_manage/use-order";
import { useLocalStorage } from "@/hooks/use-local-storage"; // You'll need to create this hook

import {
  ArrowRightLeft,
  UsersRound,
  LayoutDashboard,
  Settings,
  ChevronRight,
  LineChart,
  BellRing,
  Home,
  ShoppingCart,
  Accessibility,
  DollarSign,
  Package
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { useTranslation } from "@/app/i18n/client";
import { Badge } from "./ui/badge"; // You'll need to make sure you have this component

export default function SSidenavbar({ lang, role }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation(lang, 'side-sidebar');
  const { orders, ordersLoading } = useOrders(false, null);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  // Store the last seen order count in local storage
  const [lastSeenOrderCount, setLastSeenOrderCount] = useLocalStorage('lastSeenOrderCount', 0);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  // Update notification count when orders change
  useEffect(() => {
    if (orders && !ordersLoading) {
      const currentOrderCount = orders.data.length;

      // Calculate new orders based on difference from last seen count
      const newCount = Math.max(0, currentOrderCount - lastSeenOrderCount);
      setNewOrdersCount(newCount);
    }
  }, [orders, ordersLoading, lastSeenOrderCount]);

  // Function to mark all orders as seen when navigating to orders page
  const handleOrdersClick = () => {
    if (orders && !ordersLoading) {
      setLastSeenOrderCount(orders.data.length);
      setNewOrdersCount(0);
    }
  };

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  // Custom link component with notification badge
  const OrderLink = {
    title: t('orders'),
    href: `/${lang}/warehouse/orders`,
    icon: ShoppingCart,
    variant: "ghost",
    onClick: handleOrdersClick,
    badge: newOrdersCount > 0 ? newOrdersCount : null
  };

  // Admin links with the enhanced order link
  const adminLinks = [
    {
      title: t('warehouse'),
      href: `/${lang}/warehouse`,
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: t('products'),
      href: `/${lang}/warehouse/products`,
      icon: UsersRound,
      variant: "ghost",
    },
    {
      title: t('suppliers'),
      href: `/${lang}/warehouse/supplier`,
      icon: UsersRound,
      variant: "ghost",
    },
    {
      title: t('category'),
      href: `/${lang}/warehouse/category`,
      icon: UsersRound,
      variant: "ghost",
    },
    OrderLink,
    {
      title: 'Customers',
      href: `/${lang}/warehouse/customers`,
      icon: UsersRound,
      variant: "ghost",
    },
    {
      title: 'Expenses',
      href: `/${lang}/warehouse/expenses`,
      icon: Accessibility,
      variant: "ghost",
    },
  ];

  // Employee links with the enhanced order link
  const employeeLinks = [
    {
      title: t('warehouse'),
      href: `/${lang}/warehouse`,
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: t('products'),
      href: `/${lang}/warehouse/products`,
      icon: UsersRound,
      variant: "ghost",
    },
    {
      title: t('category'),
      href: `/${lang}/warehouse/category`,
      icon: UsersRound,
      variant: "ghost",
    },
    OrderLink,
    {
      title: 'Customers',
      href: `/${lang}/warehouse/customers`,
      icon: UsersRound,
      variant: "ghost",
    },
  ];

  return (
      <div className="relative w-max border-r bg-amber-100 px-3 pb-10 pt-24">
        {role === 'admin' && (
            <NavWithNotifications
                isCollapsed={mobilewidth ? true : isCollapsed}
                links={adminLinks}
            />
        )}

        {role === 'employee' && (
            <NavWithNotifications
                isCollapsed={mobilewidth ? true : isCollapsed}
                links={employeeLinks}
            />
        )}
      </div>
  );
}

// Enhanced Nav component that supports notification badges
function NavWithNotifications({ isCollapsed, links }) {
  return (
      <Nav
          isCollapsed={isCollapsed}
          links={links.map(link => {
            // Render link differently if it has a badge
            if (link.badge) {
              return {
                ...link,
                title: (
                    <div className="flex items-center justify-between w-full">
                      <span>{link.title}</span>
                      <Badge
                          className="ml-2 bg-red-500 text-white"
                          variant="destructive"
                      >
                        {link.badge}
                      </Badge>
                    </div>
                )
              };
            }
            return link;
          })}
      />
  );
}