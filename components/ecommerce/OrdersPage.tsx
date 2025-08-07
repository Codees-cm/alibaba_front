"use client"
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Download
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import OrderViewModal from './OrderViewModal';
import OrderStatusModal from './OrderStatusModal';

const OrdersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const { addNotification } = useNotifications();

  const orders = [
    {
      id: '#12345',
      customer: 'John Doe',
      email: 'john.doe@email.com',
      products: 3,
      total: 299.99,
      status: 'Completed',
      date: '2024-08-06',
      time: '10:30 AM',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: '#12344',
      customer: 'Jane Smith',
      email: 'jane.smith@email.com',
      products: 1,
      total: 29.99,
      status: 'Processing',
      date: '2024-08-06',
      time: '09:15 AM',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: '#12343',
      customer: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      products: 2,
      total: 189.98,
      status: 'Shipped',
      date: '2024-08-05',
      time: '03:45 PM',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine St, Chicago, IL 60601'
    },
    {
      id: '#12342',
      customer: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      products: 1,
      total: 149.99,
      status: 'Pending',
      date: '2024-08-05',
      time: '11:20 AM',
      paymentMethod: 'Bank Transfer',
      shippingAddress: '321 Elm St, Houston, TX 77001'
    },
    {
      id: '#12341',
      customer: 'David Brown',
      email: 'david.brown@email.com',
      products: 4,
      total: 459.96,
      status: 'Cancelled',
      date: '2024-08-04',
      time: '02:10 PM',
      paymentMethod: 'Credit Card',
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
    }
  ];

  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Processing':
        return <Package className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setStatusModalOpen(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string, note?: string) => {
    // Here you would typically make an API call to update the order status
    addNotification({
      title: 'Order Status Updated',
      message: `Order ${orderId} status has been changed to ${newStatus}`,
      type: 'success'
    });
    
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const closeModals = () => {
    setViewModalOpen(false);
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const orderStats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Orders',
      value: orders.filter(o => o.status === 'Pending').length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Processing',
      value: orders.filter(o => o.status === 'Processing').length,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Completed',
      value: orders.filter(o => o.status === 'Completed').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orderStats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>

            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Products</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-blue-600">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.time}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{order.products} items</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">${order.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{order.date}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Order Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                      >
                        Update Status
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedOrder && (
        <>
          <OrderViewModal
            order={selectedOrder}
            isOpen={viewModalOpen}
            onClose={closeModals}
          />
          
          <OrderStatusModal
            order={selectedOrder}
            isOpen={statusModalOpen}
            onClose={closeModals}
            onUpdateStatus={handleStatusUpdate}
          />
        </>
      )}
    </div>
  );
};

export default OrdersPage;
