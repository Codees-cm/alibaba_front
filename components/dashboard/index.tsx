// import { useTranslation } from '../../../i18n'
import { useTranslation } from "@/app/i18n"
// import { FooterBase } from './FooterBase'
import DashboardBase from "./DashboardBase"
export const Dashboard = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return <DashboardBase t={t} lng={lng} />
}