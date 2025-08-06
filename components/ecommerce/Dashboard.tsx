"use client"
import React, { useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Star
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

const Dashboard: React.FC = () => {
  const { addNotification } = useNotifications();

  // Demo: Add some sample notifications on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: 'New Order Received',
        message: 'Order #12345 has been placed by John Doe',
        type: 'success'
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      addNotification({
        title: 'Low Stock Alert',
        message: 'Product "Wireless Headphones" is running low on stock',
        type: 'warning'
      });
    }, 4000);

    const timer3 = setTimeout(() => {
      addNotification({
        title: 'Payment Received',
        message: 'Payment of $299.99 has been confirmed for Order #12344',
        type: 'info'
      });
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [addNotification]);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '2,350',
      change: '+180.1%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Products',
      value: '1,234',
      change: '+19%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Customers',
      value: '573',
      change: '+201',
      changeType: 'positive',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const recentOrders = [
    {
      id: '#12345',
      customer: 'John Doe',
      product: 'Wireless Headphones',
      amount: '$299.99',
      status: 'Completed',
      date: '2 hours ago'
    },
    {
      id: '#12344',
      customer: 'Jane Smith',
      product: 'Smartphone Case',
      amount: '$29.99',
      status: 'Processing',
      date: '4 hours ago'
    },
    {
      id: '#12343',
      customer: 'Mike Johnson',
      product: 'Laptop Stand',
      amount: '$89.99',
      status: 'Shipped',
      date: '6 hours ago'
    },
    {
      id: '#12342',
      customer: 'Sarah Wilson',
      product: 'Bluetooth Speaker',
      amount: '$149.99',
      status: 'Pending',
      date: '8 hours ago'
    }
  ];

  const topProducts = [
    {
      name: 'Wireless Headphones',
      sales: 1234,
      revenue: '$369,960',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Smartphone Case',
      sales: 856,
      revenue: '$25,680',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Laptop Stand',
      sales: 642,
      revenue: '$57,780',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Bluetooth Speaker',
      sales: 534,
      revenue: '$80,100',
      image: '/api/placeholder/60/60'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Reports
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer} • {order.product}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{product.revenue}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.{9 - index}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Orders</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Customers</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
