"use client"
import React, { useState } from 'react';
import { useProducts } from '@/hooks/stock_manage/use-product';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Star,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import ProductViewModal from './ProductViewModal';
import ProductEditModal from './ProductEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const { addNotification } = useNotifications();
  
  // Use the existing products hook
  const { 
    products, 
    allLoading, 
    allFetchError, 
    isAddingProduct, 
    isEditingProduct, 
    isDeletingProduct,
    addProduct,
    editProduct,
    deleteProduct,
    refetch
  } = useProducts();

  // Loading state
  if (allLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (allFetchError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
          <p className="text-red-600 mb-4">{allFetchError.message}</p>
          <button 
            onClick={() => refetch()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use API data if available, otherwise fallback to mock data
  const productList = products || [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      status: 'Active',
      sales: 1234,
      rating: 4.8,
      image: '/api/placeholder/80/80',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Premium Smartphone Case',
      category: 'Accessories',
      price: 29.99,
      stock: 156,
      status: 'Active',
      sales: 856,
      rating: 4.6,
      image: '/api/placeholder/80/80',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Ergonomic Laptop Stand',
      category: 'Office',
      price: 89.99,
      stock: 23,
      status: 'Low Stock',
      sales: 642,
      rating: 4.9,
      image: '/api/placeholder/80/80',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      category: 'Electronics',
      price: 149.99,
      stock: 0,
      status: 'Out of Stock',
      sales: 534,
      rating: 4.7,
      image: '/api/placeholder/80/80',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      category: 'Electronics',
      price: 39.99,
      stock: 78,
      status: 'Active',
      sales: 423,
      rating: 4.5,
      image: '/api/placeholder/80/80',
      trend: 'up'
    }
  ];

  const categories = ['all', 'Electronics', 'Accessories', 'Office', 'Home', 'Sports'];
  const statuses = ['all', 'Active', 'Low Stock', 'Out of Stock', 'Inactive'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProduct = () => {
    addNotification({
      title: 'Product Added',
      message: 'New product has been successfully added to your inventory',
      type: 'success'
    });
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: any) => {
    try {
      // Use the editProduct hook function if available
      if (editProduct) {
        await editProduct(updatedProduct);
      }
      
      addNotification({
        title: 'Product Updated',
        message: `${updatedProduct.name} has been successfully updated`,
        type: 'success'
      });
      
      setEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      addNotification({
        title: 'Update Failed',
        message: 'Failed to update product. Please try again.',
        type: 'error'
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      // Use the deleteProduct hook function if available
      if (deleteProduct) {
        await deleteProduct(selectedProduct.id);
      }
      
      addNotification({
        title: 'Product Deleted',
        message: `${selectedProduct.name} has been removed from your inventory`,
        type: 'info'
      });
      
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      addNotification({
        title: 'Delete Failed',
        message: 'Failed to delete product. Please try again.',
        type: 'error'
      });
    }
  };

  const closeModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory and catalog</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {products.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {products.filter(p => p.status === 'Low Stock').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {products.filter(p => p.status === 'Out of Stock').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Stock</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Sales</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Rating</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{product.category}</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">${product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">{product.sales}</span>
                      {product.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{product.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewProduct(product)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
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
              Showing {filteredProducts.length} of {products.length} products
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
      {selectedProduct && (
        <>
          <ProductViewModal
            product={selectedProduct}
            isOpen={viewModalOpen}
            onClose={closeModals}
          />
          
          <ProductEditModal
            product={selectedProduct}
            isOpen={editModalOpen}
            onClose={closeModals}
            onSave={handleSaveProduct}
            isLoading={isEditingProduct}
          />
          
          <DeleteConfirmModal
            isOpen={deleteModalOpen}
            onClose={closeModals}
            onConfirm={handleConfirmDelete}
            title="Delete Product"
            message="Are you sure you want to delete this product?"
            itemName={selectedProduct.name}
            isLoading={isDeletingProduct}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
