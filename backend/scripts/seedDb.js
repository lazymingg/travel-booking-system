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
  number_guest: 2,
  price_per_day: 100.00,
  number_bed: 1,
  description: 'Spacious room with city view',
  is_available: 1
    },
    {
      accommodation_id: 1,
  number_guest: 3,
  price_per_day: 200.00,
  number_bed: 2,
  description: 'Luxury suite with balcony',
  is_available: 1
    },
    {
      accommodation_id: 2,
  number_guest: 4,
  price_per_day: 80.00,
  number_bed: 2,
  description: 'Entire apartment with kitchen',
  is_available: 1
    }
  ];

  const amenities = [
    { amenity_id: 1, name: 'Swimming pool' },
    { amenity_id: 2, name: 'Restaurant' },
    { amenity_id: 3, name: 'Sauna' },
    { amenity_id: 4, name: 'Smoking room' },
    { amenity_id: 5, name: 'Golf course' },
    { amenity_id: 6, name: 'Parking lot' },
    { amenity_id: 7, name: 'Gym' },
    { amenity_id: 8, name: 'Free Wifi' },
    { amenity_id: 9, name: 'Spa' }
  ];

  // Insert users idempotently
  const userInsert = db.prepare(`
    INSERT OR IGNORE INTO Users (full_name, email, password_hash, phone_number, address, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  users.forEach(u => {
    userInsert.run([u.full_name, u.email, u.password_hash, u.phone_number, u.address, u.role], function(err) {
      if (err) console.error('Error inserting user', u.email, err.message);
    });
  });

  userInsert.finalize((err) => {
    if (err) console.error('Error finalizing user insert:', err.message);

    // Fetch user_id for owner (by email)
    db.get('SELECT user_id FROM Users WHERE email = ?', ['owner@hotel.com'], (err, row) => {
      if (err) {
        console.error('Error fetching owner user id:', err.message);
        db.close();
        return;
      }

      const ownerUserId = row ? row.user_id : null;
      if (!ownerUserId) {
        console.error('Owner user not found, aborting seed for owners/accommodations');
        db.close();
        return;
      }

      // Insert owner row if not exists
      db.run(`INSERT OR IGNORE INTO Owners (user_id, host_status, bank_account, id_card, business_license) VALUES (?, ?, ?, ?, ?)`,
        [ownerUserId, 'approved', '1234567890', 'ID123456789', 'BL123456789'], function(err) {
        if (err) {
          console.error('Error inserting owner:', err.message);
          db.close();
          return;
        }

        // Get owner_id from Owners
        db.get('SELECT owner_id FROM Owners WHERE user_id = ?', [ownerUserId], (err, ownerRow) => {
          if (err || !ownerRow) {
            console.error('Error fetching owner_id:', err ? err.message : 'not found');
            db.close();
            return;
          }

          const ownerId = ownerRow.owner_id;

          // Insert accommodations linked to this owner_id
          const accStmt = db.prepare(`
            INSERT OR IGNORE INTO Accommodations (owner_id, name, address, city, country, description, accommodation_type, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `);

          accommodations.forEach(acc => {
            accStmt.run([ownerId, acc.name, acc.address, acc.city, acc.country, acc.description, acc.accommodation_type, acc.status], function(err) {
              if (err) console.error('Error inserting accommodation:', err.message);
            });
          });

          accStmt.finalize((err) => {
            if (err) console.error('Error finalizing accommodations:', err.message);

            // Fetch accommodation ids by name so we can link rooms
            const accNames = accommodations.map(a => a.name);
            const accIds = {};
            let fetched = 0;
            accNames.forEach(name => {
              db.get('SELECT accommodation_id FROM Accommodations WHERE name = ?', [name], (err, accRow) => {
                fetched++;
                if (accRow) accIds[name] = accRow.accommodation_id;

                if (fetched === accNames.length) {
                  // Now insert rooms using fetched accIds
                  const roomStmt = db.prepare(`
                    INSERT INTO Rooms (accommodation_id, number_guest, price_per_day, number_bed, description, is_available)
                    VALUES (?, ?, ?, ?, ?, ?)
                  `);

                  rooms.forEach(room => {
                    const accId = accIds[accommodations[0].name];
                    // try to find matching accommodation id by index if provided
                    // If room.accommodation_id is 1/2 referencing original sample, map to correct accIds by position
                    let targetAccId = null;
                    if (room.accommodation_id === 1) targetAccId = accIds[accommodations[0].name];
                    else if (room.accommodation_id === 2) targetAccId = accIds[accommodations[1].name];
                    else targetAccId = accIds[accommodations[0].name];

                    roomStmt.run([targetAccId, room.number_guest, room.price_per_day, room.number_bed, room.description, room.is_available], function(err) {
                      if (err) console.error('Error inserting room:', err.message);
                      else console.log('Inserted room id=', this.lastID, 'for accommodation_id=', targetAccId);
                    });
                  });

                  roomStmt.finalize(() => {
                    console.log('Seeding complete');
                    // close will be handled below after main flow
                  });
                }
              });
            });
          });
        });
      });
    });
  });

  // Insert rooms (matching current Rooms schema)
  const roomStmt = db.prepare(`
    INSERT INTO Rooms (accommodation_id, number_guest, price_per_day, number_bed, description, is_available)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  rooms.forEach(room => {
    roomStmt.run([room.accommodation_id, room.number_guest, room.price_per_day, room.number_bed, room.description, room.is_available], function(err) {
      if (err) console.error('Error inserting room:', err.message);
      else console.log('Inserted room id=', this.lastID, 'for accommodation_id=', room.accommodation_id);
    });
  });
  roomStmt.finalize();

  console.log('Sample data inserted successfully');


  const amenityStmt = db.prepare(`
                        INSERT OR IGNORE INTO Amenities (amenity_id, name)
                        VALUES (?, ?)
                      `);

  amenities.forEach(a => {
    amenityStmt.run([a.amenity_id, a.name], function(err) {
      if (err) console.error('Error inserting amenity:', err.message);
      else console.log('Inserted amenity:', a.name);
    });
  });
  amenityStmt.finalize();

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
