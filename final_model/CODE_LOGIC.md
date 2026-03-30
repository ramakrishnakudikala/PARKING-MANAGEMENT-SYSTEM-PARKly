# PARKly Project - Code Logic

## 🏗️ System Architecture

**3-Tier Architecture:**
- **Frontend** - HTML/CSS/JavaScript
- **Backend** - Express.js + API endpoints  
- **Database** - SQLite + Local Storage

## 🔧 Core Logic Components

### **1. Backend Server Logic (server.js)**

**Database Setup:**
```javascript
// Create tables with constraints
function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    license_number TEXT NOT NULL
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    user_id INTEGER,
    vehicle_number TEXT UNIQUE NOT NULL,
    vehicle_type TEXT NOT NULL,
    is_ev BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
}
```

**User Registration:**
```javascript
app.post('/api/register', (req, res) => {
  // 1. Validate input
  // 2. Check duplicate phone
  // 3. Insert user
  // 4. Insert vehicles using Promise.all
  // 5. Return success/error response
});
```

**Data Retrieval:**
```javascript
app.get('/api/user/:phoneNumber', (req, res) => {
  // JOIN query to get user + vehicles
  // Parse concatenated vehicle data
  // Return formatted response
});
```

### **2. Frontend API Logic (js/api.js)**

**Generic API Handler:**
```javascript
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

**Vehicle Validation:**
```javascript
async function validateVehicleWithBackend(vehicleNo) {
  try {
    const result = await checkVehicleExists(vehicleNo);
    return { isValid: !result.exists, message: result.exists ? 'Already registered' : 'Available' };
  } catch (error) {
    // Fallback to local validation
    return { isValid: validateVehicleNumber(vehicleNo), message: 'Local validation only' };
  }
}
```

### **3. Utility Functions (js/utils.js)**

**Slot Key Generation:**
```javascript
function getSlotKey(user) {
    // Separate pools for vehicle types and EV status
    if (user.isEV) return `${user.mall}_${user.vehicleType}_EV`;
    return `${user.mall}_${user.vehicleType}`;
}
```

**Validation Functions:**
```javascript
// Indian vehicle format: XX00XX0000
function validateVehicleNumber(vehicleNo) {
    const pattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return pattern.test(vehicleNo);
}

function validatePhoneNumber(phoneNo) {
    return /^[0-9]{10}$/.test(phoneNo);
}
```

**Storage Management:**
```javascript
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function getBookedSlots() {
    return JSON.parse(localStorage.getItem("bookedSlots")) || {};
}
```

### **4. Slot Allocation Logic (booking.html)**

**Slot Rules:**
```javascript
// Slot allocation by vehicle type:
// 4-Wheeler: Slots 1-10 (+ 24-25 for EV)
// 2-Wheeler: Slots 11-20 (+ 21-23 for EV)

function determineSlotAvailability(slotNumber, user) {
    if (user.vehicleType === "4 Wheeler") {
        return (slotNumber >= 1 && slotNumber <= 10) || 
               (user.isEV && slotNumber >= 24 && slotNumber <= 25);
    } else if (user.vehicleType === "2 Wheeler") {
        return (slotNumber >= 11 && slotNumber <= 20) || 
               (user.isEV && slotNumber >= 21 && slotNumber <= 23);
    }
    return false;
}
```

**Booking Process:**
```javascript
function confirmBooking() {
    // 1. Validate user session
    // 2. Check slot selection
    // 3. Get user confirmation
    // 4. Store booking details with timestamp
    // 5. Navigate to payment
}
```

### **5. Data Storage**

**Dual Storage Strategy:**
- **Local Storage** - Session data, slot status, temporary state
- **SQLite Database** - Persistent user and vehicle data

```javascript
// Session Management
function saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// Slot Status Tracking
function isVehicleAlreadyBooked(vehicleNo) {
    const bookedSlots = getBookedSlots();
    for (let mallKey in bookedSlots) {
        for (let slotId in bookedSlots[mallKey]) {
            const booking = bookedSlots[mallKey][slotId];
            const bookedVehicleNo = typeof booking === 'string' ? booking : booking.vehicleNo;
            if (bookedVehicleNo === vehicleNo) return true;
        }
    }
    return false;
}
```

### **6. Validation Logic**

**Multi-level Validation:**
```javascript
// Client-side (immediate feedback)
function validateForm() {
    if (!name || !phoneNo || !licenseNo) {
        showToast("All fields are required", true);
        return false;
    }
    if (!validatePhoneNumber(phoneNo)) {
        showToast("Invalid phone number", true);
        return false;
    }
    return true;
}

// Server-side (security)
app.post('/api/register', (req, res) => {
    if (!name || !phoneNo || !vehicles.length) {
        return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
});
```

## 🔄 Key Data Flows

**Registration:** `Input → Validation → API → Database → Response`
**Booking:** `Selection → Validation → Confirmation → Storage → Payment`
**Exit:** `Search → Lookup → Free Slot → Update → Confirmation`

## 🛡️ Security & Error Handling

**Error Handling:**
```javascript
// Graceful API error handling with fallbacks
try {
    const result = await apiCall('/register', userData);
} catch (error) {
    showToast(error.message, true);
    // Fallback to local storage if needed
}
```

**Security Measures:**
- Parameter binding prevents SQL injection
- Input validation on client and server
- CORS configuration for secure requests
- Session management with localStorage

## 🎯 Smart Features

**Slot Allocation Rules:**
- **4-Wheeler:** Slots 1-10 (+ 24-25 for EV)
- **2-Wheeler:** Slots 11-20 (+ 21-23 for EV)
- **EV vehicles** get access to both regular + dedicated slots

**Key Logic Patterns:**
✅ **Dual Storage** - Local + Database persistence
✅ **Smart Validation** - Client + Server validation
✅ **Error Recovery** - Graceful fallbacks
✅ **Session Management** - Persistent user state
✅ **Real-time Updates** - Live slot synchronization

This code logic ensures **robust**, **scalable**, and **secure** parking management functionality.