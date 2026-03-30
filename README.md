# PARKly - Smart Parking Solution

PARKly is a web-based parking management system that allows users to register their vehicle details, book a parking slot, and exit the parking area.

## Features

- User registration with vehicle details
- Parking slot booking based on vehicle type
- Special slots for electric vehicles
- Exit management with slot freeing
- Vehicle search functionality
- Responsive design for all devices

## Pages

1. **index.html** - Entry point with navigation options
2. **registration.html** - Single-page registration form
3. **register.html** / **register2.html** - Two-step registration process
4. **booking.html** - Parking slot selection
5. **exit.html** - Exit management and vehicle search

## Technical Details

- Built with HTML, CSS, and JavaScript
- Uses localStorage for data persistence
- No server-side components (client-side only)
- Responsive design works on mobile and desktop

## How to Use

1. Open `index.html` in a web browser
2. Choose a registration method (single-page or step-by-step)
3. Fill in your details and vehicle information
4. Select a parking slot on the booking page
5. Use the exit page to free your slot when leaving

## Data Structure

The application uses the following data structure in localStorage:

- `currentUser`: Object containing the current user's details
- `bookedSlots`: Object containing all booked slots organized by mall and vehicle type

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Add server-side storage for persistent data
- Implement user authentication
- Add payment processing
- Implement real-time slot availability updates
- Add admin panel for management

## License

This project is licensed under the MIT License.