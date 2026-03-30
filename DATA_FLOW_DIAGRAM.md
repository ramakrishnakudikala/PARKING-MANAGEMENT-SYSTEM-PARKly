# PARKly System - Data Flow Diagram

## System Overview
PARKly is a smart parking management system with both frontend (client-side) and backend (server-side) components. The system manages user registration, vehicle information, slot booking, and parking operations.

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 USER INTERFACE LAYER                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│  index.html     register.html    booking.html    pay.html    exit.html         │
│  (Landing)      (Registration)   (Slot Select)   (Payment)   (Exit/Search)     │
│      │               │               │              │             │            │
│      └───────────────┼───────────────┼──────────────┼─────────────┘            │
│                      │               │              │                          │
└──────────────────────┼───────────────┼──────────────┼──────────────────────────┘
                       │               │              │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT-SIDE LOGIC LAYER                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   js/api.js │    │ js/utils.js │    │ Validation  │    │ Local State │      │
│  │             │    │             │    │  Functions  │    │ Management  │      │
│  │ - apiCall() │    │ - getSlotKey│    │ - validate  │    │ - getCurrent│      │
│  │ - register  │    │ - validate  │    │   Vehicle   │    │   User()    │      │
│  │   User()    │    │   Phone()   │    │ - validate  │    │ - saveUser  │      │
│  │ - getUser   │    │ - validate  │    │   License   │    │ - getBooked │      │
│  │   ByPhone() │    │   License() │    │ - validate  │    │   Slots()   │      │
│  │ - checkVeh  │    │ - isVehicle │    │   Phone     │    │ - saveSlots │      │
│  │   icleExists│    │   Booked()  │    │             │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│         │                   │                   │                   │          │
│         │                   │                   │                   │          │
└─────────┼───────────────────┼───────────────────┼───────────────────┼──────────┘
          │                   │                   │                   │
          │                   │                   │                   │
┌─────────┼───────────────────┼───────────────────┼───────────────────┼──────────┐
│         │                   │                   │                   │          │
│                          STORAGE LAYER                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────┐              ┌─────────────────────────┐          │
│  │    LOCAL STORAGE        │              │    BACKEND DATABASE     │          │
│  │    (Browser)            │              │    (SQLite - parkly.db) │          │
│  │                         │              │                         │          │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │
│  │ │   currentUser       │ │              │ │      users          │ │          │
│  │ │   {                 │ │              │ │   - id (PK)         │ │          │
│  │ │     name,           │ │              │ │   - name            │ │          │
│  │ │     phoneNumber,    │ │              │ │   - phone_number    │ │          │
│  │ │     licenseNumber,  │ │              │ │   - license_number  │ │          │
│  │ │     vehicles[],     │ │              │ │   - created_at      │ │          │
│  │ │     mall,           │ │              │ │   - updated_at      │ │          │
│  │ │     vehicleType,    │ │              │ └─────────────────────┘ │          │
│  │ │     isEV            │ │              │                         │          │
│  │ │   }                 │ │              │ ┌─────────────────────┐ │          │
│  │ └─────────────────────┘ │              │ │     vehicles        │ │          │
│  │                         │              │ │   - id (PK)         │ │          │
│  │ ┌─────────────────────┐ │              │ │   - user_id (FK)    │ │          │
│  │ │   bookedSlots       │ │              │ │   - vehicle_number  │ │          │
│  │ │   {                 │ │              │ │   - vehicle_type    │ │          │
│  │ │     "Mall_Type": {  │ │              │ │   - is_ev           │ │          │
│  │ │       "slotId": {   │ │              │ │   - created_at      │ │          │
│  │ │         vehicleNo,  │ │              │ └─────────────────────┘ │          │
│  │ │         userName,   │ │              │                         │          │
│  │ │         phoneNo,    │ │              │ ┌─────────────────────┐ │          │
│  │ │         timestamp   │ │              │ │     bookings        │ │          │
│  │ │       }             │ │              │ │   - id (PK)         │ │          │
│  │ │     }               │ │              │ │   - user_id (FK)    │ │          │
│  │ │   }                 │ │              │ │   - vehicle_id (FK) │ │          │
│  │ └─────────────────────┘ │              │ │   - mall_name       │ │          │
│  └─────────────────────────┘              │ │   - slot_number     │ │          │
│                                           │ │   - booking_date    │ │          │
│                                           │ │   - status          │ │          │
│                                           │ └─────────────────────┘ │          │
│                                           └─────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND SERVER LAYER                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                           server.js (Express.js)                        │   │
│  │                                                                         │   │
│  │  API ENDPOINTS:                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │   │
│  │  │ POST /api/      │  │ GET /api/user/  │  │ GET /api/       │         │   │
│  │  │ register        │  │ :phoneNumber    │  │ vehicle/        │         │   │
│  │  │                 │  │                 │  │ :vehicleNumber  │         │   │
│  │  │ - Validate data │  │ - Find user by  │  │ - Check if      │         │   │
│  │  │ - Check phone   │  │   phone number  │  │   vehicle       │         │   │
│  │  │   uniqueness    │  │ - Return user   │  │   exists        │         │   │
│  │  │ - Insert user   │  │   with vehicles │  │ - Return owner  │         │   │
│  │  │ - Insert        │  │                 │  │   details       │         │   │
│  │  │   vehicles      │  │                 │  │                 │         │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘         │   │
│  │                                                                         │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │   │
│  │  │ GET /api/users  │  │ GET /api/health │  │ Static File     │         │   │
│  │  │                 │  │                 │  │ Serving         │         │   │
│  │  │ - Get all users │  │ - Server status │  │                 │         │   │
│  │  │ - Include       │  │   check         │  │ - HTML files    │         │   │
│  │  │   vehicle count │  │                 │  │ - CSS files     │         │   │
│  │  │ - Admin use     │  │                 │  │ - JS files      │         │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘         │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ADMIN INTERFACE LAYER                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                           admin.html                                    │   │
│  │                                                                         │   │
│  │  FEATURES:                                                              │   │
│  │  - Real-time user statistics                                           │   │
│  │  - User management dashboard                                           │   │
│  │  - Vehicle information display                                         │   │
│  │  - Slot occupancy monitoring                                           │   │
│  │  - Mall-wise slot status visualization                                 │   │
│  │  - Slot freeing functionality                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Detailed Data Flow Processes

### 1. User Registration Flow
```
User Input (register.html)
    ↓
Validation (js/utils.js)
    ↓
API Call (js/api.js → POST /api/register)
    ↓
Backend Processing (server.js)
    ↓
Database Storage (SQLite - users & vehicles tables)
    ↓
Response to Frontend
    ↓
Local Storage Update (currentUser)
    ↓
Redirect to Booking Page
```

### 2. Slot Booking Flow
```
User Selection (booking.html)
    ↓
Slot Availability Check (js/utils.js)
    ↓
Vehicle Validation (Local + Backend)
    ↓
Slot Reservation (Local Storage - bookedSlots)
    ↓
Payment Processing (pay.html)
    ↓
Booking Confirmation
    ↓
Slot Status Update
```

### 3. Vehicle Search Flow
```
Search Input (exit.html)
    ↓
Local Storage Search (bookedSlots)
    ↓
Backend API Call (GET /api/vehicle/:vehicleNumber)
    ↓
Database Query (vehicles table)
    ↓
Result Display
    ↓
Slot Freeing Option
```

### 4. Admin Dashboard Flow
```
Admin Access (admin.html)
    ↓
API Calls (GET /api/users)
    ↓
Database Queries (users, vehicles tables)
    ↓
Statistics Calculation
    ↓
Real-time Display Update
    ↓
Slot Management Actions
```

## Data Entities and Relationships

### Primary Data Entities:
1. **User**: Personal information and credentials
2. **Vehicle**: Vehicle details linked to users
3. **Slot**: Parking slot information and status
4. **Booking**: Reservation records
5. **Mall**: Parking facility information

### Key Relationships:
- User → Vehicles (One-to-Many)
- Vehicle → Bookings (One-to-Many)
- Slot → Bookings (One-to-Many)
- Mall → Slots (One-to-Many)

## Data Storage Strategy

### Frontend (Browser):
- **localStorage**: Temporary session data, slot status
- **sessionStorage**: Page-specific temporary data

### Backend (Server):
- **SQLite Database**: Persistent user and vehicle data
- **In-Memory**: Session management, temporary calculations

## Security and Validation

### Input Validation:
- Vehicle number format validation
- Phone number format validation
- License number format validation
- Duplicate registration prevention

### Data Integrity:
- Foreign key constraints
- Unique constraints on critical fields
- Transaction management for multi-table operations

## Real-time Features

### Live Updates:
- Slot availability status
- User registration statistics
- Booking confirmations
- Admin dashboard metrics

### Synchronization:
- Local storage ↔ Backend database
- Multiple user session handling
- Conflict resolution for simultaneous bookings

This data flow diagram represents the complete architecture of the PARKly system, showing how data moves between different layers and components of the application.