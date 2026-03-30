/**
 * Utility functions for the parking application
 */

// Data structure helpers
function getSlotKey(user) {
    const mall = user.mall;
    // Create separate slot pools for each vehicle type and EV status
    if (user.isEV) {
        return `${mall}_${user.vehicleType}_EV`;
    }
    return `${mall}_${user.vehicleType}`;
}

// Validation functions
function validateVehicleNumber(vehicleNo) {
    const vehiclePattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return vehiclePattern.test(vehicleNo);
}

function validatePhoneNumber(phoneNo) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNo);
}

function validateLicenseNumber(licenseNo) {
    const licensePattern = /^[a-zA-Z0-9]+$/;
    return licensePattern.test(licenseNo) && 
           /[a-zA-Z]/.test(licenseNo) && 
           /[0-9]/.test(licenseNo);
}

// Storage helpers
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function getBookedSlots() {
    return JSON.parse(localStorage.getItem("bookedSlots")) || {};
}

function saveBookedSlots(slots) {
    localStorage.setItem("bookedSlots", JSON.stringify(slots));
}

// Check if a vehicle is already booked (local storage fallback)
function isVehicleAlreadyBooked(vehicleNo) {
    const bookedSlots = getBookedSlots();
    
    for (let mallKey in bookedSlots) {
        for (let slotId in bookedSlots[mallKey]) {
            const booking = bookedSlots[mallKey][slotId];
            // Handle both old format (string) and new format (object)
            const bookedVehicleNo = typeof booking === 'string' ? booking : booking.vehicleNo;
            if (bookedVehicleNo === vehicleNo) {
                return true;
            }
        }
    }
    
    return false;
}

// Enhanced vehicle validation that works with or without backend
async function validateVehicleAvailability(vehicleNo) {
    // First check local storage
    if (isVehicleAlreadyBooked(vehicleNo)) {
        return {
            isAvailable: false,
            message: "Vehicle is already booked in the system"
        };
    }
    
    // If backend API is available, check there too
    if (typeof checkVehicleExists === 'function') {
        try {
            const result = await checkVehicleExists(vehicleNo);
            return {
                isAvailable: !result.exists,
                message: result.exists ? 
                    `Vehicle is already registered to ${result.vehicle.ownerName}` : 
                    "Vehicle is available"
            };
        } catch (error) {
            console.warn('Backend check failed, using local validation only:', error);
        }
    }
    
    return {
        isAvailable: true,
        message: "Vehicle is available (local check only)"
    };
}

// UI helpers
function showToast(message, isError = false) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
    toast.style.color = 'white';
    toast.style.padding = '15px';
    toast.style.marginBottom = '10px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    toast.style.minWidth = '250px';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 500);
    }, 3000);
}

// Confirmation dialog
function confirmAction(message) {
    return window.confirm(message);
}

// Registered vehicles management
function getRegisteredVehicles() {
    return JSON.parse(localStorage.getItem("registeredVehicles")) || [];
}

function saveRegisteredVehicles(vehicles) {
    localStorage.setItem("registeredVehicles", JSON.stringify(vehicles));
}

function addRegisteredVehicle(vehicle) {
    const registeredVehicles = getRegisteredVehicles();
    
    // Check if vehicle already exists
    const existingIndex = registeredVehicles.findIndex(v => v.vehicleNo === vehicle.vehicleNo);
    
    if (existingIndex !== -1) {
        // Update existing vehicle
        registeredVehicles[existingIndex] = vehicle;
    } else {
        // Add new vehicle
        registeredVehicles.push(vehicle);
    }
    
    saveRegisteredVehicles(registeredVehicles);
}

function getVehicleByNumber(vehicleNo) {
    const registeredVehicles = getRegisteredVehicles();
    return registeredVehicles.find(v => v.vehicleNo === vehicleNo);
}

// Get current booking details
function getCurrentBooking() {
    return JSON.parse(localStorage.getItem("currentBooking"));
}

// Save current booking details
function saveCurrentBooking(booking) {
    localStorage.setItem("currentBooking", JSON.stringify(booking));
}

// Clear current booking
function clearCurrentBooking() {
    localStorage.removeItem("currentBooking");
}

// Check if user has an active booking
function hasActiveBooking() {
    const currentBooking = getCurrentBooking();
    return currentBooking !== null;
}

// Get booking details for a specific slot and user
function getBookingDetails(slotKey, slotNumber) {
    const bookedSlots = getBookedSlots();
    if (bookedSlots[slotKey] && bookedSlots[slotKey][slotNumber]) {
        const booking = bookedSlots[slotKey][slotNumber];
        // Handle backward compatibility - if it's just a string (vehicle number), convert to object
        if (typeof booking === 'string') {
            return {
                vehicleNo: booking,
                vehicleType: 'Unknown',
                isEV: false,
                mall: 'Unknown',
                entryTime: 'Unknown',
                slotNumber: slotNumber
            };
        }
        return booking;
    }
    return null;
}