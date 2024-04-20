"use client"

import { useTranslation } from "@/app/i18n"
import DashboardBase from "./DashboardBase"
export const Dashboard = ({ lng }) => {
  const { t } =  useTranslation(lng, 'footer')
  console.log(t)
  return <DashboardBase t={t} lng={lng} />
}