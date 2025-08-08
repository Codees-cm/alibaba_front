# 🔧 Larcraft Admin Platform API Documentation

## 🌐 Base URL
```
http://localhost:8000/api
```

## 🔐 Authentication
All admin endpoints require JWT authentication with admin or employee role:
```
Authorization: Bearer <admin_jwt_token>
```

## 👥 Required Roles
- **Admin**: Full access to all endpoints
- **Employee**: Limited access to specific endpoints (marked where applicable)

## 📋 Table of Contents
1. [Admin Authentication](#admin-authentication)
2. [User Management](#user-management)
3. [Product Management](#product-management)
4. [Category Management](#category-management)
5. [Order Management](#order-management)
6. [Inventory Management](#inventory-management)
7. [Sales & Analytics](#sales--analytics)
8. [Review Management](#review-management)
9. [Promo Code Management](#promo-code-management)
10. [Transaction Management](#transaction-management)
11. [Dashboard Analytics](#dashboard-analytics)
12. [System Management](#system-management)

---

## 🔐 Admin Authentication

### 1. Admin Login
**Endpoint:** `POST /jwt/create/`  
**Authentication:** None required  
**Description:** Login admin/employee user

**Request Body:**
```json
{
  "email": "admin@larcraft.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### 2. Get Current Admin User
**Endpoint:** `GET /users/me/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get current admin user details

**Response (200):**
```json
{
  "id": 1,
  "first_name": "Admin",
  "last_name": "User",
  "email": "admin@larcraft.com",
  "role": "admin",
  "phone_number": "+1234567890",
  "is_active": true,
  "is_staff": true,
  "is_superuser": true
}
```

---
## 👥 User Management

### 1. Get All Users
**Endpoint:** `GET /users_with_role_user/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all users with 'user' role

**Response (200):**
```json
[
  {
    "id": 2,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "phone_number": "+1234567890",
    "is_active": true,
    "date_joined": "2024-01-01T12:00:00Z",
    "last_login": "2024-01-15T10:30:00Z"
  }
]
```

### 2. Get All Employees
**Endpoint:** `GET /users_with_role_employee/`  
**Authentication:** Required (Admin only)  
**Description:** Get all users with 'employee' role

**Response (200):**
```json
[
  {
    "id": 3,
    "first_name": "Employee",
    "last_name": "User",
    "email": "employee@larcraft.com",
    "role": "employee",
    "phone_number": "+1234567890",
    "is_active": true,
    "date_joined": "2024-01-01T12:00:00Z",
    "last_login": "2024-01-15T10:30:00Z"
  }
]
```

### 3. Create Employee Account
**Endpoint:** `POST /create-employee/`  
**Authentication:** Required (Admin only)  
**Description:** Create a new employee account

**Request Body:**
```json
{
  "first_name": "New",
  "last_name": "Employee",
  "email": "newemployee@larcraft.com",
  "password": "employee123",
  "phone_number": "+1234567890"
}
```

**Response (201):**
```json
{
  "id": 4,
  "first_name": "New",
  "last_name": "Employee",
  "email": "newemployee@larcraft.com",
  "role": "employee",
  "phone_number": "+1234567890",
  "is_active": true
}
```

### 4. Update User Account
**Endpoint:** `PUT /users/{user_id}/update/`  
**Authentication:** Required (Admin only)  
**Description:** Update any user account

**Path Parameters:**
- `user_id`: User ID to update

**Request Body:**
```json
{
  "first_name": "Updated",
  "last_name": "Name",
  "phone_number": "+9876543210",
  "is_active": true
}
```

**Response (200):**
```json
{
  "id": 2,
  "first_name": "Updated",
  "last_name": "Name",
  "email": "john.doe@example.com",
  "role": "user",
  "phone_number": "+9876543210",
  "is_active": true
}
```

### 5. Delete User Account
**Endpoint:** `DELETE /users/{user_id}/delete/`  
**Authentication:** Required (Admin only)  
**Description:** Delete a user account

**Path Parameters:**
- `user_id`: User ID to delete

**Response (204):**
```json
{}
```

### 6. Get User Role Distribution
**Endpoint:** `GET /user_role_distribution/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get statistics of users by role

**Response (200):**
```json
{
  "admin": 1,
  "employee": 2,
  "user": 50,
  "total": 53
}
```

### 7. Search Users
**Endpoint:** `GET /dashboard_search/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Search users by name or email

**Query Parameters:**
- `q`: Search query

**Response (200):**
```json
{
  "users": [
    {
      "id": 2,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  ]
}
```

---
## 🛍️ Product Management

### 1. Get All Products (Admin View)
**Endpoint:** `GET /products/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all products with admin-specific fields

**Query Parameters:**
- `page` (optional): Page number
- `page_size` (optional): Items per page

**Response (200):**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": "1",
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone with advanced features",
      "price": 999.99,
      "originalPrice": 1099.99,
      "imageUrl": "https://example.com/iphone15.jpg",
      "images": ["https://example.com/iphone15-1.jpg"],
      "rating": 4.5,
      "reviewCount": 10,
      "quantity": 50,
      "category": "Electronics",
      "tags": ["smartphone", "apple", "premium"],
      "isInStock": true,
      "stockQuantity": 50,
      "brand": "Apple",
      "specifications": {
        "screen_size": "6.1 inches",
        "storage": "128GB"
      },
      "product_code": "IP15P001",
      "available": true,
      "created": "2024-01-01T12:00:00Z",
      "updated": "2024-01-15T10:30:00Z",
      "warehouses": [
        {
          "id": 1,
          "name": "Main Warehouse",
          "quantity": 30
        },
        {
          "id": 2,
          "name": "Secondary Warehouse",
          "quantity": 20
        }
      ],
      "promo_codes": [
        {
          "code": "SAVE20",
          "discount": 20.00
        }
      ]
    }
  ]
}
```

### 2. Create New Product
**Endpoint:** `POST /products/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Create a new product

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 299.99,
  "original_price": 349.99,
  "image_url": "https://example.com/product.jpg",
  "images": ["https://example.com/product-1.jpg"],
  "quantity": 100,
  "category": 1,
  "tags": ["new", "featured"],
  "brand": "Brand Name",
  "specifications": {
    "color": "Black",
    "size": "Medium"
  },
  "product_code": "NP001",
  "available": true
}
```

**Response (201):**
```json
{
  "id": "6",
  "name": "New Product",
  "description": "Product description",
  "price": 299.99,
  "originalPrice": 349.99,
  "imageUrl": "https://example.com/product.jpg",
  "images": ["https://example.com/product-1.jpg"],
  "rating": 0.0,
  "reviewCount": 0,
  "quantity": 100,
  "category": "Electronics",
  "tags": ["new", "featured"],
  "isInStock": true,
  "stockQuantity": 100,
  "brand": "Brand Name",
  "specifications": {
    "color": "Black",
    "size": "Medium"
  },
  "product_code": "NP001",
  "available": true,
  "created": "2024-01-16T12:00:00Z",
  "updated": "2024-01-16T12:00:00Z"
}
```

### 3. Update Product
**Endpoint:** `PUT /products/{product_id}/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Update an existing product

**Path Parameters:**
- `product_id`: Product ID to update

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 279.99,
  "quantity": 150,
  "available": true
}
```

**Response (200):**
```json
{
  "id": "1",
  "name": "Updated Product Name",
  "description": "Latest iPhone with advanced features",
  "price": 279.99,
  "originalPrice": 1099.99,
  "quantity": 150,
  "available": true,
  "updated": "2024-01-16T14:30:00Z"
}
```

### 4. Delete Product
**Endpoint:** `DELETE /products/{product_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Delete a product

**Path Parameters:**
- `product_id`: Product ID to delete

**Response (204):**
```json
{}
```

### 5. Bulk Update Products
**Endpoint:** `PATCH /products/bulk_update/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Update multiple products at once

**Request Body:**
```json
{
  "products": [
    {
      "id": 1,
      "price": 899.99,
      "quantity": 45
    },
    {
      "id": 2,
      "available": false
    }
  ]
}
```

**Response (200):**
```json
{
  "updated": 2,
  "message": "Products updated successfully"
}
```

### 6. Get Low Stock Products
**Endpoint:** `GET /products/low_stock/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get products with low stock (quantity < 10)

**Response (200):**
```json
[
  {
    "id": "3",
    "name": "Product Name",
    "quantity": 5,
    "stockQuantity": 5,
    "product_code": "PR003",
    "category": "Electronics"
  }
]
```

---
## 📂 Category Management

### 1. Get All Categories (Admin View)
**Endpoint:** `GET /categories/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all categories with product counts

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "model_classes": ["electronics", "gadgets", "devices"],
    "product_count": 25,
    "created": "2024-01-01T12:00:00Z",
    "updated": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Clothing",
    "model_classes": ["clothing", "apparel", "fashion"],
    "product_count": 15,
    "created": "2024-01-01T12:00:00Z",
    "updated": "2024-01-15T10:30:00Z"
  }
]
```

### 2. Create Category
**Endpoint:** `POST /categories/`  
**Authentication:** Required (Admin only)  
**Description:** Create a new category

**Request Body:**
```json
{
  "name": "New Category",
  "model_classes": ["new", "category", "items"]
}
```

**Response (201):**
```json
{
  "id": 6,
  "name": "New Category",
  "model_classes": ["new", "category", "items"],
  "product_count": 0,
  "created": "2024-01-16T12:00:00Z",
  "updated": "2024-01-16T12:00:00Z"
}
```

### 3. Update Category
**Endpoint:** `PUT /categories/{category_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Update a category

**Path Parameters:**
- `category_id`: Category ID to update

**Request Body:**
```json
{
  "name": "Updated Category Name",
  "model_classes": ["updated", "category"]
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Updated Category Name",
  "model_classes": ["updated", "category"],
  "product_count": 25,
  "updated": "2024-01-16T14:30:00Z"
}
```

### 4. Delete Category
**Endpoint:** `DELETE /categories/{category_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Delete a category (only if no products assigned)

**Path Parameters:**
- `category_id`: Category ID to delete

**Response (204):**
```json
{}
```

---

## 🛒 Order Management

### 1. Get All Orders
**Endpoint:** `GET /orders/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all orders with pagination

**Query Parameters:**
- `page` (optional): Page number
- `page_size` (optional): Items per page
- `status` (optional): Filter by order status
- `date_from` (optional): Filter from date (YYYY-MM-DD)
- `date_to` (optional): Filter to date (YYYY-MM-DD)

**Response (200):**
```json
{
  "count": 150,
  "next": "http://localhost:8000/api/orders/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 2,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
      },
      "address": "123 Main Street",
      "city": "New York",
      "paid": true,
      "total_amount": 1149.98,
      "created": "2024-01-15T12:00:00Z",
      "updated": "2024-01-15T12:30:00Z",
      "items": [
        {
          "id": 1,
          "product": {
            "id": 1,
            "name": "iPhone 15 Pro",
            "product_code": "IP15P001"
          },
          "price": "999.99",
          "quantity": 1,
          "subtotal": 999.99
        },
        {
          "id": 2,
          "product": {
            "id": 3,
            "name": "Nike Air Max 270",
            "product_code": "NAM270001"
          },
          "price": "150.00",
          "quantity": 1,
          "subtotal": 150.00
        }
      ]
    }
  ]
}
```

### 2. Get Order Details
**Endpoint:** `GET /orders/{order_id}/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get detailed information for a specific order

**Path Parameters:**
- `order_id`: Order ID

**Response (200):**
```json
{
  "id": 1,
  "user": {
    "id": 2,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890"
  },
  "address": "123 Main Street",
  "city": "New York",
  "paid": true,
  "total_amount": 1149.98,
  "created": "2024-01-15T12:00:00Z",
  "updated": "2024-01-15T12:30:00Z",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "iPhone 15 Pro",
        "product_code": "IP15P001",
        "image_url": "https://example.com/iphone15.jpg"
      },
      "price": "999.99",
      "quantity": 1,
      "subtotal": 999.99
    }
  ],
  "payment_history": [
    {
      "id": 1,
      "amount": 1149.98,
      "payment_method": "card",
      "status": "completed",
      "created": "2024-01-15T12:30:00Z"
    }
  ]
}
```

### 3. Update Order Status
**Endpoint:** `PATCH /orders/{order_id}/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Update order status or details

**Path Parameters:**
- `order_id`: Order ID to update

**Request Body:**
```json
{
  "paid": true,
  "status": "shipped",
  "tracking_number": "TRK123456789"
}
```

**Response (200):**
```json
{
  "id": 1,
  "paid": true,
  "status": "shipped",
  "tracking_number": "TRK123456789",
  "updated": "2024-01-16T10:00:00Z"
}
```

### 4. Cancel Order
**Endpoint:** `DELETE /orders/{order_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Cancel/delete an order

**Path Parameters:**
- `order_id`: Order ID to cancel

**Response (204):**
```json
{}
```

### 5. Get Orders by Date Range
**Endpoint:** `GET /orders/date_range/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get orders within a specific date range

**Query Parameters:**
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)

**Response (200):**
```json
{
  "orders": [
    {
      "id": 1,
      "user": "John Doe",
      "total_amount": 1149.98,
      "created": "2024-01-15T12:00:00Z",
      "paid": true
    }
  ],
  "total_orders": 25,
  "total_revenue": 28749.50
}
```

---
## 📊 Sales & Analytics

### 1. Monthly Sales Data
**Endpoint:** `GET /analysis/monthly-sales-data/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get monthly sales statistics

**Response (200):**
```json
{
  "current_month": {
    "month": "January 2024",
    "total_sales": 45000.00,
    "total_orders": 150,
    "average_order_value": 300.00
  },
  "previous_month": {
    "month": "December 2023",
    "total_sales": 38000.00,
    "total_orders": 120,
    "average_order_value": 316.67
  },
  "growth_percentage": 18.42
}
```

### 2. Weekly Sales Total
**Endpoint:** `GET /analysis/weekly-total/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get weekly sales totals

**Response (200):**
```json
{
  "current_week": {
    "week": "Week 3, 2024",
    "total_sales": 12000.00,
    "total_orders": 40
  },
  "previous_week": {
    "week": "Week 2, 2024",
    "total_sales": 10500.00,
    "total_orders": 35
  },
  "growth_percentage": 14.29
}
```

### 3. Daily Sales Total
**Endpoint:** `GET /analysis/daily-total/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get daily sales totals

**Response (200):**
```json
{
  "today": {
    "date": "2024-01-16",
    "total_sales": 2500.00,
    "total_orders": 8
  },
  "yesterday": {
    "date": "2024-01-15",
    "total_sales": 3200.00,
    "total_orders": 12
  },
  "growth_percentage": -21.88
}
```

### 4. Profit Analysis
**Endpoint:** `GET /analysis/gross-profit/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get gross profit analysis

**Response (200):**
```json
{
  "gross_profit": 25000.00,
  "total_revenue": 45000.00,
  "total_cost": 20000.00,
  "profit_margin": 55.56,
  "period": "Current Month"
}
```

### 5. Net Profit Analysis
**Endpoint:** `GET /analysis/net-profit/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get net profit analysis

**Response (200):**
```json
{
  "net_profit": 18000.00,
  "gross_profit": 25000.00,
  "total_expenses": 7000.00,
  "net_profit_margin": 40.00,
  "period": "Current Month"
}
```

### 6. Operating Profit
**Endpoint:** `GET /analysis/operating-profit/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get operating profit analysis

**Response (200):**
```json
{
  "operating_profit": 20000.00,
  "gross_profit": 25000.00,
  "operating_expenses": 5000.00,
  "operating_margin": 44.44,
  "period": "Current Month"
}
```

### 7. Total Revenue
**Endpoint:** `GET /analysis/total-revenue/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get total revenue statistics

**Response (200):**
```json
{
  "total_revenue": 45000.00,
  "period": "Current Month",
  "breakdown": {
    "product_sales": 42000.00,
    "shipping_fees": 2000.00,
    "other": 1000.00
  }
}
```

### 8. Total Expenses
**Endpoint:** `GET /analysis/total-expenses/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get total expenses breakdown

**Response (200):**
```json
{
  "total_expenses": 7000.00,
  "period": "Current Month",
  "breakdown": {
    "inventory": 3000.00,
    "marketing": 1500.00,
    "operations": 1200.00,
    "utilities": 800.00,
    "other": 500.00
  }
}
```

### 9. Product Sales Data
**Endpoint:** `GET /api/product-sales-data/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get product-wise sales data

**Response (200):**
```json
[
  {
    "product_id": 1,
    "product_name": "iPhone 15 Pro",
    "total_sold": 25,
    "total_revenue": 24999.75,
    "average_price": 999.99
  },
  {
    "product_id": 2,
    "product_name": "Samsung Galaxy S24",
    "total_sold": 18,
    "total_revenue": 16199.82,
    "average_price": 899.99
  }
]
```

### 10. Sales Date Data
**Endpoint:** `GET /api/sales-date-data/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get sales data by date

**Query Parameters:**
- `start_date` (optional): Start date (YYYY-MM-DD)
- `end_date` (optional): End date (YYYY-MM-DD)

**Response (200):**
```json
[
  {
    "date": "2024-01-15",
    "total_sales": 3200.00,
    "total_orders": 12,
    "unique_customers": 10
  },
  {
    "date": "2024-01-16",
    "total_sales": 2500.00,
    "total_orders": 8,
    "unique_customers": 7
  }
]
```

### 11. Income Statement
**Endpoint:** `GET /income-statement/`  
**Authentication:** Required (Admin only)  
**Description:** Get comprehensive income statement

**Response (200):**
```json
{
  "period": "January 2024",
  "revenue": {
    "product_sales": 42000.00,
    "shipping_revenue": 2000.00,
    "other_revenue": 1000.00,
    "total_revenue": 45000.00
  },
  "cost_of_goods_sold": 20000.00,
  "gross_profit": 25000.00,
  "operating_expenses": {
    "marketing": 1500.00,
    "operations": 1200.00,
    "utilities": 800.00,
    "other": 500.00,
    "total_operating_expenses": 4000.00
  },
  "operating_profit": 21000.00,
  "other_expenses": 1000.00,
  "net_profit": 20000.00,
  "profit_margins": {
    "gross_margin": 55.56,
    "operating_margin": 46.67,
    "net_margin": 44.44
  }
}
```

---
## ⭐ Review Management

### 1. Get All Reviews
**Endpoint:** `GET /reviews/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all product reviews with moderation options

**Query Parameters:**
- `page` (optional): Page number
- `page_size` (optional): Items per page
- `product_id` (optional): Filter by product
- `rating` (optional): Filter by rating (1-5)

**Response (200):**
```json
{
  "count": 200,
  "next": "http://localhost:8000/api/reviews/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "iPhone 15 Pro",
        "product_code": "IP15P001"
      },
      "user": {
        "id": 2,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
      },
      "user_name": "John Doe",
      "comment": "Amazing phone! The camera quality is outstanding.",
      "rating": 5,
      "created": "2024-01-15T12:00:00Z",
      "is_approved": true,
      "is_flagged": false
    }
  ]
}
```

### 2. Moderate Review
**Endpoint:** `PATCH /reviews/{review_id}/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Approve, reject, or flag a review

**Path Parameters:**
- `review_id`: Review ID to moderate

**Request Body:**
```json
{
  "is_approved": true,
  "is_flagged": false,
  "moderation_note": "Review approved"
}
```

**Response (200):**
```json
{
  "id": 1,
  "is_approved": true,
  "is_flagged": false,
  "moderation_note": "Review approved",
  "moderated_by": "admin@larcraft.com",
  "moderated_at": "2024-01-16T10:00:00Z"
}
```

### 3. Delete Review
**Endpoint:** `DELETE /reviews/{review_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Delete a review

**Path Parameters:**
- `review_id`: Review ID to delete

**Response (204):**
```json
{}
```

### 4. Get Flagged Reviews
**Endpoint:** `GET /reviews/flagged/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all flagged reviews requiring attention

**Response (200):**
```json
[
  {
    "id": 5,
    "product": {
      "id": 2,
      "name": "Samsung Galaxy S24"
    },
    "user_name": "Anonymous User",
    "comment": "Inappropriate content here...",
    "rating": 1,
    "created": "2024-01-15T15:30:00Z",
    "is_flagged": true,
    "flag_reason": "Inappropriate content"
  }
]
```

---

## 🎟️ Promo Code Management

### 1. Get All Promo Codes
**Endpoint:** `GET /promo-codes/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all promo codes

**Response (200):**
```json
[
  {
    "id": 1,
    "code": "SAVE20",
    "discount": 20.00,
    "product": {
      "id": 1,
      "name": "iPhone 15 Pro"
    },
    "max_usage": 100,
    "current_usage": 25,
    "active": true,
    "created_by": "admin@larcraft.com",
    "created": "2024-01-01T12:00:00Z",
    "expires_at": "2024-12-31T23:59:59Z"
  },
  {
    "id": 2,
    "code": "WELCOME10",
    "discount": 10.00,
    "product": null,
    "max_usage": 1000,
    "current_usage": 150,
    "active": true,
    "created_by": "admin@larcraft.com",
    "created": "2024-01-01T12:00:00Z",
    "expires_at": null
  }
]
```

### 2. Create Promo Code
**Endpoint:** `POST /promo-codes/`  
**Authentication:** Required (Admin only)  
**Description:** Create a new promo code

**Request Body:**
```json
{
  "code": "NEWCODE30",
  "discount": 30.00,
  "product": 1,
  "max_usage": 50,
  "active": true,
  "expires_at": "2024-06-30T23:59:59Z"
}
```

**Response (201):**
```json
{
  "id": 3,
  "code": "NEWCODE30",
  "discount": 30.00,
  "product": {
    "id": 1,
    "name": "iPhone 15 Pro"
  },
  "max_usage": 50,
  "current_usage": 0,
  "active": true,
  "created_by": "admin@larcraft.com",
  "created": "2024-01-16T12:00:00Z",
  "expires_at": "2024-06-30T23:59:59Z"
}
```

### 3. Update Promo Code
**Endpoint:** `PUT /promo-codes/{promo_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Update a promo code

**Path Parameters:**
- `promo_id`: Promo code ID to update

**Request Body:**
```json
{
  "discount": 25.00,
  "max_usage": 75,
  "active": true
}
```

**Response (200):**
```json
{
  "id": 1,
  "code": "SAVE20",
  "discount": 25.00,
  "max_usage": 75,
  "active": true,
  "updated": "2024-01-16T14:30:00Z"
}
```

### 4. Delete Promo Code
**Endpoint:** `DELETE /promo-codes/{promo_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Delete a promo code

**Path Parameters:**
- `promo_id`: Promo code ID to delete

**Response (204):**
```json
{}
```

### 5. Get Promo Code Usage Statistics
**Endpoint:** `GET /promo-codes/{promo_id}/stats/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get usage statistics for a promo code

**Path Parameters:**
- `promo_id`: Promo code ID

**Response (200):**
```json
{
  "code": "SAVE20",
  "total_usage": 25,
  "max_usage": 100,
  "usage_percentage": 25.0,
  "total_discount_given": 500.00,
  "average_order_value": 999.99,
  "usage_by_date": [
    {
      "date": "2024-01-15",
      "usage_count": 5,
      "total_discount": 100.00
    }
  ]
}
```

---

## 💰 Transaction Management

### 1. Get All Transactions
**Endpoint:** `GET /transactions/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all payment transactions

**Query Parameters:**
- `page` (optional): Page number
- `page_size` (optional): Items per page
- `status` (optional): Filter by status (PENDING, COMPLETED, FAILED)
- `payment_method` (optional): Filter by payment method

**Response (200):**
```json
{
  "count": 300,
  "next": "http://localhost:8000/api/transactions/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 2,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
      },
      "transaction_type": "PURCHASE",
      "amount": 999.99,
      "payment_method": "card",
      "description": "Payment for order 1",
      "reference": "LC_A1B2C3D4E5F6",
      "status": "COMPLETED",
      "created": "2024-01-15T12:30:00Z",
      "updated": "2024-01-15T12:35:00Z"
    }
  ]
}
```

### 2. Get Transaction Details
**Endpoint:** `GET /transactions/{transaction_id}/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get detailed information for a specific transaction

**Path Parameters:**
- `transaction_id`: Transaction ID

**Response (200):**
```json
{
  "id": 1,
  "user": {
    "id": 2,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890"
  },
  "transaction_type": "PURCHASE",
  "amount": 999.99,
  "payment_method": "card",
  "description": "Payment for order 1",
  "reference": "LC_A1B2C3D4E5F6",
  "status": "COMPLETED",
  "created": "2024-01-15T12:30:00Z",
  "updated": "2024-01-15T12:35:00Z",
  "order": {
    "id": 1,
    "total_amount": 999.99,
    "items_count": 1
  },
  "payment_gateway_response": {
    "gateway_transaction_id": "GTW_123456789",
    "gateway_status": "success",
    "gateway_message": "Payment processed successfully"
  }
}
```

### 3. Update Transaction Status
**Endpoint:** `PATCH /transactions/{transaction_id}/`  
**Authentication:** Required (Admin only)  
**Description:** Update transaction status (for manual processing)

**Path Parameters:**
- `transaction_id`: Transaction ID to update

**Request Body:**
```json
{
  "status": "COMPLETED",
  "admin_note": "Manually verified and approved"
}
```

**Response (200):**
```json
{
  "id": 1,
  "status": "COMPLETED",
  "admin_note": "Manually verified and approved",
  "updated_by": "admin@larcraft.com",
  "updated": "2024-01-16T10:00:00Z"
}
```

### 4. Get Failed Transactions
**Endpoint:** `GET /transactions/failed/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get all failed transactions requiring attention

**Response (200):**
```json
[
  {
    "id": 5,
    "user": {
      "id": 3,
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane.smith@example.com"
    },
    "amount": 150.00,
    "payment_method": "card",
    "reference": "LC_F1G2H3I4J5K6",
    "status": "FAILED",
    "failure_reason": "Insufficient funds",
    "created": "2024-01-15T15:30:00Z"
  }
]
```

### 5. Refund Transaction
**Endpoint:** `POST /transactions/{transaction_id}/refund/`  
**Authentication:** Required (Admin only)  
**Description:** Process a refund for a completed transaction

**Path Parameters:**
- `transaction_id`: Transaction ID to refund

**Request Body:**
```json
{
  "refund_amount": 999.99,
  "refund_reason": "Customer requested refund",
  "partial_refund": false
}
```

**Response (200):**
```json
{
  "refund_id": "RF_A1B2C3D4E5F6",
  "original_transaction_id": 1,
  "refund_amount": 999.99,
  "refund_reason": "Customer requested refund",
  "status": "PROCESSING",
  "created": "2024-01-16T11:00:00Z"
}
```

---
## 📈 Dashboard Analytics

### 1. Dashboard Overview
**Endpoint:** `GET /dashboard/overview/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get main dashboard statistics

**Response (200):**
```json
{
  "summary": {
    "total_users": 1250,
    "total_products": 150,
    "total_orders": 2500,
    "total_revenue": 125000.00,
    "pending_orders": 25,
    "low_stock_products": 8
  },
  "recent_activity": {
    "new_users_today": 12,
    "orders_today": 35,
    "revenue_today": 8500.00
  },
  "trends": {
    "user_growth": 15.5,
    "order_growth": 22.3,
    "revenue_growth": 18.7
  },
  "top_products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "sales_count": 125,
      "revenue": 124875.00
    }
  ],
  "recent_orders": [
    {
      "id": 2501,
      "user": "John Doe",
      "amount": 999.99,
      "created": "2024-01-16T14:30:00Z"
    }
  ]
}
```

### 2. Sales Performance
**Endpoint:** `GET /dashboard/sales-performance/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get detailed sales performance metrics

**Query Parameters:**
- `period` (optional): daily, weekly, monthly, yearly (default: monthly)

**Response (200):**
```json
{
  "period": "monthly",
  "current_period": {
    "label": "January 2024",
    "total_sales": 45000.00,
    "total_orders": 150,
    "average_order_value": 300.00,
    "unique_customers": 120
  },
  "previous_period": {
    "label": "December 2023",
    "total_sales": 38000.00,
    "total_orders": 120,
    "average_order_value": 316.67,
    "unique_customers": 95
  },
  "growth_metrics": {
    "sales_growth": 18.42,
    "order_growth": 25.00,
    "customer_growth": 26.32
  },
  "chart_data": [
    {
      "date": "2024-01-01",
      "sales": 1500.00,
      "orders": 5
    },
    {
      "date": "2024-01-02",
      "sales": 2200.00,
      "orders": 8
    }
  ]
}
```

### 3. Customer Analytics
**Endpoint:** `GET /dashboard/customer-analytics/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get customer behavior analytics

**Response (200):**
```json
{
  "customer_segments": {
    "new_customers": 45,
    "returning_customers": 75,
    "vip_customers": 30
  },
  "customer_lifetime_value": {
    "average_clv": 850.00,
    "top_customers": [
      {
        "id": 15,
        "name": "John Doe",
        "total_spent": 2500.00,
        "order_count": 8
      }
    ]
  },
  "geographic_distribution": [
    {
      "city": "New York",
      "customer_count": 125,
      "revenue": 35000.00
    },
    {
      "city": "Los Angeles",
      "customer_count": 98,
      "revenue": 28000.00
    }
  ]
}
```

### 4. Inventory Analytics
**Endpoint:** `GET /dashboard/inventory-analytics/`  
**Authentication:** Required (Admin/Employee)  
**Description:** Get inventory performance metrics

**Response (200):**
```json
{
  "inventory_summary": {
    "total_products": 150,
    "in_stock_products": 142,
    "low_stock_products": 8,
    "out_of_stock_products": 0,
    "total_inventory_value": 450000.00
  },
  "top_selling_products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "units_sold": 125,
      "revenue": 124875.00,
      "current_stock": 25
    }
  ],
  "slow_moving_products": [
    {
      "id": 45,
      "name": "Old Product",
      "units_sold": 2,
      "current_stock": 50,
      "days_since_last_sale": 45
    }
  ],
  "stock_alerts": [
    {
      "product_id": 12,
      "product_name": "Product Name",
      "current_stock": 3,
      "reorder_level": 10,
      "alert_type": "low_stock"
    }
  ]
}
```

---

## ⚙️ System Management

### 1. System Health Check
**Endpoint:** `GET /system/health/`  
**Authentication:** Required (Admin only)  
**Description:** Get system health status

**Response (200):**
```json
{
  "status": "healthy",
  "database": {
    "status": "connected",
    "response_time": "15ms"
  },
  "cache": {
    "status": "active",
    "hit_rate": "85%"
  },
  "storage": {
    "status": "available",
    "free_space": "75GB"
  },
  "external_services": {
    "payment_gateway": "online",
    "email_service": "online",
    "sms_service": "online"
  },
  "last_backup": "2024-01-16T02:00:00Z"
}
```

### 2. System Logs
**Endpoint:** `GET /system/logs/`  
**Authentication:** Required (Admin only)  
**Description:** Get system logs

**Query Parameters:**
- `level` (optional): DEBUG, INFO, WARNING, ERROR, CRITICAL
- `limit` (optional): Number of logs to return (default: 100)

**Response (200):**
```json
{
  "logs": [
    {
      "timestamp": "2024-01-16T14:30:00Z",
      "level": "INFO",
      "message": "User login successful",
      "user": "john.doe@example.com",
      "ip_address": "192.168.1.100"
    },
    {
      "timestamp": "2024-01-16T14:25:00Z",
      "level": "ERROR",
      "message": "Payment processing failed",
      "transaction_id": "LC_A1B2C3D4E5F6",
      "error_code": "INSUFFICIENT_FUNDS"
    }
  ],
  "total_logs": 1500,
  "log_levels": {
    "DEBUG": 200,
    "INFO": 1000,
    "WARNING": 250,
    "ERROR": 45,
    "CRITICAL": 5
  }
}
```

### 3. Database Backup
**Endpoint:** `POST /system/backup/`  
**Authentication:** Required (Admin only)  
**Description:** Trigger database backup

**Response (200):**
```json
{
  "backup_id": "BKP_20240116_143000",
  "status": "initiated",
  "estimated_completion": "2024-01-16T14:45:00Z",
  "backup_size_estimate": "2.5GB"
}
```

### 4. System Configuration
**Endpoint:** `GET /system/config/`  
**Authentication:** Required (Admin only)  
**Description:** Get system configuration settings

**Response (200):**
```json
{
  "site_settings": {
    "site_name": "Larcraft",
    "site_url": "https://larcraft.com",
    "admin_email": "admin@larcraft.com",
    "maintenance_mode": false
  },
  "payment_settings": {
    "payment_gateway": "stripe",
    "currency": "USD",
    "tax_rate": 8.5
  },
  "email_settings": {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "email_enabled": true
  },
  "security_settings": {
    "jwt_expiry": 3600,
    "password_min_length": 8,
    "two_factor_enabled": false
  }
}
```

### 5. Update System Configuration
**Endpoint:** `PUT /system/config/`  
**Authentication:** Required (Admin only)  
**Description:** Update system configuration

**Request Body:**
```json
{
  "site_settings": {
    "site_name": "Larcraft Store",
    "maintenance_mode": false
  },
  "payment_settings": {
    "tax_rate": 9.0
  }
}
```

**Response (200):**
```json
{
  "message": "Configuration updated successfully",
  "updated_settings": [
    "site_settings.site_name",
    "payment_settings.tax_rate"
  ],
  "updated_at": "2024-01-16T15:00:00Z"
}
```

---

## ❌ Error Responses

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content returned |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Role-Based Access Errors

**403 Forbidden (Insufficient Role):**
```json
{
  "error": "You do not have permission to perform this action",
  "required_role": "admin",
  "current_role": "employee"
}
```

---

## 🚀 Quick Start Examples

### 1. Admin Login and Dashboard
```bash
# Admin login
curl -X POST http://localhost:8000/api/jwt/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@larcraft.com",
    "password": "admin123"
  }'

# Get dashboard overview
curl -H "Authorization: Bearer <admin_token>" \
  http://localhost:8000/api/dashboard/overview/
```

### 2. Product Management
```bash
# Get all products (admin view)
curl -H "Authorization: Bearer <admin_token>" \
  http://localhost:8000/api/products/

# Create new product
curl -X POST http://localhost:8000/api/products/ \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "price": 299.99,
    "category": 1,
    "quantity": 100
  }'
```

### 3. Order Management
```bash
# Get all orders
curl -H "Authorization: Bearer <admin_token>" \
  "http://localhost:8000/api/orders/?page=1&page_size=20"

# Update order status
curl -X PATCH http://localhost:8000/api/orders/1/ \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"paid": true, "status": "shipped"}'
```

---

## 📞 Support

**Admin Credentials:**
- Email: `admin@larcraft.com`
- Password: `admin123`

**Employee Credentials:**
- Email: `employee@larcraft.com`
- Password: `employee123`

**Base URL:** `http://localhost:8000/api`  
**Version:** 1.0 (Admin Platform)  
**Last Updated:** August 8, 2025
