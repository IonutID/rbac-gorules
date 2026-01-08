# Hotel RBAC Smart Lock System

A Role-Based Access Control (RBAC) system for hotel smart locks using Node.js, Express.js, and GoRules decision engine.

## Overview

This system simulates a hotel's smart lock access control with hierarchical roles and room-based permissions. It uses GoRules (ZEN Engine) to evaluate access decisions based on:

- User roles (Admin, Manager, Staff, Customers)
- Location types (Rooms, Sauna, Common Areas, Staff Areas, Admin Areas)
- Booking information (room assignments)
- Room types (Standard, Deluxe)

## Features

- **Hierarchical Role System**: Admin → Manager → Staff → Customer (Deluxe/Standard)
- **Smart Access Control**: GoRules-based decision engine for access evaluation
- **Room-Based Permissions**: Customers can only access their booked rooms
- **Special Access Rules**: Deluxe room customers get sauna access
- **RESTful API**: Easy-to-use endpoints for checking access
- **Mock Data**: Pre-configured users, locations, and bookings for testing

## Architecture

### Role Hierarchy

1. **Admin**: Full access to all areas
2. **Manager**: Access to all areas except admin areas
3. **Staff**: Access to common and staff areas
4. **Customer (Deluxe)**: Access to booked room + sauna + common areas
5. **Customer (Standard)**: Access to booked room + common areas

### Location Types

- **Rooms**: Individual guest rooms (101, 102, 201, 202)
- **Sauna**: Exclusive to deluxe room customers
- **Common Areas**: Lobby, Gym (accessible to all customers)
- **Staff Areas**: Staff room (staff and above)
- **Admin Areas**: Office (admin only)

## Getting Started

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IonutID/rbac-gorules.git
cd rbac-gorules

# Install dependencies
npm install
```

### Running the Server

```bash
# Start the server
npm start

# Or use nodemon for development
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Get API Info
```bash
GET /
```

### List All Users
```bash
GET /api/users
```

### List All Locations
```bash
GET /api/locations
```

### List All Bookings
```bash
GET /api/bookings
```

### Check Access (POST)
```bash
POST /api/access/check
Content-Type: application/json

{
  "userId": "user-uuid",
  "locationId": "location-uuid"
}
```

## 📁 Project Structure

```
rbac-gorules/
├── src/
|   |── db.js                    # MongoDB connect
│   ├── index.js                 # Main Express server
│   ├── models/
│   │   ├── roles.js             # Role definitions and hierarchy
│   │   ├── locations.js         # Location types
│   │   |── locationSchema.js    # Location Schema
|   |   |── userSchema.js        # User Schema
|   |   └── bookingSchema.js     # Booking Schema
|   |
│   ├── routes/
│   │   ├── access.js            # Access control endpoints
│   │   ├── users.js             # User endpoints
│   │   ├── locations.js         # Location endpoints
│   │   |── bookings.js          # Booking endpoints
|   |   └── populateRoutes       # Populate endpoints
│   ├── services/
│   │   └── accessControl.js     # GoRules integration service
│   └── rules/
│       └── access-control.json  # GoRules decision table
├── package.json
└── README.md
```

## GoRules Decision Table

The access control logic is defined in `src/rules/access-control.json` as a decision table with the following inputs:

- **role**: User's role (admin, manager, staff, customer_deluxe, customer_standard)
- **locationType**: Type of location (room, sauna, common_area, staff_area, admin_area)
- **isBookedRoom**: Boolean indicating if the location is the user's booked room
- **roomType**: Type of room booked (standard, deluxe)

The decision table evaluates these inputs and returns:
- **accessGranted**: Boolean (true/false)
- **reason**: String explaining the decision

## 🔐 Access Control Rules

| Role                | Rooms         | Sauna | Common Areas | Staff Areas | Admin Areas |
|---------------------|---------------|-------|--------------|-------------|-------------|
| Admin               |  All          |  yes  |      yes     |    yes      |     yes     |
| Manager             |  All          |  yes  |      yes     |    yes      |     yes     |
| Staff               |  No           |  No   |      yes     |    yes      |     no      |
| Customer (Deluxe)   | Booked only   |  yes  |      yes     |    no       |     no      |
| Customer (Standard) | Booked only   |  no   |      yes     |    no       |     no      |

## 🧰 Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **@gorules/zen-engine**: GoRules decision engine for business rules
- **uuid**: Unique identifier generation

## 📝 License

ISC

## 👥 Authors

IonutID

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📮 Support

For support, please open an issue in the GitHub repository.