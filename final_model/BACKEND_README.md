# PARKly Backend Setup Guide

This guide will help you set up the backend server for the PARKly parking management system.

## Prerequisites

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Installation Steps

### 1. Install Dependencies

Open a terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- express (web server framework)
- sqlite3 (database)
- cors (cross-origin resource sharing)
- body-parser (request parsing)
- nodemon (development tool)

### 2. Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Verify Setup

1. Open your browser and go to `http://localhost:3000`
2. You should see the PARKly homepage
3. Test the API health check: `http://localhost:3000/api/health`

## Database

The application uses SQLite database (`parkly.db`) which will be created automatically when you first start the server.

### Database Schema

**Users Table:**
- id (Primary Key)
- name
- phone_number (Unique)
- license_number
- created_at
- updated_at

**Vehicles Table:**
- id (Primary Key)
- user_id (Foreign Key)
- vehicle_number (Unique)
- vehicle_type
- is_ev (Boolean)
- created_at

**Bookings Table:** (for future use)
- id (Primary Key)
- user_id (Foreign Key)
- vehicle_id (Foreign Key)
- mall_name
- slot_number
- booking_date
- status

## API Endpoints

### User Registration
- **POST** `/api/register`
- Body: `{ name, phoneNo, licenseNo, vehicles }`

### Get User by Phone
- **GET** `/api/user/:phoneNumber`

### Check Vehicle Registration
- **GET** `/api/vehicle/:vehicleNumber`

### Get All Users (Admin)
- **GET** `/api/users`

### Health Check
- **GET** `/api/health`

## Frontend Integration

The frontend files have been updated to work with the backend:

1. **register.html** - Now saves user data to the backend
2. **admin.html** - New admin dashboard to view registered users
3. **js/api.js** - New API helper functions

## Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin.html`

Features:
- View all registered users
- See user statistics
- View user details including vehicles
- Real-time data refresh

## Development Notes

### File Structure
```
project/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── parkly.db          # SQLite database (auto-created)
├── js/
│   ├── api.js         # API helper functions
│   └── utils.js       # Utility functions
├── css/
│   └── styles.css     # Stylesheets
├── *.html             # Frontend pages
└── admin.html         # Admin dashboard
```

### Environment Variables

You can set the following environment variables:
- `PORT` - Server port (default: 3000)

### Error Handling

The backend includes comprehensive error handling:
- Database connection errors
- Validation errors
- Duplicate registration prevention
- API error responses

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in server.js or set PORT environment variable
   - Kill existing processes using the port

2. **Database errors**
   - Delete `parkly.db` file and restart server to recreate
   - Check file permissions

3. **CORS errors**
   - Ensure the frontend is served from the same domain
   - Check CORS configuration in server.js

4. **API connection errors**
   - Verify server is running on correct port
   - Check API_BASE_URL in js/api.js

### Logs

Server logs will show:
- Database connection status
- API requests and responses
- Error messages

## Production Deployment

For production deployment:

1. Set NODE_ENV=production
2. Use a process manager like PM2
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Use environment variables for sensitive data

## Security Considerations

Current implementation is for development. For production:
- Add authentication/authorization
- Implement rate limiting
- Add input sanitization
- Use HTTPS
- Secure database access
- Add API key validation

## Support

If you encounter any issues:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Check network connectivity