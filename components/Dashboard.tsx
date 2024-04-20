'use client'





export default  function Dashboard() {
  const { t } =  useTranslation(locale)

  console.log(t('title'))
  console.log(data)
  


 
}


// import React from 'react'
// import { Dashboard } from '@/components/dashboard/client'
// export default async function page({ params: { locale } }) {
//   return (
//    <>
//    <Dashboard lng={locale}/>
//    </>
//   )
// }
