"use client"
import { useEffect, useState } from 'react';
import instance from '@/utils/api';
import { useTranslation } from '@/app/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/contexts/NotificationContext';
import CustomerViewModal from '@/components/ecommerce/CustomerViewModal';
import CustomerEditModal from '@/components/ecommerce/CustomerEditModal';
import CustomerAddModal from '@/components/ecommerce/CustomerAddModal';
import DeleteConfirmModal from '@/components/ecommerce/DeleteConfirmModal';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  joinDate: string;
  lastOrder: string;
}

// Loaded from API
const mockCustomers: Customer[] = [];

export default function CustomersPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation(locale, 'common');
  const { addNotification } = useNotifications();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get('/users_with_role_user/');
        const apiUsers = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
        const mapped: Customer[] = apiUsers.map((u: any) => ({
          id: String(u.id),
          name: `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.email,
          email: u.email,
          phone: u.phone_number ?? '',
          address: '',
          totalOrders: u.total_orders ?? 0,
          totalSpent: u.total_spent ?? 0,
          status: u.is_active ? 'active' : 'inactive',
          joinDate: (u.date_joined ?? '').slice(0, 10),
          lastOrder: (u.last_login ?? '').slice(0, 10),
        }));
        setCustomers(mapped);
      } catch (e) {
        // keep empty state, optionally show toast via notifications elsewhere
      }
    };
    fetchUsers();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // CRUD handlers
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleAddCustomer = async (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'lastOrder'>) => {
    setIsLoading(true);
    try {
      const payload = {
        first_name: newCustomerData.name.split(' ')[0] ?? newCustomerData.name,
        last_name: newCustomerData.name.split(' ').slice(1).join(' '),
        email: newCustomerData.email,
        phone_number: newCustomerData.phone,
        password: 'TempPass123!'
      };
      const res = await instance.post('/create-employee/', payload);
      const u = res.data;
      const newCustomer: Customer = {
        id: String(u.id),
        name: `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.email,
        email: u.email,
        phone: u.phone_number ?? '',
        address: '',
        totalOrders: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastOrder: ''
      };
      setCustomers(prev => [...prev, newCustomer]);
      setAddModalOpen(false);
      addNotification({ title: 'Customer Added', message: `${newCustomer.name} has been successfully added`, type: 'success' });
    } catch (e: any) {
      addNotification({ title: 'Create Failed', message: e?.message ?? 'Failed to add customer', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCustomer = async (updatedCustomer: Customer) => {
    setIsLoading(true);
    try {
      const payload = {
        first_name: updatedCustomer.name.split(' ')[0] ?? updatedCustomer.name,
        last_name: updatedCustomer.name.split(' ').slice(1).join(' '),
        phone_number: updatedCustomer.phone,
        is_active: updatedCustomer.status !== 'blocked',
      };
      await instance.put(`/users/${updatedCustomer.id}/update/`, payload);
      setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
      setEditModalOpen(false);
      setSelectedCustomer(null);
      addNotification({ title: 'Customer Updated', message: `${updatedCustomer.name} has been successfully updated`, type: 'success' });
    } catch (e: any) {
      addNotification({ title: 'Update Failed', message: e?.message ?? 'Failed to update customer', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;
    setIsLoading(true);
    try {
      await instance.delete(`/users/${selectedCustomer.id}/delete/`);
      setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
      setDeleteModalOpen(false);
      setSelectedCustomer(null);
      addNotification({ title: 'Customer Deleted', message: `${selectedCustomer.name} has been removed`, type: 'info' });
    } catch (e: any) {
      addNotification({ title: 'Delete Failed', message: e?.message ?? 'Failed to delete customer', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setAddModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer base</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Badge className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                     customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {customer.address}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{customer.totalOrders}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">${customer.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(customer.status)} capitalize`}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">{customer.lastOrder}</div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCustomer(customer)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CustomerAddModal
        isOpen={addModalOpen}
        onClose={closeModals}
        onAdd={handleAddCustomer}
        isLoading={isLoading}
      />

      {selectedCustomer && (
        <>
          <CustomerViewModal
            customer={selectedCustomer}
            isOpen={viewModalOpen}
            onClose={closeModals}
          />
          
          <CustomerEditModal
            customer={selectedCustomer}
            isOpen={editModalOpen}
            onClose={closeModals}
            onSave={handleSaveCustomer}
            isLoading={isLoading}
          />
          
          <DeleteConfirmModal
            isOpen={deleteModalOpen}
            onClose={closeModals}
            onConfirm={handleConfirmDelete}
            title="Delete Customer"
            message="Are you sure you want to delete this customer?"
            itemName={selectedCustomer.name}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
