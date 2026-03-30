# PARKly System - Level 0 Data Flow Diagram (Context Diagram)

## Overview
The Level 0 DFD shows the PARKly Smart Parking Management System as a single process with all external entities and the data flows between them. This is the highest level view of the system.

## Level 0 Data Flow Diagram

```
                                    PARKLY SYSTEM
                              Smart Parking Management System
                                    (Level 0 DFD)

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│                              EXTERNAL ENTITIES                                         │
│                                                                                         │
│  ┌─────────────────┐                                           ┌─────────────────┐     │
│  │                 │                                           │                 │     │
│  │      USER       │                                           │  ADMINISTRATOR  │     │
│  │   (Customer)    │                                           │    (Admin)      │     │
│  │                 │                                           │                 │     │
│  │ - Vehicle Owner │                                           │ - System Admin  │     │
│  │ - Parking User  │                                           │ - Mall Manager  │     │
│  │                 │                                           │                 │     │
│  └─────────────────┘                                           └─────────────────┘     │
│           │                                                             │               │
│           │                                                             │               │
│           ▼                                                             ▼               │
│  ┌─────────────────┐                                           ┌─────────────────┐     │
│  │   Data Flows    │                                           │   Data Flows    │     │
│  │   (User Side)   │                                           │  (Admin Side)   │     │
│  │                 │                                           │                 │     │
│  │ 1. Registration │                                           │ 7. User Reports │     │
│  │    Details      │                                           │ 8. System Stats │     │
│  │ 2. Vehicle Info │                                           │ 9. Slot Status  │     │
│  │ 3. Slot Request │                                           │10. Admin Actions│     │
│  │ 4. Payment Info │                                           │                 │     │
│  │ 5. Exit Request │                                           │                 │     │
│  │ 6. Search Query │                                           │                 │     │
│  └─────────────────┘                                           └─────────────────┘     │
│           │                                                             │               │
│           │                                                             │               │
│           ▼                                                             ▼               │
└───────────┼─────────────────────────────────────────────────────────────┼───────────────┘
            │                                                             │
            │                                                             │
            ▼                                                             ▼
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                       │
│                                                                                       │
│                          ┌─────────────────────────────────┐                        │
│                          │                                 │                        │
│                          │         PARKLY SYSTEM           │                        │
│                          │   Smart Parking Management      │                        │
│                          │                                 │                        │
│                          │        PROCESS 0.0              │                        │
│                          │                                 │                        │
│                          │  ┌─────────────────────────┐    │                        │
│                          │  │    Core Functions:      │    │                        │
│                          │  │                         │    │                        │
│                          │  │ • User Registration     │    │                        │
│                          │  │ • Vehicle Management    │    │                        │
│                          │  │ • Slot Booking         │    │                        │
│                          │  │ • Payment Processing   │    │                        │
│                          │  │ • Exit Management      │    │                        │
│                          │  │ • Admin Dashboard      │    │                        │
│                          │  │ • System Monitoring    │    │                        │
│                          │  │                         │    │                        │
│                          │  └─────────────────────────┘    │                        │
│                          │                                 │                        │
│                          └─────────────────────────────────┘                        │
│                                          │                                           │
│                                          │                                           │
│                                          ▼                                           │
│                          ┌─────────────────────────────────┐                        │
│                          │                                 │                        │
│                          │        DATA STORAGE             │                        │
│                          │                                 │                        │
│                          │     D1: User Database           │                        │
│                          │     D2: Vehicle Database        │                        │
│                          │     D3: Slot Status Store       │                        │
│                          │     D4: Booking Records         │                        │
│                          │                                 │                        │
│                          └─────────────────────────────────┘                        │
│                                                                                       │
└───────────────────────────────────────────────────────────────────────────────────────┘
            ▲                                                             ▲
            │                                                             │
            │                                                             │
            ▼                                                             ▼
┌─────────────────┐                                           ┌─────────────────┐
│   Data Flows    │                                           │   Data Flows    │
│ (System to User)│                                           │(System to Admin)│
│                 │                                           │                 │
│ 1. Registration │                                           │ 7. User Lists   │
│    Confirmation │                                           │ 8. Statistics   │
│ 2. Slot         │                                           │ 9. Slot Reports │
│    Availability │                                           │10. System Status│
│ 3. Booking      │                                           │11. Error Logs   │
│    Confirmation │                                           │                 │
│ 4. Payment      │                                           │                 │
│    Receipt      │                                           │                 │
│ 5. Exit         │                                           │                 │
│    Confirmation │                                           │                 │
│ 6. Search       │                                           │                 │
│    Results      │                                           │                 │
└─────────────────┘                                           └─────────────────┘
```

## Data Flow Details

### **External Entities:**

#### **1. USER (Customer)**
- **Description**: Vehicle owners who use the parking system
- **Role**: Primary system users who register, book slots, and manage parking

#### **2. ADMINISTRATOR (Admin)**
- **Description**: System administrators and mall managers
- **Role**: Monitor system, manage users, and control parking operations

### **Data Flows (Input to System):**

#### **From USER to SYSTEM:**
1. **Registration Details**
   - User personal information (name, phone, license)
   - Account creation data

2. **Vehicle Information**
   - Vehicle number, type (2-wheeler/4-wheeler)
   - Electric vehicle status

3. **Slot Booking Request**
   - Mall selection
   - Vehicle type preference
   - Booking time

4. **Payment Information**
   - Payment method selection
   - Transaction details

5. **Exit Request**
   - Vehicle exit notification
   - Slot freeing request

6. **Search Query**
   - Vehicle number search
   - Booking status inquiry

#### **From ADMINISTRATOR to SYSTEM:**
7. **User Management Requests**
   - View user lists
   - User detail queries

8. **System Monitoring Commands**
   - Health check requests
   - Performance monitoring

9. **Slot Management Actions**
   - Manual slot freeing
   - Status override commands

10. **Administrative Actions**
    - System configuration
    - Emergency controls

### **Data Flows (Output from System):**

#### **From SYSTEM to USER:**
1. **Registration Confirmation**
   - Success/failure status
   - User ID assignment

2. **Slot Availability Information**
   - Available slots display
   - Real-time status updates

3. **Booking Confirmation**
   - Slot assignment details
   - Booking reference number

4. **Payment Receipt**
   - Transaction confirmation
   - Payment details

5. **Exit Confirmation**
   - Successful exit status
   - Slot freed notification

6. **Search Results**
   - Vehicle booking status
   - Slot location information

#### **From SYSTEM to ADMINISTRATOR:**
7. **User Lists and Reports**
   - Registered user information
   - User statistics

8. **System Statistics**
   - Performance metrics
   - Usage analytics

9. **Slot Status Reports**
   - Occupancy information
   - Mall-wise slot status

10. **System Status Information**
    - Health check results
    - Error notifications

11. **System Logs**
    - Error logs
    - Activity logs

### **Data Stores:**

#### **D1: User Database**
- Stores user registration information
- Personal details and credentials

#### **D2: Vehicle Database**
- Vehicle information and ownership
- Vehicle type and specifications

#### **D3: Slot Status Store**
- Real-time slot availability
- Booking status information

#### **D4: Booking Records**
- Historical booking data
- Transaction records

## System Boundary

The **PARKly System** boundary includes:
- ✅ User registration and authentication
- ✅ Vehicle management
- ✅ Slot booking and management
- ✅ Payment processing
- ✅ Exit management
- ✅ Administrative functions
- ✅ Data storage and retrieval

The system boundary excludes:
- ❌ External payment gateways (future integration)
- ❌ Physical parking sensors (future enhancement)
- ❌ Mobile app notifications (future feature)
- ❌ Third-party integrations

## Key Characteristics

### **System Type**: Interactive, Real-time Parking Management System
### **Processing Mode**: Online Transaction Processing
### **Data Storage**: Persistent database with session management
### **User Interface**: Web-based responsive interface
### **Administration**: Comprehensive admin dashboard

This Level 0 DFD provides the highest-level view of the PARKly system, showing the main external entities, the system as a single process, and all the major data flows between them.