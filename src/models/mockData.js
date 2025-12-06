const { ROLES } = require('./roles');
const { LOCATION_TYPES, ROOM_TYPES } = require('./locations');

/**
 * Mock database with users, locations, and bookings
 */

const users = [
  {
    id: 'user-admin-001',
    name: 'Alice Admin',
    email: 'alice@hotel.com',
    role: ROLES.ADMIN
  },
  {
    id: 'user-manager-001',
    name: 'Bob Manager',
    email: 'bob@hotel.com',
    role: ROLES.MANAGER
  },
  {
    id: 'user-staff-001',
    name: 'Charlie Staff',
    email: 'charlie@hotel.com',
    role: ROLES.STAFF
  },
  {
    id: 'user-customer-deluxe-001',
    name: 'David Customer',
    email: 'david@example.com',
    role: ROLES.CUSTOMER_DELUXE
  },
  {
    id: 'user-customer-standard-001',
    name: 'Emma Customer',
    email: 'emma@example.com',
    role: ROLES.CUSTOMER_STANDARD
  }
];

const locations = [
  // Rooms
  { id: 'room-101', name: 'Room 101', type: LOCATION_TYPES.ROOM, roomType: ROOM_TYPES.STANDARD },
  { id: 'room-102', name: 'Room 102', type: LOCATION_TYPES.ROOM, roomType: ROOM_TYPES.STANDARD },
  { id: 'room-201', name: 'Room 201', type: LOCATION_TYPES.ROOM, roomType: ROOM_TYPES.DELUXE },
  { id: 'room-202', name: 'Room 202', type: LOCATION_TYPES.ROOM, roomType: ROOM_TYPES.DELUXE },
  
  // Special areas
  { id: 'sauna-1', name: 'Sauna', type: LOCATION_TYPES.SAUNA },
  { id: 'lobby', name: 'Lobby', type: LOCATION_TYPES.COMMON_AREA },
  { id: 'gym', name: 'Gym', type: LOCATION_TYPES.COMMON_AREA },
  { id: 'staff-room', name: 'Staff Room', type: LOCATION_TYPES.STAFF_AREA },
  { id: 'office', name: 'Office', type: LOCATION_TYPES.ADMIN_AREA }
];

const bookings = [
  {
    id: 'booking-001',
    userId: 'user-customer-deluxe-001',
    roomId: 'room-201',
    roomType: ROOM_TYPES.DELUXE,
    checkIn: new Date('2025-12-01'),
    checkOut: new Date('2025-12-10')
  },
  {
    id: 'booking-002',
    userId: 'user-customer-standard-001',
    roomId: 'room-101',
    roomType: ROOM_TYPES.STANDARD,
    checkIn: new Date('2025-12-01'),
    checkOut: new Date('2025-12-08')
  }
];

module.exports = {
  users,
  locations,
  bookings,
  getUserById: (id) => users.find(u => u.id === id),
  getUserByEmail: (email) => users.find(u => u.email === email),
  getLocationById: (id) => locations.find(l => l.id === id),
  getBookingByUserId: (userId) => bookings.find(b => b.userId === userId),
  getAllUsers: () => users,
  getAllLocations: () => locations,
  getAllBookings: () => bookings
};
