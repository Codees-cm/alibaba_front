"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  FolderOpenDot ,
  UsersRound,
  LayoutDashboard,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import Card from "./Card";
export default function Sidesnavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
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
     <section>
     <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
        
          {
            title: "Projects",
            href: "/orders",
            icon:FolderOpenDot,
            variant: "ghost",
          },
          
        ]}
      />
       <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title: "Project Members",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Budget",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Overview",
            href: "/orders",
            icon:FolderOpenDot,
            variant: "ghost",
          },
          {
            title: "To do list",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
     </section>
     
    </div>
  );
}
