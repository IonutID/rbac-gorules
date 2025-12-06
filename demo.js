#!/usr/bin/env node

/**
 * Demo Script for Hotel RBAC Smart Lock System
 * 
 * This script demonstrates various access control scenarios
 * Run after starting the server with: npm start
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Helper function to print test results
function printResult(testName, result) {
  const status = result.accessGranted ? '✅ GRANTED' : '❌ DENIED';
  console.log(`\n${testName}`);
  console.log(`   Status: ${status}`);
  console.log(`   Reason: ${result.reason}`);
  if (result.user) {
    console.log(`   User: ${result.user.name} (${result.user.role})`);
  }
  if (result.location) {
    console.log(`   Location: ${result.location.name} (${result.location.type})`);
  }
}

async function runDemo() {
  console.log('🏨 Hotel RBAC Smart Lock System - Demo\n');
  console.log('=' .repeat(60));

  try {
    // Fetch initial data
    console.log('\n📋 Fetching system data...\n');
    
    const users = await makeRequest('/api/users');
    const locations = await makeRequest('/api/locations');
    const bookings = await makeRequest('/api/bookings');

    console.log(`Users: ${users.length}`);
    users.forEach(u => console.log(`   - ${u.name} (${u.role})`));

    console.log(`\nLocations: ${locations.length}`);
    locations.forEach(l => console.log(`   - ${l.name} (${l.type})`));

    console.log(`\nBookings: ${bookings.length}`);
    bookings.forEach(b => {
      const user = users.find(u => u.id === b.userId);
      console.log(`   - ${user?.name}: ${b.roomId} (${b.roomType})`);
    });

    // Find specific users for testing
    const admin = users.find(u => u.role === 'admin');
    const manager = users.find(u => u.role === 'manager');
    const staff = users.find(u => u.role === 'staff');
    const deluxeCustomer = users.find(u => u.role === 'customer_deluxe');
    const standardCustomer = users.find(u => u.role === 'customer_standard');

    // Find specific locations
    const deluxeRoom = locations.find(l => l.id === 'room-201');
    const standardRoom = locations.find(l => l.id === 'room-101');
    const sauna = locations.find(l => l.id === 'sauna-1');
    const lobby = locations.find(l => l.id === 'lobby');
    const staffRoom = locations.find(l => l.id === 'staff-room');
    const office = locations.find(l => l.id === 'office');

    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Access Control Tests\n');

    // Test 1: Admin accessing admin area
    console.log('\n--- Test Set 1: Admin Access ---');
    let result = await makeRequest(`/api/access/test/${admin.id}/office`);
    printResult('Admin accessing Office (Admin Area)', result);

    result = await makeRequest(`/api/access/test/${admin.id}/room-101`);
    printResult('Admin accessing Room 101', result);

    // Test 2: Manager access
    console.log('\n--- Test Set 2: Manager Access ---');
    result = await makeRequest(`/api/access/test/${manager.id}/staff-room`);
    printResult('Manager accessing Staff Room', result);

    result = await makeRequest(`/api/access/test/${manager.id}/office`);
    printResult('Manager accessing Office (Admin Area)', result);

    result = await makeRequest(`/api/access/test/${manager.id}/sauna-1`);
    printResult('Manager accessing Sauna', result);

    // Test 3: Staff access
    console.log('\n--- Test Set 3: Staff Access ---');
    result = await makeRequest(`/api/access/test/${staff.id}/staff-room`);
    printResult('Staff accessing Staff Room', result);

    result = await makeRequest(`/api/access/test/${staff.id}/lobby`);
    printResult('Staff accessing Lobby (Common Area)', result);

    result = await makeRequest(`/api/access/test/${staff.id}/room-101`);
    printResult('Staff accessing Room 101', result);

    // Test 4: Deluxe customer access
    console.log('\n--- Test Set 4: Deluxe Customer Access ---');
    result = await makeRequest(`/api/access/test/${deluxeCustomer.id}/room-201`);
    printResult('Deluxe Customer accessing their booked room (201)', result);

    result = await makeRequest(`/api/access/test/${deluxeCustomer.id}/room-101`);
    printResult('Deluxe Customer accessing another room (101)', result);

    result = await makeRequest(`/api/access/test/${deluxeCustomer.id}/sauna-1`);
    printResult('Deluxe Customer accessing Sauna', result);

    result = await makeRequest(`/api/access/test/${deluxeCustomer.id}/lobby`);
    printResult('Deluxe Customer accessing Lobby', result);

    result = await makeRequest(`/api/access/test/${deluxeCustomer.id}/staff-room`);
    printResult('Deluxe Customer accessing Staff Room', result);

    // Test 5: Standard customer access
    console.log('\n--- Test Set 5: Standard Customer Access ---');
    result = await makeRequest(`/api/access/test/${standardCustomer.id}/room-101`);
    printResult('Standard Customer accessing their booked room (101)', result);

    result = await makeRequest(`/api/access/test/${standardCustomer.id}/sauna-1`);
    printResult('Standard Customer accessing Sauna', result);

    result = await makeRequest(`/api/access/test/${standardCustomer.id}/lobby`);
    printResult('Standard Customer accessing Lobby', result);

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Demo completed successfully!\n');

  } catch (error) {
    console.error('❌ Error running demo:', error.message);
    console.error('\n💡 Make sure the server is running: npm start\n');
    process.exit(1);
  }
}

// Run the demo
runDemo();
