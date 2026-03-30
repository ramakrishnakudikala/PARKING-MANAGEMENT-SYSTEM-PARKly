# PARKly Troubleshooting Guide

## "Registration failed: Failed to fetch" Error

This error occurs when the backend server is not running. Here's how to fix it:

### Solution 1: Start the Server Manually
1. Open Command Prompt (cmd)
2. Navigate to the project directory:
   ```
   cd "d:\Siri\Engg\SEM IV\RTP\prototype\last"
   ```
3. Start the server:
   ```
   npm start
   ```
4. Keep this command prompt window open while using the application
5. The server should show: "Server is running on http://localhost:3000"

### Solution 2: Use the Batch File (Easier)
1. Double-click on `start_server.bat` in the project folder
2. This will automatically start the server
3. Keep the window open while using the application

### How to Check if Server is Running
1. Open your web browser
2. Go to: http://localhost:3000/api/health
3. You should see: `{"success":true,"message":"Server is running","timestamp":"..."}`

### Common Issues and Solutions

#### Issue: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

#### Issue: "Cannot find module"
**Solution:** Run `npm install` in the project directory

#### Issue: Port 3000 is already in use
**Solution:** 
1. Close any other applications using port 3000
2. Or change the port in server.js (line 8): `const PORT = process.env.PORT || 3001;`

#### Issue: Database errors
**Solution:** Delete the `parkly.db` file and restart the server (it will recreate the database)

### Server Status Indicators
- ✅ **Working:** Registration forms submit successfully
- ❌ **Not Working:** "Failed to fetch" errors appear
- ⚠️ **Partial:** Some features work, others don't (check console for errors)

### Important Notes
- The server must be running BEFORE you try to register users
- Keep the server running while using the application
- If you close the command prompt, the server stops
- The database file `parkly.db` stores all user data

### Quick Test
To test if everything is working:
1. Start the server
2. Go to register.html
3. Fill in the form with test data
4. Add a vehicle (e.g., AP01AB1234)
5. Click Register
6. You should see "Registration successful!" message