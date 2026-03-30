/**
 * API functions for communicating with the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

// API helper function
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Register new user
async function registerUser(userData) {
  return await apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

// Get user by phone number
async function getUserByPhone(phoneNumber) {
  return await apiCall(`/user/${phoneNumber}`);
}

// Check if vehicle is already registered
async function checkVehicleExists(vehicleNumber) {
  return await apiCall(`/vehicle/${vehicleNumber}`);
}

// Get all users (admin function)
async function getAllUsers() {
  return await apiCall('/users');
}

// Health check
async function checkServerHealth() {
  return await apiCall('/health');
}

// Enhanced vehicle validation with backend check
async function validateVehicleWithBackend(vehicleNo) {
  try {
    const result = await checkVehicleExists(vehicleNo);
    return {
      isValid: !result.exists,
      message: result.exists ? 
        `Vehicle ${vehicleNo} is already registered to ${result.vehicle.ownerName}` : 
        'Vehicle is available'
    };
  } catch (error) {
    console.error('Error checking vehicle:', error);
    // Fallback to local validation if backend is unavailable
    return {
      isValid: validateVehicleNumber(vehicleNo),
      message: validateVehicleNumber(vehicleNo) ? 
        'Vehicle format is valid' : 
        'Invalid vehicle number format'
    };
  }
}