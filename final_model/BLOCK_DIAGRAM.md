# PARKly System - Block Diagram

## System Architecture Overview

The PARKly Smart Parking Management System follows a client-server architecture with multiple interconnected components working together to provide a comprehensive parking solution.

## Main System Block Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    PARKLY SYSTEM                                        │
│                              Smart Parking Management Solution                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                  USER INTERFACE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Landing   │  │    User     │  │    Slot     │  │   Payment   │  │    Exit     │   │
│  │    Page     │  │Registration │  │  Booking    │  │ Processing  │  │ Management  │   │
│  │             │  │             │  │             │  │             │  │             │   │
│  │ index.html  │  │register.html│  │booking.html │  │  pay.html   │  │ exit.html   │   │
│  │             │  │register2.html│  │             │  │paydetails.  │  │             │   │
│  │ - Welcome   │  │             │  │ - Slot Grid │  │  html       │  │ - Vehicle   │   │
│  │ - Navigation│  │ - User Info │  │ - Mall      │  │             │  │   Search    │   │
│  │ - Features  │  │ - Vehicle   │  │   Selection │  │ - Payment   │  │ - Slot      │   │
│  │ - About     │  │   Details   │  │ - Vehicle   │  │   Methods   │  │   Freeing   │   │
│  │             │  │ - Validation│  │   Type      │  │ - Receipt   │  │ - History   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               CLIENT-SIDE PROCESSING LAYER                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────┐              ┌─────────────────────────┐                  │
│  │     API COMMUNICATION   │              │    UTILITY FUNCTIONS    │                  │
│  │        (js/api.js)      │              │      (js/utils.js)      │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │   HTTP Requests     │ │              │ │    Validation       │ │                  │
│  │ │ - registerUser()    │ │              │ │ - validateVehicle() │ │                  │
│  │ │ - getUserByPhone()  │ │              │ │ - validatePhone()   │ │                  │
│  │ │ - checkVehicle()    │ │              │ │ - validateLicense() │ │                  │
│  │ │ - getAllUsers()     │ │              │ └─────────────────────┘ │                  │
│  │ └─────────────────────┘ │              │                         │                  │
│  │                         │              │ ┌─────────────────────┐ │                  │
│  │ ┌─────────────────────┐ │              │ │  Storage Helpers    │ │                  │
│  │ │   Error Handling    │ │              │ │ - getCurrentUser()  │ │                  │
│  │ │ - API Error Mgmt    │ │              │ │ - saveCurrentUser() │ │                  │
│  │ │ - Retry Logic       │ │              │ │ - getBookedSlots()  │ │                  │
│  │ │ - Fallback Methods  │ │              │ │ - saveBookedSlots() │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  └─────────────────────────┘              └─────────────────────────┘                  │
│                                                                                         │
│  ┌─────────────────────────┐              ┌─────────────────────────┐                  │
│  │    BUSINESS LOGIC       │              │    STATE MANAGEMENT     │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Slot Management    │ │              │ │   Session Data      │ │                  │
│  │ │ - getSlotKey()      │ │              │ │ - Current User      │ │                  │
│  │ │ - checkAvailability │ │              │ │ - Selected Mall     │ │                  │
│  │ │ - bookSlot()        │ │              │ │ - Vehicle Info      │ │                  │
│  │ │ - freeSlot()        │ │              │ │ - Booking Status    │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Vehicle Logic      │ │              │ │  Persistent Data    │ │                  │
│  │ │ - isVehicleBooked() │ │              │ │ - localStorage      │ │                  │
│  │ │ - validateVehicle() │ │              │ │ - sessionStorage    │ │                  │
│  │ │ - getVehicleInfo()  │ │              │ │ - Cache Management  │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  └─────────────────────────┘              └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                COMMUNICATION LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                            HTTP/HTTPS PROTOCOL                                  │   │
│  │                                                                                 │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │   │
│  │  │   Request   │    │   Response  │    │    CORS     │    │   Headers   │      │   │
│  │  │   Methods   │    │   Handling  │    │   Policy    │    │ Management  │      │   │
│  │  │             │    │             │    │             │    │             │      │   │
│  │  │ - GET       │    │ - JSON      │    │ - Origin    │    │ - Content   │      │   │
│  │  │ - POST      │    │ - Status    │    │   Control   │    │   Type      │      │   │
│  │  │ - PUT       │    │ - Error     │    │ - Methods   │    │ - Auth      │      │   │
│  │  │ - DELETE    │    │   Codes     │    │   Allowed   │    │   Headers   │      │   │
│  │  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 BACKEND SERVER LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                           EXPRESS.JS SERVER (server.js)                         │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │     MIDDLEWARE          │              │    API ENDPOINTS        │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │   CORS Handler      │ │              │ │  User Management    │ │          │   │
│  │  │ │ - Cross-Origin      │ │              │ │ POST /api/register  │ │          │   │
│  │  │ │   Requests          │ │              │ │ GET /api/user/:id   │ │          │   │
│  │  │ └─────────────────────┘ │              │ │ GET /api/users      │ │          │   │
│  │  │                         │              │ └─────────────────────┘ │          │   │
│  │  │ ┌─────────────────────┐ │              │                         │          │   │
│  │  │ │  Body Parser        │ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │ - JSON Parsing      │ │              │ │ Vehicle Management  │ │          │   │
│  │  │ │ - URL Encoding      │ │              │ │ GET /api/vehicle/   │ │          │   │
│  │  │ └─────────────────────┘ │              │ │     :vehicleNumber  │ │          │   │
│  │  │                         │              │ └─────────────────────┘ │          │   │
│  │  │ ┌─────────────────────┐ │              │                         │          │   │
│  │  │ │  Static Files       │ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │ - HTML Serving      │ │              │ │  System Endpoints   │ │          │   │
│  │  │ │ - CSS/JS Assets     │ │              │ │ GET /api/health     │ │          │   │
│  │  │ │ - Image Files       │ │              │ │ GET /               │ │          │   │
│  │  │ └─────────────────────┘ │              │ └─────────────────────┘ │          │   │
│  │  └─────────────────────────┘              └─────────────────────────┘          │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │   ERROR HANDLING        │              │   BUSINESS LOGIC        │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │  Global Error       │ │              │ │  Data Validation    │ │          │   │
│  │  │ │  Handler            │ │              │ │ - Input Sanitization│ │          │   │
│  │  │ └─────────────────────┘ │              │ │ - Business Rules    │ │          │   │
│  │  │                         │              │ │ - Constraint Checks │ │          │   │
│  │  │ ┌─────────────────────┐ │              │ └─────────────────────┘ │          │   │
│  │  │ │  HTTP Status        │ │              │                         │          │   │
│  │  │ │  Management         │ │              │ ┌─────────────────────┐ │          │   │
│  │  │ └─────────────────────┘ │              │ │  Transaction Mgmt   │ │          │   │
│  │  │                         │              │ │ - Database Txns     │ │          │   │
│  │  │ ┌─────────────────────┐ │              │ │ - Rollback Logic    │ │          │   │
│  │  │ │  Logging System     │ │              │ │ - Consistency       │ │          │   │
│  │  │ │ - Request Logs      │ │              │ └─────────────────────┘ │          │   │
│  │  │ │ - Error Logs        │ │              └─────────────────────────┘          │   │
│  │  │ └─────────────────────┘ │                                                   │   │
│  │  └─────────────────────────┘                                                   │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DATABASE LAYER                                          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                            SQLite DATABASE (parkly.db)                          │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │      USERS TABLE        │              │    VEHICLES TABLE       │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │  Schema Structure   │ │              │ │  Schema Structure   │ │          │   │
│  │  │ │ - id (PK)           │ │              │ │ - id (PK)           │ │          │   │
│  │  │ │ - name              │ │              │ │ - user_id (FK)      │ │          │   │
│  │  │ │ - phone_number      │ │              │ │ - vehicle_number    │ │          │   │
│  │  │ │ - license_number    │ │              │ │ - vehicle_type      │ │          │   │
│  │  │ │ - created_at        │ │              │ │ - is_ev             │ │          │   │
│  │  │ │ - updated_at        │ │              │ │ - created_at        │ │          │   │
│  │  │ └─────────────────────┘ │              │ └─────────────────────┘ │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │   Constraints       │ │              │ │   Constraints       │ │          │   │
│  │  │ │ - UNIQUE phone      │ │              │ │ - UNIQUE vehicle_no │ │          │   │
│  │  │ │ - NOT NULL fields   │ │              │ │ - FK to users       │ │          │   │
│  │  │ └─────────────────────┘ │              │ │ - NOT NULL fields   │ │          │   │
│  │  └─────────────────────────┘              │ └─────────────────────┘ │          │   │
│  │                                           └─────────────────────────┘          │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │    BOOKINGS TABLE       │              │   DATABASE OPERATIONS   │          │   │
│  │  │   (Future Extension)    │              │                         │          │   │
│  │  │                         │              │ ┌─────────────────────┐ │          │   │
│  │  │ ┌─────────────────────┐ │              │ │   CRUD Operations   │ │          │   │
│  │  │ │  Schema Structure   │ │              │ │ - CREATE records    │ │          │   │
│  │  │ │ - id (PK)           │ │              │ │ - READ queries      │ │          │   │
│  │  │ │ - user_id (FK)      │ │              │ │ - UPDATE data       │ │          │   │
│  │  │ │ - vehicle_id (FK)   │ │              │ │ - DELETE records    │ │          │   │
│  │  │ │ - mall_name         │ │              │ └─────────────────────┘ │          │   │
│  │  │ │ - slot_number       │ │              │                         │          │   │
│  │  │ │ - booking_date      │ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │ - status            │ │              │ │  Query Optimization │ │          │   │
│  │  │ └─────────────────────┘ │              │ │ - Indexing          │ │          │   │
│  │  └─────────────────────────┘              │ │ - Join Operations   │ │          │   │
│  │                                           │ │ - Performance       │ │          │   │
│  │                                           │ └─────────────────────┘ │          │   │
│  │                                           └─────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              ADMINISTRATION LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                           ADMIN DASHBOARD (admin.html)                          │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │   USER MANAGEMENT       │              │   SYSTEM MONITORING     │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │  User Statistics    │ │              │ │  Real-time Stats    │ │          │   │
│  │  │ │ - Total Users       │ │              │ │ - Active Sessions   │ │          │   │
│  │  │ │ - New Registrations │ │              │ │ - Server Status     │ │          │   │
│  │  │ │ - Vehicle Count     │ │              │ │ - Database Health   │ │          │   │
│  │  │ └─────────────────────┘ │              │ └─────────────────────┘ │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │  User Details       │ │              │ │  Slot Management    │ │          │   │
│  │  │ │ - Personal Info     │ │              │ │ - Occupancy Status  │ │          │   │
│  │  │ │ - Vehicle List      │ │              │ │ - Mall-wise View    │ │          │   │
│  │  │ │ - Registration Date │ │              │ │ - Slot Freeing      │ │          │   │
│  │  │ └─────────────────────┘ │              │ └─────────────────────┘ │          │   │
│  │  └─────────────────────────┘              └─────────────────────────┘          │   │
│  │                                                                                 │   │
│  │  ┌─────────────────────────┐              ┌─────────────────────────┐          │   │
│  │  │   REPORTING SYSTEM      │              │   CONTROL FUNCTIONS     │          │   │
│  │  │                         │              │                         │          │   │
│  │  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │          │   │
│  │  │ │  Data Export        │ │              │ │  Manual Override    │ │          │   │
│  │  │ │ - User Reports      │ │              │ │ - Force Slot Free   │ │          │   │
│  │  │ │ - Usage Analytics   │ │              │ │ - System Reset      │ │          │   │
│  │  │ │ - Performance Logs  │ │              │ │ - Emergency Actions │ │          │   │
│  │  │ └─────────────────────┘ │              │ └─────────────────────┘ │          │   │
│  │  └─────────────────────────┘              └─────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM INTERACTION FLOW                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  User Input → UI Layer → Client Logic → API Communication → Server Processing          │
│       ↓           ↓           ↓              ↓                    ↓                     │
│  Validation → State Mgmt → HTTP Request → Middleware → Business Logic                   │
│       ↓           ↓           ↓              ↓                    ↓                     │
│  Local Storage → Browser → Network Layer → Express.js → Database Operations            │
│       ↓           ↓           ↓              ↓                    ↓                     │
│  Session Data → Cache → Response → JSON Data → SQL Queries                             │
│       ↓           ↓           ↓              ↓                    ↓                     │
│  UI Update ← Display ← Client Update ← API Response ← Database Results                 │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## External Dependencies and Integrations

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL DEPENDENCIES                                      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────┐              ┌─────────────────────────┐                  │
│  │    FRONTEND LIBRARIES   │              │   BACKEND DEPENDENCIES  │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Google Fonts       │ │              │ │    Express.js       │ │                  │
│  │ │ - Poppins Font      │ │              │ │ - Web Framework     │ │                  │
│  │ │ - Typography        │ │              │ │ - Routing           │ │                  │
│  │ └─────────────────────┘ │              │ │ - Middleware        │ │                  │
│  │                         │              │ └─────────────────────┘ │                  │
│  │ ┌─────────────────────┐ │              │                         │                  │
│  │ │  Font Awesome       │ │              │ ┌─────────────────────┐ │                  │
│  │ │ - Icons Library     │ │              │ │     SQLite3         │ │                  │
│  │ │ - UI Elements       │ │              │ │ - Database Engine   │ │                  │
│  │ └─────────────────────┘ │              │ │ - File-based DB     │ │                  │
│  │                         │              │ └─────────────────────┘ │                  │
│  │ ┌─────────────────────┐ │              │                         │                  │
│  │ │  AOS Library        │ │              │ ┌─────────────────────┐ │                  │
│  │ │ - Scroll Animation  │ │              │ │       CORS          │ │                  │
│  │ │ - Visual Effects    │ │              │ │ - Cross-Origin      │ │                  │
│  │ └─────────────────────┘ │              │ │ - Security Policy   │ │                  │
│  └─────────────────────────┘              │ └─────────────────────┘ │                  │
│                                           │                         │                  │
│                                           │ ┌─────────────────────┐ │                  │
│                                           │ │   Body Parser       │ │                  │
│                                           │ │ - Request Parsing   │ │                  │
│                                           │ │ - JSON Handling     │ │                  │
│                                           │ └─────────────────────┘ │                  │
│                                           └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Security and Performance Blocks

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           SECURITY & PERFORMANCE LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────┐              ┌─────────────────────────┐                  │
│  │   INPUT VALIDATION      │              │   PERFORMANCE OPTIMIZATION │              │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Client-Side        │ │              │ │   Caching Strategy  │ │                  │
│  │ │ - Format Validation │ │              │ │ - localStorage      │ │                  │
│  │ │ - Real-time Check   │ │              │ │ - Session Cache     │ │                  │
│  │ │ - User Feedback     │ │              │ │ - Browser Cache     │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Server-Side        │ │              │ │  Database Optimization │ │              │
│  │ │ - Data Sanitization │ │              │ │ - Query Optimization│ │                  │
│  │ │ - Business Rules    │ │              │ │ - Index Management  │ │                  │
│  │ │ - Constraint Check  │ │              │ │ - Connection Pool   │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  └─────────────────────────┘              └─────────────────────────┘                  │
│                                                                                         │
│  ┌─────────────────────────┐              ┌─────────────────────────┐                  │
│  │   ERROR HANDLING        │              │   MONITORING & LOGGING  │                  │
│  │                         │              │                         │                  │
│  │ ┌─────────────────────┐ │              │ ┌─────────────────────┐ │                  │
│  │ │  Graceful Degradation│ │              │ │  System Monitoring  │ │                  │
│  │ │ - Fallback Methods  │ │              │ │ - Health Checks     │ │                  │
│  │ │ - Offline Support   │ │              │ │ - Performance Metrics│ │                  │
│  │ │ - Recovery Logic    │ │              │ │ - Error Tracking    │ │                  │
│  │ └─────────────────────┘ │              │ └─────────────────────┘ │                  │
│  └─────────────────────────┘              └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Key Features Summary

### **Frontend Components:**
- **Landing Page**: Welcome interface with navigation
- **Registration System**: Multi-step user and vehicle registration
- **Booking Interface**: Interactive slot selection with real-time availability
- **Payment Processing**: Secure payment handling and receipt generation
- **Exit Management**: Vehicle search and slot freeing functionality
- **Admin Dashboard**: Comprehensive system monitoring and management

### **Backend Components:**
- **Express.js Server**: RESTful API with middleware support
- **SQLite Database**: Lightweight, file-based data persistence
- **API Endpoints**: Complete CRUD operations for users and vehicles
- **Error Handling**: Comprehensive error management and logging
- **Static File Serving**: Frontend asset delivery

### **Core Features:**
- **Real-time Slot Management**: Dynamic availability tracking
- **Vehicle Type Segregation**: Separate slots for 2-wheelers, 4-wheelers, and EVs
- **Dual Storage Strategy**: Local storage for session data, database for persistence
- **Admin Controls**: System monitoring and manual override capabilities
- **Responsive Design**: Mobile and desktop compatibility

This block diagram provides a comprehensive view of the PARKly system architecture, showing how all components interact to deliver a complete parking management solution.