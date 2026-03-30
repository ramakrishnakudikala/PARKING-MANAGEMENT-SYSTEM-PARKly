const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database
const db = new sqlite3.Database('./parkly.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    license_number TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Vehicles table
  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    vehicle_number TEXT UNIQUE NOT NULL,
    vehicle_type TEXT NOT NULL,
    is_ev BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Bookings table (for future use)
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    vehicle_id INTEGER,
    mall_name TEXT NOT NULL,
    slot_number TEXT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
  )`);

  console.log('Database tables initialized');
}

// API Routes

// Register new user
app.post('/api/register', (req, res) => {
  const { name, phoneNo, licenseNo, vehicles } = req.body;

  // Validate required fields
  if (!name || !phoneNo || !licenseNo || !vehicles || vehicles.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required and at least one vehicle must be provided'
    });
  }

  // Check if phone number already exists
  db.get('SELECT id FROM users WHERE phone_number = ?', [phoneNo], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Database error occurred'
      });
    }

    if (row) {
      return res.status(409).json({
        success: false,
        message: 'Phone number already registered'
      });
    }

    // Insert new user
    db.run(
      'INSERT INTO users (name, phone_number, license_number) VALUES (?, ?, ?)',
      [name, phoneNo, licenseNo],
      function(err) {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to register user'
          });
        }

        const userId = this.lastID;

        // Insert vehicles
        const vehiclePromises = vehicles.map(vehicle => {
          return new Promise((resolve, reject) => {
            db.run(
              'INSERT INTO vehicles (user_id, vehicle_number, vehicle_type, is_ev) VALUES (?, ?, ?, ?)',
              [userId, vehicle.vehicleNo, vehicle.vehicleType, vehicle.isEV ? 1 : 0],
              function(err) {
                if (err) {
                  reject(err);
                } else {
                  resolve(this.lastID);
                }
              }
            );
          });
        });

        Promise.all(vehiclePromises)
          .then(() => {
            res.json({
              success: true,
              message: 'User registered successfully',
              userId: userId
            });
          })
          .catch(err => {
            console.error('Error inserting vehicles:', err);
            res.status(500).json({
              success: false,
              message: 'User registered but failed to add some vehicles'
            });
          });
      }
    );
  });
});

// Get user by phone number
app.get('/api/user/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  db.get(
    `SELECT u.*, GROUP_CONCAT(
      v.vehicle_number || '|' || v.vehicle_type || '|' || v.is_ev
    ) as vehicles
    FROM users u
    LEFT JOIN vehicles v ON u.id = v.user_id
    WHERE u.phone_number = ?
    GROUP BY u.id`,
    [phoneNumber],
    (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error occurred'
        });
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Parse vehicles data
      const vehicles = row.vehicles ? row.vehicles.split(',').map(v => {
        const [vehicleNo, vehicleType, isEV] = v.split('|');
        return {
          vehicleNo,
          vehicleType,
          isEV: isEV === '1'
        };
      }) : [];

      res.json({
        success: true,
        user: {
          id: row.id,
          name: row.name,
          phoneNumber: row.phone_number,
          licenseNumber: row.license_number,
          vehicles: vehicles,
          createdAt: row.created_at
        }
      });
    }
  );
});

// Check if vehicle is already registered
app.get('/api/vehicle/:vehicleNumber', (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;

  db.get(
    'SELECT v.*, u.name, u.phone_number FROM vehicles v JOIN users u ON v.user_id = u.id WHERE v.vehicle_number = ?',
    [vehicleNumber],
    (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error occurred'
        });
      }

      if (row) {
        res.json({
          success: true,
          exists: true,
          vehicle: {
            vehicleNumber: row.vehicle_number,
            vehicleType: row.vehicle_type,
            isEV: row.is_ev === 1,
            ownerName: row.name,
            ownerPhone: row.phone_number
          }
        });
      } else {
        res.json({
          success: true,
          exists: false
        });
      }
    }
  );
});

// Get all users (for admin purposes)
app.get('/api/users', (req, res) => {
  db.all(
    `SELECT u.id, u.name, u.phone_number, u.license_number, u.created_at,
     COUNT(v.id) as vehicle_count
     FROM users u
     LEFT JOIN vehicles v ON u.id = v.user_id
     GROUP BY u.id
     ORDER BY u.created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error occurred'
        });
      }

      res.json({
        success: true,
        users: rows
      });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});