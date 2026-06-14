# Fruits & Vegetables Marketplace

## Overview

Fruits & Vegetables Marketplace is a full-stack microservices-based e-commerce application that allows users to browse fresh fruits and vegetables, compare prices, add products to their shopping cart, and securely place orders.

The application is built using a modern technology stack:

* **Frontend:** Angular, NgRx (Redux Pattern), Angular Material
* **Backend:** Spring Boot Microservices
* **Security:** Spring Security with JWT Authentication
* **Database:** MySQL
* **Communication:** REST APIs
* **Build Tools:** Maven, npm

---

## Features

### Product Management

* View categorized fruits and vegetables.
* Search products by name.
* Filter products by category.
* Display product details including:

  * Name
  * Description
  * Price
  * Quantity Available
  * Product Image

### Price Comparison

* Compare prices of multiple fruits and vegetables.
* Sort products by:

  * Lowest Price
  * Highest Price
  * Alphabetical Order
* View price differences between selected products.

### Shopping Cart

* Add products to cart.
* Update product quantities.
* Remove products from cart.
* Calculate total price automatically.
* Persist cart data across sessions.

### User Authentication & Authorization

* User Registration.
* User Login.
* JWT Token-Based Authentication.
* Role-Based Access Control.
* Secure API endpoints using Spring Security.

### Order Management

* Place orders securely.
* View order history.
* Track order status.

### Responsive UI

* Mobile-friendly design.
* Angular Material components.
* Optimized user experience.

---

# System Architecture

## Frontend

### Angular Application

Responsibilities:

* Product listing page
* Product comparison page
* Shopping cart management
* User authentication
* Order placement

### State Management (NgRx)

Store Modules:

* Auth State
* Product State
* Cart State
* Order State

Benefits:

* Centralized state management
* Predictable data flow
* Improved scalability
* Better debugging capabilities

---

## Backend Microservices

### API Gateway Service

Responsibilities:

* Single entry point
* Route requests
* JWT validation
* Load balancing

Endpoints:

```text
/api/**
```

---

### Authentication Service

Responsibilities:

* User registration
* Login
* JWT token generation
* User management

Endpoints:

```text
POST /auth/register
POST /auth/login
GET  /auth/profile
```

---

### Product Service

Responsibilities:

* Product catalog
* Category management
* Product search
* Product pricing

Endpoints:

```text
GET    /products
GET    /products/{id}
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

---

### Cart Service

Responsibilities:

* Add items to cart
* Remove items
* Update quantities
* Calculate totals

Endpoints:

```text
GET    /cart
POST   /cart/add
PUT    /cart/update
DELETE /cart/remove/{id}
```

---

### Order Service

Responsibilities:

* Order placement
* Order tracking
* Order history

Endpoints:

```text
POST /orders
GET  /orders
GET  /orders/{id}
```

---

## Security

Spring Security Features:

* JWT Authentication
* Password Encryption (BCrypt)
* Role-Based Authorization
* Stateless Session Management
* API Endpoint Protection

Roles:

### ADMIN

Permissions:

* Manage products
* Manage inventory
* View all orders
* Manage users

### CUSTOMER

Permissions:

* Browse products
* Compare prices
* Add products to cart
* Place orders
* View personal orders

---

# Database Design

## Users

| Field    | Type   |
| -------- | ------ |
| id       | Long   |
| username | String |
| email    | String |
| password | String |
| role     | String |

---

## Products

| Field         | Type    |
| ------------- | ------- |
| id            | Long    |
| name          | String  |
| category      | String  |
| description   | String  |
| price         | Decimal |
| stockQuantity | Integer |
| imageUrl      | String  |

---

## Cart

| Field     | Type    |
| --------- | ------- |
| id        | Long    |
| userId    | Long    |
| productId | Long    |
| quantity  | Integer |

---

## Orders

| Field       | Type      |
| ----------- | --------- |
| id          | Long      |
| userId      | Long      |
| totalAmount | Decimal   |
| status      | String    |
| createdDate | Timestamp |

---

# Project Structure

```text
fruit-vegetable-marketplace
│
├── frontend-angular
│   ├── src
│   ├── app
│   ├── ngrx
│   ├── services
│   └── components
│
├── api-gateway
│
├── auth-service
│
├── product-service
│
├── cart-service
│
├── order-service
│
├── eureka-server
│
├── docker
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/fruit-vegetable-marketplace.git
cd fruit-vegetable-marketplace
```

---

## Backend Setup

```bash
cd auth-service
mvn clean install

cd ../product-service
mvn clean install

cd ../cart-service
mvn clean install

cd ../order-service
mvn clean install
```

Run services:

```bash
mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd frontend-angular

npm install

ng serve
```

Application URL:

```text
http://localhost:4200
```

---

# Future Enhancements

* Wishlist Management
* Online Payments Integration
* Product Ratings & Reviews
* AI-Based Product Recommendations
* Inventory Alerts
* Multi-Vendor Support
* Real-Time Price Updates
* Push Notifications
* Kubernetes Deployment

---

# Technology Stack

| Layer             | Technology            |
| ----------------- | --------------------- |
| Frontend          | Angular               |
| State Management  | NgRx (Redux)          |
| Backend           | Spring Boot           |
| Security          | Spring Security + JWT |
| Database          | MySQL/PostgreSQL      |
| Gateway           | Spring Cloud Gateway  |
| Service Discovery | Eureka                |
| Build Tool        | Maven                 |
| Containerization  | Docker                |

---

# Author

Developed using Angular, NgRx, Spring Boot Microservices, and Spring Security to provide a scalable and secure Fruits & Vegetables Marketplace platform.
