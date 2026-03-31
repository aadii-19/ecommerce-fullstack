# Software Requirements Specification (SRS)

## Full Stack E-Commerce Platform (No Payment Integration)

---

## 1. Introduction

### 1.1 Purpose

This document describes the functional and non-functional requirements for the Full Stack E-Commerce Platform. The system enables users to browse products, manage a shopping cart, and place orders without integrating a payment gateway.

### 1.2 Scope

The application is a web-based platform consisting of a frontend user interface and a backend REST API. It supports user authentication, product management, cart operations, and order processing.

### 1.3 Definitions

* User: A registered individual using the system
* Admin: A privileged user who manages products and orders
* Cart: Temporary storage of selected products before checkout
* Order: A confirmed purchase record

---

## 2. Overall Description

### 2.1 System Overview

The system follows a client-server architecture:

* Frontend: User interface for interaction
* Backend: REST APIs handling business logic
* Database: Stores users, products, carts, and orders

### 2.2 User Classes

* Guest User: Can view products
* Registered User: Can manage cart and place orders
* Admin: Can manage products and view orders

### 2.3 Assumptions

* Internet connectivity is available
* Users have basic knowledge of web navigation
* Payment is simulated (no real transaction processing)

---

## 3. Functional Requirements

### 3.1 User Authentication

* Users must be able to register and log in
* System must validate credentials
* Session or token-based authentication should be implemented

### 3.2 Product Management

* Users can view all products
* Users can view product details
* Admin can add, update, and delete products

### 3.3 Cart Management

* Users can add items to cart
* Users can remove items from cart
* Users can update item quantity
* System calculates total price dynamically

### 3.4 Order Processing

* Users can place orders from cart
* System stores order details
* Order status is set to "Placed"

### 3.5 Order History

* Users can view previous orders
* Admin can view all orders

---

## 4. Non-Functional Requirements

### 4.1 Performance

* System should handle multiple users concurrently
* API response time should be under 2 seconds

### 4.2 Security

* Passwords must be encrypted
* Authentication tokens should be validated
* Input validation must be enforced

### 4.3 Usability

* Interface should be simple and intuitive
* Navigation should be consistent

### 4.4 Scalability

* System should support future integration of payment gateway
* Modular architecture should be followed

---

## 5. System Architecture

### 5.1 High-Level Architecture

Client (Frontend) → REST API (Backend) → Database

### 5.2 Technology Stack

* Frontend: React / HTML-CSS-JS
* Backend: Spring Boot
* Database: MySQL

---

## 6. Database Design

### 6.1 User Table

* id (Primary Key)
* email
* password

### 6.2 Product Table

* id (Primary Key)
* name
* price
* description
* image_url

### 6.3 Cart Table

* id (Primary Key)
* user_id (Foreign Key)

### 6.4 CartItem Table

* id (Primary Key)
* cart_id (Foreign Key)
* product_id (Foreign Key)
* quantity

### 6.5 Order Table

* id (Primary Key)
* user_id (Foreign Key)
* total_price
* status

### 6.6 OrderItem Table

* id (Primary Key)
* order_id (Foreign Key)
* product_id (Foreign Key)
* quantity

---

## 7. API Design

### 7.1 Authentication APIs

* POST /api/auth/register
* POST /api/auth/login

### 7.2 Product APIs

* GET /api/products
* GET /api/products/{id}
* POST /api/products (Admin)
* PUT /api/products/{id} (Admin)
* DELETE /api/products/{id} (Admin)

### 7.3 Cart APIs

* GET /api/cart
* POST /api/cart/add
* PUT /api/cart/update
* DELETE /api/cart/remove/{productId}

### 7.4 Order APIs

* POST /api/orders
* GET /api/orders/user
* GET /api/orders (Admin)

---

## 8. Future Enhancements

* Payment gateway integration (Razorpay/Stripe)
* Product recommendation system
* Order tracking and delivery status
* Role-based access control

---

## 9. Conclusion

This system provides a scalable and modular foundation for an e-commerce platform. The current implementation focuses on core functionalities, with scope for future enhancements such as payment integration and advanced analytics.

---
