/**
 * Role Hierarchy Definition
 * 
 * Hierarchy (top to bottom):
 * - Admin: Full access to everything
 * - Manager: Access to all rooms, sauna, staff areas
 * - Staff: Access to common areas, staff areas
 * - Customer (Deluxe): Access to booked room + sauna
 * - Customer (Standard): Access to booked room only
 */

const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER_DELUXE: 'customer_deluxe',
  CUSTOMER_STANDARD: 'customer_standard'
};

const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 5,
  [ROLES.MANAGER]: 4,
  [ROLES.STAFF]: 3,
  [ROLES.CUSTOMER_DELUXE]: 2,
  [ROLES.CUSTOMER_STANDARD]: 1
};

module.exports = {
  ROLES,
  ROLE_HIERARCHY
};
