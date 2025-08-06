"use client"
import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import Warehouse from '@/components/Warehouse';

export default function WarehousePage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation(locale, 'common');

  return (
    <div className="min-h-screen">
      <Warehouse lang={locale} />
    </div>
  );
}
