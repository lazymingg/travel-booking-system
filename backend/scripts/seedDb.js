const sqlite3 = require('sqlite3').verbose();

const seedDatabase = () => {
  const db = new sqlite3.Database('./db/db.db', (err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database for seeding');
  });

  // Sample data
  const users = [
    {
      full_name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'hashed_password_1',
      phone_number: '+1234567890',
      address: '123 Main St, City, Country',
      role: 'customer'
    },
    {
      full_name: 'Jane Smith',
      email: 'jane@example.com',
      password_hash: 'hashed_password_2',
      phone_number: '+1234567891',
      address: '456 Oak Ave, City, Country',
      role: 'customer'
    },
    {
      full_name: 'Hotel Owner',
      email: 'owner@hotel.com',
      password_hash: 'hashed_password_3',
      phone_number: '+1234567892',
      address: '789 Business St, City, Country',
      role: 'customer'
    }
  ];

  const owners = [
    {
      user_id: 3,
      host_status: 'approved',
      bank_account: '1234567890',
      id_card: 'ID123456789',
      business_license: 'BL123456789'
    }
  ];

  const accommodations = [
    {
      owner_id: 1,
      name: 'Luxury Hotel Downtown',
      address: '100 Hotel St, Downtown',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      description: 'A beautiful luxury hotel in the heart of the city',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 1,
      name: 'Cozy Apartment',
      address: '200 Apartment Rd, District 1',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      description: 'A cozy apartment perfect for couples',
      accommodation_type: 'apartment',
      status: 'approved'
    }
  ];

  const rooms = [
    {
      accommodation_id: 1,
      room_id: 101,
      room_type: 'Deluxe Room',
      price_per_day: 100.00,
      capacity: 2,
      description: 'Spacious room with city view',
      number_guests: 2,
      is_available: 1,
      available_date_start: '2025-08-01',
      available_date_end: '2025-08-31'
    },
    {
      accommodation_id: 1,
      room_id: 102,
      room_type: 'Suite',
      price_per_day: 200.00,
      capacity: 4,
      description: 'Luxury suite with balcony',
      number_guests: 3,
      is_available: 1,
      available_date_start: '2025-08-15',
      available_date_end: '2025-08-31'
    },
    {
      accommodation_id: 2,
      room_id: 1,
      room_type: 'Entire Apartment',
      price_per_day: 80.00,
      capacity: 2,
      description: 'Entire apartment with kitchen',
      number_guests: 4,
      is_available: 1,
      available_date_start: '2025-09-01',
      available_date_end: '2025-10-30'
    }
  ];

  // Insert users
  const userStmt = db.prepare(`
    INSERT INTO Users (full_name, email, password_hash, phone_number, address, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  users.forEach(user => {
    userStmt.run([user.full_name, user.email, user.password_hash, user.phone_number, user.address, user.role]);
  });
  userStmt.finalize();

  // Insert owners
  const ownerStmt = db.prepare(`
    INSERT INTO Owners (user_id, host_status, bank_account, id_card, business_license, created_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `);

  owners.forEach(owner => {
    ownerStmt.run([owner.user_id, owner.host_status, owner.bank_account, owner.id_card, owner.business_license]);
  });
  ownerStmt.finalize();

  // Insert accommodations
  const accommodationStmt = db.prepare(`
    INSERT INTO Accommodations (owner_id, name, address, city, country, description, accommodation_type, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  accommodations.forEach(acc => {
    accommodationStmt.run([acc.owner_id, acc.name, acc.address, acc.city, acc.country, acc.description, acc.accommodation_type, acc.status]);
  });
  accommodationStmt.finalize();

  // Insert rooms
  const roomStmt = db.prepare(`
    INSERT INTO Rooms (accommodation_id, room_id, room_type, price_per_day, capacity, description, number_guest, is_available, available_date_start, available_date_end, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  rooms.forEach(room => {
    roomStmt.run([room.accommodation_id, room.room_id, room.room_type, room.price_per_day, room.capacity, room.description, room.number_guests, room.is_available, room.available_date_start, room.available_date_end]);
  });
  roomStmt.finalize();

  console.log('Sample data inserted successfully');

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database seeding completed');
    }
  });
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
