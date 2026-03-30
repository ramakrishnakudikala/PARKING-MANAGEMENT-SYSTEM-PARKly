# PARKly System - Module Structure

## System Modules Overview

The PARKly Smart Parking Management System is organized into several interconnected modules, each handling specific functionality.

## 🏗️ Main System Modules

### **1. USER INTERFACE MODULE**
**Files:** `index.html`, `register.html`, `register2.html`, `booking.html`, `pay.html`, `exit.html`, `admin.html`

**Sub-modules:**
- **Landing Page Module** (`index.html`)
  - Welcome interface
  - Navigation menu
  - Feature showcase
  - About section

- **Registration Module** (`register.html`, `register2.html`)
  - Single-page registration form
  - Multi-step registration wizard
  - Form validation
  - User input handling

- **Booking Module** (`booking.html`)
  - Mall selection interface
  - Slot grid display
  - Vehicle type filtering
  - Real-time availability

- **Payment Module** (`pay.html`, `paydetails.html`)
  - Payment form interface
  - Receipt generation
  - Transaction confirmation
  - Payment breakdown

- **Exit Module** (`exit.html`)
  - Vehicle search interface
  - Slot freeing functionality
  - Exit confirmation
  - History display

- **Admin Module** (`admin.html`)
  - Dashboard interface
  - User management
  - System monitoring
  - Reports generation

### **2. CLIENT-SIDE LOGIC MODULE**
**Files:** `js/api.js`, `js/utils.js`

**Sub-modules:**
- **API Communication Module** (`js/api.js`)
  ```javascript
  Functions:
  - apiCall()           // Generic API request handler
  - registerUser()      // User registration API
  - getUserByPhone()    // Fetch user by phone
  - checkVehicleExists() // Vehicle validation
  - getAllUsers()       // Admin user list
  - checkServerHealth() // Health check
  ```

- **Utility Functions Module** (`js/utils.js`)
  ```javascript
  Functions:
  - getSlotKey()        // Slot identification
  - validateVehicleNumber() // Vehicle format validation
  - validatePhoneNumber()   // Phone format validation
  - validateLicenseNumber() // License validation
  - getCurrentUser()    // Session management
  - saveCurrentUser()   // User state saving
  - getBookedSlots()    // Slot status retrieval
  - saveBookedSlots()   // Slot status saving
  - isVehicleAlreadyBooked() // Booking check
  - validateVehicleAvailability() // Availability check
  ```

### **3. BACKEND SERVER MODULE**
**Files:** `server.js`, `package.json`

**Sub-modules:**
- **Express Server Module** (`server.js`)
  - HTTP server setup
  - Middleware configuration
  - Route handling
  - Static file serving

- **Database Management Module**
  ```javascript
  Functions:
  - initializeDatabase() // Database setup
  - Database connection handling
  - Table creation and management
  ```

- **API Endpoints Module**
  ```javascript
  Endpoints:
  - POST /api/register     // User registration
  - GET /api/user/:phone   // Get user by phone
  - GET /api/vehicle/:number // Check vehicle
  - GET /api/users         // Get all users (admin)
  - GET /api/health        // Health check
  - GET /                  // Serve main page
  ```

- **Middleware Module**
  - CORS handling
  - Body parsing
  - Error handling
  - Request logging

### **4. DATA MANAGEMENT MODULE**
**Files:** `parkly.db` (SQLite database)

**Sub-modules:**
- **User Data Module**
  ```sql
  Table: users
  - id (Primary Key)
  - name
  - phone_number (Unique)
  - license_number
  - created_at
  - updated_at
  ```

- **Vehicle Data Module**
  ```sql
  Table: vehicles
  - id (Primary Key)
  - user_id (Foreign Key)
  - vehicle_number (Unique)
  - vehicle_type
  - is_ev (Boolean)
  - created_at
  ```

- **Booking Data Module**
  ```sql
  Table: bookings (Future use)
  - id (Primary Key)
  - user_id (Foreign Key)
  - vehicle_id (Foreign Key)
  - mall_name
  - slot_number
  - booking_date
  - status
  ```

### **5. VALIDATION MODULE**
**Distributed across multiple files**

**Sub-modules:**
- **Client-Side Validation**
  - Real-time form validation
  - Input format checking
  - User feedback
  - Error display

- **Server-Side Validation**
  - Data sanitization
  - Business rule enforcement
  - Constraint validation
  - Security checks

### **6. SLOT MANAGEMENT MODULE**
**Files:** `booking.html`, `js/utils.js`, `free_slots_script.js`

**Sub-modules:**
- **Slot Allocation Module**
  - Vehicle type segregation
  - EV slot management
  - Availability checking
  - Slot assignment

- **Slot Status Module**
  - Real-time status tracking
  - Local storage management
  - Status synchronization
  - Conflict resolution

- **Slot Freeing Module**
  - Exit processing
  - Status updates
  - Cleanup operations

### **7. PAYMENT PROCESSING MODULE**
**Files:** `pay.html`, `paydetails.html`

**Sub-modules:**
- **Payment Interface Module**
  - Payment form handling
  - Method selection
  - Amount calculation
  - User interaction

- **Receipt Generation Module**
  - Receipt formatting
  - Transaction details
  - PDF generation (future)
  - Email sending (future)

### **8. ADMINISTRATION MODULE**
**Files:** `admin.html`, `delete.php`, `submit.php`

**Sub-modules:**
- **User Management Module**
  - User listing
  - User details view
  - User statistics
  - User operations

- **System Monitoring Module**
  - Health checks
  - Performance metrics
  - Error tracking
  - System status

- **Reports Module**
  - Usage analytics
  - Statistical reports
  - Data export
  - Dashboard widgets

### **9. SECURITY MODULE**
**Distributed across the system**

**Sub-modules:**
- **Input Security Module**
  - SQL injection prevention
  - XSS protection
  - Input sanitization
  - Validation enforcement

- **Session Security Module**
  - Session management
  - Data protection
  - Access control
  - Authentication (future)

### **10. CONFIGURATION MODULE**
**Files:** `package.json`, `setup.bat`, `start_server.bat`

**Sub-modules:**
- **Dependency Management**
  - NPM package configuration
  - Version management
  - Development dependencies

- **Environment Setup**
  - Server configuration
  - Database setup
  - Development tools
  - Deployment scripts

## 📊 Module Interaction Matrix

```
┌─────────────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│     Module      │ UI  │Logic│Back │Data │Valid│Slot │Pay  │Admin│Sec  │Conf │
├─────────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ UI Module       │  -  │  ✓  │  ✓  │  ✗  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✗  │
│ Logic Module    │  ✓  │  -  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✗  │
│ Backend Module  │  ✓  │  ✓  │  -  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │
│ Data Module     │  ✗  │  ✓  │  ✓  │  -  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✗  │
│ Validation      │  ✓  │  ✓  │  ✓  │  ✓  │  -  │  ✓  │  ✓  │  ✓  │  ✓  │  ✗  │
│ Slot Mgmt       │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  -  │  ✓  │  ✓  │  ✓  │  ✗  │
│ Payment         │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  -  │  ✓  │  ✓  │  ✗  │
│ Admin           │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  -  │  ✓  │  ✗  │
│ Security        │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  -  │  ✓  │
│ Configuration   │  ✗  │  ✗  │  ✓  │  ✗  │  ✗  │  ✗  │  ✗  │  ✗  │  ✓  │  -  │
└─────────────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```
**Legend:** ✓ = Direct Interaction, ✗ = No Direct Interaction

## 🔄 Module Dependencies

### **High-Level Dependencies:**
1. **UI Module** → **Logic Module** → **Backend Module** → **Data Module**
2. **All Modules** → **Validation Module** (Cross-cutting concern)
3. **All Modules** → **Security Module** (Cross-cutting concern)
4. **Backend Module** → **Configuration Module**

### **Key Module Relationships:**
- **UI ↔ Logic**: User interactions and business logic
- **Logic ↔ Backend**: API calls and data processing
- **Backend ↔ Data**: Database operations and storage
- **Slot Management ↔ Payment**: Booking confirmation flow
- **Admin ↔ All Modules**: System monitoring and control

## 📈 Module Scalability

### **Easily Extensible Modules:**
- **Payment Module** - Add new payment methods
- **Admin Module** - Add more management features
- **API Module** - Add new endpoints
- **Validation Module** - Add new validation rules

### **Core Stable Modules:**
- **Data Module** - Stable database schema
- **Security Module** - Established security patterns
- **Configuration Module** - Basic setup requirements

This modular structure makes the PARKly system maintainable, scalable, and easy to understand for development and enhancement.