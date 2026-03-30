# PARKly - Software Requirements Specification (SRS)

## 📋 Document Information
- **Project Name:** PARKly - Smart Parking Management System
- **Version:** 1.0
- **Date:** December 2024
- **Document Type:** Software Requirements Specification

---

## 🎯 1. Introduction

### 1.1 Purpose
PARKly is a comprehensive smart parking management system designed to streamline parking operations in shopping malls. The system provides real-time slot allocation, vehicle management, and administrative oversight for efficient parking space utilization.

### 1.2 Scope
The system covers:
- User registration and vehicle management
- Real-time parking slot allocation
- Payment processing integration
- Administrative dashboard for monitoring
- Multi-mall support with different vehicle types
- Electric Vehicle (EV) charging slot management

### 1.3 Definitions and Acronyms
- **EV:** Electric Vehicle
- **API:** Application Programming Interface
- **SPA:** Single Page Application
- **CRUD:** Create, Read, Update, Delete
- **UI/UX:** User Interface/User Experience

---

## 🏗️ 2. System Architecture Requirements

### 2.1 Architecture Pattern
- **Type:** 3-Tier Architecture
- **Frontend:** Client-side web application
- **Backend:** RESTful API server
- **Database:** SQLite with localStorage backup

### 2.2 Technology Stack Requirements

#### Frontend Technologies:
- **HTML5** - Semantic markup and structure
- **CSS3** - Responsive design and animations
- **JavaScript (ES6+)** - Client-side logic and DOM manipulation
- **Fetch API** - HTTP requests to backend
- **LocalStorage** - Client-side data persistence

#### Backend Technologies:
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Embedded database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing middleware

#### Development Tools:
- **Visual Studio Code** - IDE
- **Git** - Version control
- **npm** - Package management

---

## 🔧 3. Functional Requirements

### 3.1 User Management Module

#### 3.1.1 User Registration (FR-001)
**Description:** Users must be able to register with personal and vehicle information.

**Requirements:**
- User must provide: Name, Phone Number, License Number
- System must validate phone number format (10 digits)
- System must validate license number format
- User must register at least one vehicle
- System must prevent duplicate phone number registration
- System must support multiple vehicles per user

**Input Validation:**
- Name: Required, alphabetic characters only
- Phone: Required, exactly 10 digits
- License: Required, alphanumeric format
- Vehicle Number: Required, Indian format (XX00XX0000)

#### 3.1.2 Vehicle Management (FR-002)
**Description:** Users can manage multiple vehicles with different types.

**Requirements:**
- Support vehicle types: 2-Wheeler, 4-Wheeler
- Support EV classification for each vehicle
- Validate vehicle number format
- Prevent duplicate vehicle registration
- Allow multiple vehicles per user account

### 3.2 Parking Slot Management Module

#### 3.2.1 Smart Slot Allocation (FR-003)
**Description:** System must intelligently allocate parking slots based on vehicle type and EV status.

**Slot Allocation Rules:**
- **4-Wheeler Regular:** Slots 1-10 only
- **4-Wheeler EV:** Slots 1-10 + 24-25 (dedicated EV slots)
- **2-Wheeler Regular:** Slots 11-20 only  
- **2-Wheeler EV:** Slots 11-20 + 21-23 (dedicated EV slots)
- **Total Slots:** 25 per mall (5x5 grid layout)

**Requirements:**
- Real-time slot availability checking
- Visual slot status indication (Available/Occupied/Restricted)
- Prevent booking of restricted slots
- Support for 3 different malls
- Slot status persistence across sessions

#### 3.2.2 Booking Management (FR-004)
**Description:** Users can book available parking slots with confirmation.

**Requirements:**
- Display only available slots for user's vehicle type
- Provide slot selection interface
- Confirm booking with user verification
- Generate booking timestamp
- Store booking details with entry time
- Navigate to payment after successful booking

#### 3.2.3 Slot Release (FR-005)
**Description:** System must handle slot release when vehicles exit.

**Requirements:**
- Search functionality by vehicle number
- Display current booking details
- Calculate parking duration
- Release slot and update availability
- Clear booking records from system

### 3.3 Mall Management Module

#### 3.3.1 Multi-Mall Support (FR-006)
**Description:** System must support multiple mall locations.

**Requirements:**
- Support for 3 malls: Next Galleria, Inrobit Mall, GVK Mall
- Separate slot pools for each mall
- Independent slot allocation per mall
- Mall-specific booking management

### 3.4 Payment Integration Module

#### 3.4.1 Payment Processing (FR-007)
**Description:** Integrate payment gateway for parking fees.

**Requirements:**
- Redirect to payment page after booking
- Display booking summary
- Calculate parking charges
- Process payment confirmation
- Generate payment receipt

### 3.5 Administrative Module

#### 3.5.1 Admin Dashboard (FR-008)
**Description:** Comprehensive administrative interface for system monitoring.

**Requirements:**
- Real-time statistics display
- User management interface
- Slot status monitoring across all malls
- Occupied slot management
- Manual slot release capability
- User registration analytics

**Dashboard Features:**
- Total users count
- Total vehicles registered
- Today's registrations
- Total occupied slots
- Mall-wise slot breakdown
- Visual slot grid representation
- Occupied slot duration tracking

---

## 🔒 4. Non-Functional Requirements

### 4.1 Performance Requirements

#### 4.1.1 Response Time (NFR-001)
- **API Response:** < 2 seconds for all requests
- **Page Load:** < 3 seconds for initial load
- **Slot Updates:** Real-time (< 1 second)

#### 4.1.2 Throughput (NFR-002)
- **Concurrent Users:** Support 100+ simultaneous users
- **Database Operations:** Handle 1000+ transactions per hour

### 4.2 Reliability Requirements

#### 4.2.1 Availability (NFR-003)
- **System Uptime:** 99.5% availability
- **Error Recovery:** Graceful error handling with user feedback
- **Data Backup:** Dual storage strategy (Database + LocalStorage)

#### 4.2.2 Data Integrity (NFR-004)
- **ACID Compliance:** Database transactions must be atomic
- **Validation:** Server-side validation for all inputs
- **Consistency:** Real-time slot status synchronization

### 4.3 Security Requirements

#### 4.3.1 Input Security (NFR-005)
- **SQL Injection Prevention:** Parameterized queries only
- **XSS Prevention:** Input sanitization and validation
- **CORS Configuration:** Secure cross-origin requests

#### 4.3.2 Data Protection (NFR-006)
- **Session Management:** Secure user session handling
- **Data Validation:** Multi-level validation (client + server)
- **Error Handling:** No sensitive information in error messages

### 4.4 Usability Requirements

#### 4.4.1 User Interface (NFR-007)
- **Responsive Design:** Support mobile and desktop devices
- **Accessibility:** ARIA labels and keyboard navigation
- **Intuitive Navigation:** Clear user flow and feedback

#### 4.4.2 User Experience (NFR-008)
- **Loading Indicators:** Visual feedback for all operations
- **Error Messages:** Clear, actionable error communication
- **Toast Notifications:** Real-time status updates

### 4.5 Compatibility Requirements

#### 4.5.1 Browser Support (NFR-009)
- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript:** ES6+ features support required
- **CSS:** CSS3 Grid and Flexbox support

#### 4.5.2 Platform Support (NFR-010)
- **Operating Systems:** Windows 10+, macOS 10.15+, Linux Ubuntu 18+
- **Mobile Devices:** iOS 13+, Android 8+
- **Screen Resolutions:** 320px to 4K support

---

## 🗄️ 5. Database Requirements

### 5.1 Data Storage Requirements

#### 5.1.1 Primary Database (SQLite)
```sql
-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    license_number TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table  
CREATE TABLE vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    vehicle_number TEXT UNIQUE NOT NULL,
    vehicle_type TEXT NOT NULL,
    is_ev BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

#### 5.1.2 Session Storage (LocalStorage)
- **currentUser:** Active user session data
- **bookedSlots:** Real-time slot booking status
- **currentBooking:** Active booking details for payment flow

### 5.2 Data Relationships
- **One-to-Many:** User → Vehicles
- **Many-to-One:** Bookings → Users
- **One-to-One:** Slot → Current Booking

---

## 🌐 6. API Requirements

### 6.1 RESTful API Endpoints

#### 6.1.1 User Management APIs
```javascript
POST /api/register
- Purpose: Register new user with vehicles
- Input: { name, phoneNo, licenseNo, vehicles[] }
- Output: { success, message, userId }

GET /api/user/:phoneNumber  
- Purpose: Retrieve user details with vehicles
- Output: { success, user: { id, name, phoneNumber, vehicles[] } }

GET /api/vehicle/:vehicleNumber
- Purpose: Check vehicle registration status
- Output: { exists, vehicle: { ownerName, vehicleType } }
```

#### 6.1.2 System APIs
```javascript
GET /api/users
- Purpose: Get all registered users (Admin)
- Output: { success, users[] }

GET /api/stats
- Purpose: Get system statistics
- Output: { totalUsers, totalVehicles, occupiedSlots }
```

### 6.2 API Response Standards
- **Success Response:** `{ success: true, data: {...}, message: "..." }`
- **Error Response:** `{ success: false, message: "Error description" }`
- **HTTP Status Codes:** 200 (Success), 400 (Bad Request), 404 (Not Found), 409 (Conflict), 500 (Server Error)

---

## 🔄 7. Integration Requirements

### 7.1 Frontend-Backend Integration
- **Communication Protocol:** HTTP/HTTPS
- **Data Format:** JSON
- **Error Handling:** Graceful degradation with fallback mechanisms
- **Offline Support:** LocalStorage backup for critical operations

### 7.2 Payment Gateway Integration
- **Payment Methods:** Credit/Debit Cards, UPI, Net Banking
- **Security:** PCI DSS compliance
- **Response Handling:** Success/failure callback management

---

## 📱 8. User Interface Requirements

### 8.1 Page Structure Requirements

#### 8.1.1 Registration Page
- **Form Fields:** Name, Phone, License, Vehicle details
- **Validation:** Real-time input validation
- **Multi-vehicle Support:** Dynamic vehicle addition
- **Navigation:** Redirect to mall selection after registration

#### 8.1.2 Mall Selection Page
- **Mall Options:** Visual cards for 3 malls
- **Information Display:** Mall names and basic details
- **Navigation:** Proceed to vehicle selection

#### 8.1.3 Vehicle Selection Page
- **Vehicle List:** Display user's registered vehicles
- **Selection Interface:** Radio buttons or cards
- **Validation:** Ensure vehicle selection before proceeding

#### 8.1.4 Booking Page
- **Slot Grid:** 5x5 visual representation
- **Color Coding:** Available (green), Occupied (red), Restricted (gray)
- **Interactive Selection:** Click to select available slots
- **Booking Confirmation:** Modal or inline confirmation

#### 8.1.5 Payment Page
- **Booking Summary:** Slot details, vehicle info, charges
- **Payment Options:** Multiple payment methods
- **Processing Feedback:** Loading states and confirmations

#### 8.1.6 Admin Dashboard
- **Statistics Cards:** Key metrics display
- **User Management:** Table with user details and actions
- **Slot Monitoring:** Real-time slot status across malls
- **Manual Controls:** Admin actions for slot management

### 8.2 Responsive Design Requirements
- **Mobile First:** Design optimized for mobile devices
- **Breakpoints:** 320px, 768px, 1024px, 1440px
- **Touch Support:** Touch-friendly interface elements
- **Accessibility:** WCAG 2.1 AA compliance

---

## 🧪 9. Testing Requirements

### 9.1 Functional Testing
- **Unit Testing:** Individual function validation
- **Integration Testing:** API endpoint testing
- **User Acceptance Testing:** End-to-end user workflows
- **Cross-browser Testing:** Multiple browser compatibility

### 9.2 Performance Testing
- **Load Testing:** Multiple concurrent users
- **Stress Testing:** System limits and recovery
- **Database Performance:** Query optimization validation

### 9.3 Security Testing
- **Input Validation:** SQL injection and XSS prevention
- **Authentication Testing:** Session management validation
- **Data Protection:** Sensitive information handling

---

## 📦 10. Deployment Requirements

### 10.1 Development Environment
- **Node.js:** Version 14+ required
- **npm:** Package management
- **SQLite:** Database setup and initialization
- **Development Server:** Express.js local server

### 10.2 Production Environment
- **Web Server:** Apache/Nginx for static file serving
- **Application Server:** Node.js with PM2 process management
- **Database:** SQLite with regular backups
- **SSL Certificate:** HTTPS encryption required

### 10.3 Backup and Recovery
- **Database Backup:** Daily automated backups
- **Code Repository:** Git version control
- **Disaster Recovery:** System restoration procedures

---

## 📈 11. Maintenance Requirements

### 11.1 System Monitoring
- **Performance Monitoring:** Response time tracking
- **Error Logging:** Comprehensive error tracking
- **Usage Analytics:** User behavior analysis

### 11.2 Updates and Patches
- **Security Updates:** Regular security patch application
- **Feature Updates:** Planned feature enhancement releases
- **Bug Fixes:** Issue resolution and deployment

---

## 🎯 12. Success Criteria

### 12.1 Functional Success Metrics
- ✅ **User Registration:** 100% successful registrations with valid data
- ✅ **Slot Allocation:** 100% accurate slot allocation based on vehicle type
- ✅ **Real-time Updates:** Instant slot status synchronization
- ✅ **Payment Integration:** Successful payment processing
- ✅ **Admin Functions:** Complete administrative control

### 12.2 Performance Success Metrics
- ✅ **Response Time:** < 2 seconds for all operations
- ✅ **System Availability:** 99.5% uptime
- ✅ **User Satisfaction:** Intuitive and error-free user experience
- ✅ **Data Integrity:** Zero data loss or corruption

---

## 📋 13. Constraints and Assumptions

### 13.1 Technical Constraints
- **Browser Dependency:** Requires modern browser with JavaScript enabled
- **Internet Connectivity:** Online connection required for full functionality
- **Database Limitations:** SQLite single-user write limitations
- **Storage Capacity:** LocalStorage browser limitations

### 13.2 Business Constraints
- **Mall Capacity:** Fixed 25 slots per mall
- **Vehicle Types:** Limited to 2-Wheeler and 4-Wheeler
- **Payment Gateway:** Third-party payment processor dependency
- **Scalability:** Current architecture suitable for medium-scale deployment

### 13.3 Assumptions
- **User Device:** Users have access to modern web browsers
- **Network Stability:** Reasonable internet connectivity available
- **User Literacy:** Basic computer/smartphone operation knowledge
- **Payment Methods:** Users have access to digital payment methods

---

This comprehensive Software Requirements Specification ensures that the PARKly system meets all functional and non-functional requirements while maintaining high standards of performance, security, and usability.