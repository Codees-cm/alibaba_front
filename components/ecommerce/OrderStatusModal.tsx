"use client"
import React, { useState } from 'react';
import { X, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  status: string;
}

interface OrderStatusModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: string, note?: string) => void;
  isLoading?: boolean;
}

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  isLoading = false
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');
  const [note, setNote] = useState('');

  if (!isOpen || !order) return null;

  const statuses = [
    { value: 'Pending', label: 'Pending', icon: Clock, color: 'text-yellow-600' },
    { value: 'Processing', label: 'Processing', icon: Package, color: 'text-blue-600' },
    { value: 'Shipped', label: 'Shipped', icon: Truck, color: 'text-purple-600' },
    { value: 'Completed', label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
    { value: 'Cancelled', label: 'Cancelled', icon: XCircle, color: 'text-red-600' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(order.id, selectedStatus, note);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Update Order Status</h2>
            <p className="text-gray-600 mt-1">Order {order.id} - {order.customer}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status
            </label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-medium">{order.status}</span>
            </div>
          </div>

          {/* New Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              New Status
            </label>
            <div className="space-y-2">
              {statuses.map((status) => {
                const IconComponent = status.icon;
                return (
                  <label
                    key={status.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedStatus === status.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={selectedStatus === status.value}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="sr-only"
                      disabled={isLoading}
                    />
                    <IconComponent className={`h-5 w-5 mr-3 ${status.color}`} />
                    <span className="font-medium text-gray-900">{status.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a note about this status change..."
              disabled={isLoading}
            />
          </div>

          {/* Status Change Info */}
          {selectedStatus !== order.status && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Status will change from:</strong> {order.status} → {selectedStatus}
              </p>
              {selectedStatus === 'Shipped' && (
                <p className="text-sm text-blue-700 mt-1">
                  Customer will receive a shipping notification email.
                </p>
              )}
              {selectedStatus === 'Completed' && (
                <p className="text-sm text-blue-700 mt-1">
                  Customer will receive an order completion email.
                </p>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || selectedStatus === order.status}
            >
              {isLoading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderStatusModal;
