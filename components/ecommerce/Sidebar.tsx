"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Tag,
  Truck,
  CreditCard,
  Star,
  MessageSquare,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, locale }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: `/${locale}/dashboard`,
    },
    {
      title: 'Products',
      icon: Package,
      href: `/${locale}/products`,
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      href: `/${locale}/orders`,
    },
    {
      title: 'Customers',
      icon: Users,
      href: `/${locale}/customers`,
    },
    {
      title: 'Payments',
      icon: CreditCard,
      href: `/${locale}/payments`,
    },
    {
      title: 'Reviews',
      icon: Star,
      href: `/${locale}/reviews`,
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      href: `/${locale}/messages`,
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: `/${locale}/analysis`,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: `/${locale}/settings`,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Tondo</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 md:mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
                
                {/* Submenu */}
                {item.submenu && isActive(item.href) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                          pathname === subItem.href
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          if (window.innerWidth < 768) onClose();
                        }}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Tondo Ecommerce v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
