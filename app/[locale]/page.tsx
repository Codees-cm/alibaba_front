// import React from 'react'
import {redirect} from 'next/navigation';
import {languages} from "@/app/i18n/settings";

export async function generateStaticParams() {
    return languages.map((locale) => ({ locale }))
}
export default function page() {
    redirect('sales')
}
