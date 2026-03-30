# PARKly System - Simple Data Flow Diagram

## Basic Data Flow Diagram

```
                    SIMPLE PARKLY SYSTEM DATA FLOW DIAGRAM

┌─────────────┐                                                    ┌─────────────┐
│             │                                                    │             │
│    USER     │                                                    │    ADMIN    │
│ (Customer)  │                                                    │ (Manager)   │
│             │                                                    │             │
└─────────────┘                                                    └─────────────┘
       │                                                                  │
       │ 1. User Details                                                  │ 6. View Users
       │ 2. Vehicle Info                                                  │ 7. System Stats
       │ 3. Book Slot                                                     │
       │ 4. Make Payment                                                  │
       │ 5. Exit Parking                                                  │
       ▼                                                                  ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                            PARKLY SYSTEM                                       │
│                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   REGISTER  │    │    BOOK     │    │     PAY     │    │    EXIT     │     │
│  │    USER     │    │    SLOT     │    │   PARKING   │    │   PARKING   │     │
│  │             │    │             │    │             │    │             │     │
│  │ • Save user │    │ • Check     │    │ • Process   │    │ • Find      │     │
│  │   details   │    │   available │    │   payment   │    │   vehicle   │     │
│  │ • Add       │    │   slots     │    │ • Confirm   │    │ • Free slot │     │
│  │   vehicles  │    │ • Assign    │    │   booking   │    │ • Update    │     │
│  │             │    │   slot      │    │             │    │   status    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │                   │         │
│         ▼                   ▼                   ▼                   ▼         │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        DATABASE                                         │   │
│  │                                                                         │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                 │   │
│  │  │    USERS    │    │  VEHICLES   │    │    SLOTS    │                 │   │
│  │  │             │    │             │    │             │                 │   │
│  │  │ • Name      │    │ • Number    │    │ • Mall      │                 │   │
│  │  │ • Phone     │    │ • Type      │    │ • Slot ID   │                 │   │
│  │  │ • License   │    │ • Owner     │    │ • Status    │                 │   │
│  │  │             │    │ • EV Type   │    │ • Vehicle   │                 │   │
│  │  └─────────────┘    └─────────────┘    └─────────────┘                 │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
       ▲                   ▲                   ▲                   ▲
       │                   │                   │                   │
       │ Registration      │ Slot              │ Payment           │ Exit
       │ Confirmation      │ Assignment        │ Receipt           │ Confirmation
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐                                                    ┌─────────────┐
│             │                                                    │             │
│    USER     │                                                    │    ADMIN    │
│ (Customer)  │                                                    │ (Manager)   │
│             │                                                    │             │
└─────────────┘                                                    └─────────────┘
       ▲                                                                  ▲
       │                                                                  │
       │ • Registration Success                                           │ • User Reports
       │ • Available Slots                                                │ • Slot Status
       │ • Booking Confirmation                                           │ • System Health
       │ • Payment Receipt                                                │
       │ • Exit Success                                                   │
```

## Simple Process Flow

### **Step 1: User Registration**
```
User → Enter Details → System → Save to Database → Confirmation
```

### **Step 2: Slot Booking**
```
User → Select Mall → System → Check Available Slots → Assign Slot → Confirmation
```

### **Step 3: Payment**
```
User → Make Payment → System → Process Payment → Update Booking → Receipt
```

### **Step 4: Exit Parking**
```
User → Request Exit → System → Find Vehicle → Free Slot → Exit Confirmation
```

### **Step 5: Admin Management**
```
Admin → Request Data → System → Get from Database → Show Reports
```

## Basic Data Elements

### **User Data:**
- Name
- Phone Number
- License Number
- Vehicle Details

### **Vehicle Data:**
- Vehicle Number
- Vehicle Type (2-wheeler/4-wheeler)
- Electric Vehicle (Yes/No)
- Owner Information

### **Slot Data:**
- Mall Name
- Slot Number
- Status (Available/Occupied)
- Vehicle Assigned

### **Booking Data:**
- User ID
- Vehicle ID
- Slot ID
- Booking Time
- Payment Status

## Simple System Functions

### **For Users:**
1. **Register** - Create account with vehicle details
2. **Book** - Select and reserve parking slot
3. **Pay** - Make payment for parking
4. **Exit** - Leave parking and free slot

### **For Admins:**
1. **Monitor** - View system status
2. **Manage** - Control slots and users
3. **Report** - Generate usage reports

## Data Storage (Simple View)

```
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  USERS TABLE          VEHICLES TABLE        SLOTS TABLE     │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐  │
│  │ ID          │      │ ID          │      │ Mall        │  │
│  │ Name        │      │ Number      │      │ Slot_ID     │  │
│  │ Phone       │      │ Type        │      │ Status      │  │
│  │ License     │      │ User_ID     │      │ Vehicle_ID  │  │
│  └─────────────┘      └─────────────┘      └─────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Features (Simple)

✅ **User Registration** - Sign up with vehicle details
✅ **Slot Booking** - Reserve parking space
✅ **Payment Processing** - Pay for parking
✅ **Exit Management** - Leave and free slot
✅ **Admin Dashboard** - Monitor and manage system

## Data Flow Summary

1. **Input**: User details, vehicle info, booking requests, payments
2. **Processing**: Validate data, check availability, assign slots, process payments
3. **Storage**: Save user data, vehicle data, booking records
4. **Output**: Confirmations, receipts, reports, status updates

This simple diagram shows the basic flow of data through the PARKly parking system without complex technical details.