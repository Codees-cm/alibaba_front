import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'
import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export type CardProps = {
    label:string;
    icon:LucideIcon;
    project:string;
    members: string;
    
};

export default function Card2(Props: CardProps) {
 return <CardContent>
    <section className="flex justify-between gap-2">
        {/*label*/}
        <p className="text-sm">{Props.label}</p>
          {/*icon*/}
          <Props.icon className="h-4 w-4 text-gray-400" />
    </section>
    <section className="flex flex-col gap-1">
        <h2 className="text-1xl font-semibold">{Props.project}</h2>
        <p className="text-xs text-gray-500">{Props.members}</p>
        <section className="grid grid-cols-1 gap-4">
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>pp</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>pp</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>pp</AvatarFallback>
    </Avatar>
        </section>
       
    </section>
    
 </CardContent>
}


export function CardContent(props:React.HTMLAttributes<HTMLDivElement>){
    return (
    <div
    {...props}
    
    className= {cn("flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
    props.className)}/>
    );
}