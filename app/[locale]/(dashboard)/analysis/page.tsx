"use client"
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { useDashboard } from '@/hooks/analysis/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  orders: {
    current: number;
    previous: number;
    change: number;
  };
  customers: {
    current: number;
    previous: number;
    change: number;
  };
  products: {
    current: number;
    previous: number;
    change: number;
  };
}

const mockAnalyticsData: AnalyticsData = {
  revenue: {
    current: 45230,
    previous: 38950,
    change: 16.1
  },
  orders: {
    current: 1234,
    previous: 1089,
    change: 13.3
  },
  customers: {
    current: 892,
    previous: 756,
    change: 18.0
  },
  products: {
    current: 156,
    previous: 142,
    change: 9.9
  }
};

const salesData = [
  { month: 'Jan', sales: 12000, orders: 145 },
  { month: 'Feb', sales: 15000, orders: 178 },
  { month: 'Mar', sales: 18000, orders: 203 },
  { month: 'Apr', sales: 22000, orders: 234 },
  { month: 'May', sales: 25000, orders: 267 },
  { month: 'Jun', sales: 28000, orders: 289 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1234, revenue: 24680 },
  { name: 'Smart Watch', sales: 987, revenue: 19740 },
  { name: 'Laptop Stand', sales: 756, revenue: 15120 },
  { name: 'Bluetooth Speaker', sales: 654, revenue: 13080 },
  { name: 'Phone Case', sales: 543, revenue: 10860 },
];

export default function AnalysisPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation(locale, 'common');
  const { data: dashboardData, isLoading, error } = useDashboard();
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>(mockAnalyticsData);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const MetricCard = ({ 
    title, 
    current, 
    previous, 
    change, 
    icon: Icon, 
    color 
  }: {
    title: string;
    current: number;
    previous: number;
    change: number;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {title.includes('Revenue') ? `$${current.toLocaleString()}` : current.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          current={analyticsData.revenue.current}
          previous={analyticsData.revenue.previous}
          change={analyticsData.revenue.change}
          icon={DollarSign}
          color="bg-green-600"
        />
        <MetricCard
          title="Total Orders"
          current={analyticsData.orders.current}
          previous={analyticsData.orders.previous}
          change={analyticsData.orders.change}
          icon={ShoppingCart}
          color="bg-blue-600"
        />
        <MetricCard
          title="Total Customers"
          current={analyticsData.customers.current}
          previous={analyticsData.customers.previous}
          change={analyticsData.customers.change}
          icon={Users}
          color="bg-purple-600"
        />
        <MetricCard
          title="Total Products"
          current={analyticsData.products.current}
          previous={analyticsData.products.previous}
          change={analyticsData.products.change}
          icon={Package}
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.sales / 30000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${item.sales.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{item.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${product.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Customers</span>
                <Badge className="bg-green-100 text-green-800">+23%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Returning Customers</span>
                <Badge className="bg-blue-100 text-blue-800">67%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Retention</span>
                <Badge className="bg-purple-100 text-purple-800">89%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Order Value</span>
                <span className="font-medium">$127.50</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Order Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed Orders</span>
                <Badge className="bg-green-100 text-green-800">1,156</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Orders</span>
                <Badge className="bg-yellow-100 text-yellow-800">78</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cancelled Orders</span>
                <Badge className="bg-red-100 text-red-800">23</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Fulfillment Rate</span>
                <span className="font-medium">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Products</span>
                <Badge className="bg-blue-100 text-blue-800">{analyticsData.products.current}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low Stock Items</span>
                <Badge className="bg-red-100 text-red-800">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Out of Stock</span>
                <Badge className="bg-red-100 text-red-800">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Best Performing Category</span>
                <span className="font-medium">Electronics</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Data from API */}
      {dashboardData && (
        <Card>
          <CardHeader>
            <CardTitle>API Dashboard Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="p-6">
            <div className="text-red-600">
              Error loading dashboard data: {error.message}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
