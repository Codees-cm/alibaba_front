import WarehouseDetail from '@/app/(dashboard)/viewWarehouse/page';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'
import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';
import React from 'react'

export type CardProps = {
    label:string;
    icon:LucideIcon;
    amount:string;
    discription: string;
};
function show()  {
    <WarehouseDetail/>
}
export default function Card(Props: CardProps) {
 return <CardContent >
    <section className="flex justify-between gap-2">
        {/*label*/}
        <p className="text-sm">{Props.label}</p>
          {/*icon*/}
          <Props.icon className="h-4 w-4 text-gray-400" />
    </section>
    <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{Props.amount}</h2>
        <p className="text-xs text-gray-500">{Props.discription}</p>
    </section>
 </CardContent>
}


export function CardContent(props:React.HTMLAttributes<HTMLDivElement> , onClick="show()"){
    return (
    <div
    {...props}
    
    className= {cn("flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
    props.className)}/>
    );
}