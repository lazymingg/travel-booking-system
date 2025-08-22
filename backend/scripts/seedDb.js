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
    },
    {
      full_name: 'Alice Smith',
      email: 'alice.smith@example.com',
      password_hash: 'hashed_password_4',
      phone_number: '+84901234567',
      address: '456 Tran Hung Dao, Da Nang, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Bob Johnson',
      email: 'bob.j@example.com',
      password_hash: 'hashed_password_5',
      phone_number: '+84902345678',
      address: '789 Le Loi, Hue, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Carol White',
      email: 'carol.w@example.com',
      password_hash: 'hashed_password_6',
      phone_number: '+84903456789',
      address: '101 Nguyen Hue, Ho Chi Minh City, Viet Nam',
      role: 'admin'
    },
    {
      full_name: 'David Green',
      email: 'david.g@example.com',
      password_hash: 'hashed_password_7',
      phone_number: '+84904567890',
      address: '202 Pham Ngu Lao, Ha Noi, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Eve Black',
      email: 'eve.b@example.com',
      password_hash: 'hashed_password_8',
      phone_number: '+84905678901',
      address: '303 Ly Thuong Kiet, Nha Trang, Viet Nam',
      role: 'manager'
    },
    {
      full_name: 'Frank Taylor',
      email: 'frank.t@example.com',
      password_hash: 'hashed_password_9',
      phone_number: '+84906789012',
      address: '404 Hai Ba Trung, Dalat, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Grace Miller',
      email: 'grace.m@example.com',
      password_hash: 'hashed_password_10',
      phone_number: '+84907890123',
      address: '505 Bach Dang, Can Tho, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Henry Wilson',
      email: 'henry.w@example.com',
      password_hash: 'hashed_password_11',
      phone_number: '+84908901234',
      address: '606 Phan Chu Trinh, Vung Tau, Viet Nam',
      role: 'admin'
    },
    {
      full_name: 'Ivy Moore',
      email: 'ivy.m@example.com',
      password_hash: 'hashed_password_12',
      phone_number: '+84909012345',
      address: '707 Cao Thang, Quy Nhon, Viet Nam',
      role: 'customer'
    },
    {
      full_name: 'Jack Davis',
      email: 'jack.d@example.com',
      password_hash: 'hashed_password_13',
      phone_number: '+84900123456',
      address: '808 Ho Xuan Huong, Mui Ne, Viet Nam',
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
    },
    {
      user_id: 6,
      host_status: 'approved',
      bank_account: '987654321',
      id_card: 'ID987654321',
      business_license: 'BL987654321'
    },
    {
      user_id: 8,
      host_status: 'approved',
      bank_account: '112233445',
      id_card: 'ID112233445',
      business_license: 'BL112233445'
    },
    {
      user_id: 11,
      host_status: 'approved',
      bank_account: '556677889',
      id_card: 'ID556677889',
      business_license: 'BL556677889'
    },
    {
      user_id: 4,
      host_status: 'pending',
      bank_account: '998877665',
      id_card: 'ID998877665',
      business_license: 'BL998877665'
    },
    {
      user_id: 5,
      host_status: 'approved',
      bank_account: '443322110',
      id_card: 'ID443322110',
      business_license: 'BL443322110'
    },
    {
      user_id: 7,
      host_status: 'pending',
      bank_account: '009988776',
      id_card: 'ID009988776',
      business_license: 'BL009988776'
    },
    {
      user_id: 9,
      host_status: 'approved',
      bank_account: '334455667',
      id_card: 'ID334455667',
      business_license: 'BL334455667'
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
    },
    {
      owner_id: 1,
      name: 'The Oriental Jade Hotel',
      address: '92-94 Hang Trong Street, Hà Nội Việt Nam',
      city: 'Ha Noi',
      country: 'Viet Nam',
      description: 'A nice hotel in middle of the capital of VietNam',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 1,
      name: 'Lotte Hotel Saigon',
      address: '2A - 4A Ton Duc Thang St, Thành phố Hồ Chí Minh Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: 'Five star hotel in the most energetic cities',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 2,
      name: 'Windsor Plaza',
      address: '18 An Dương Vương Quận 5, Thành phố Hồ Chí Minh 70000 Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: 'A Hotel can meet any of you demands',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 3,
      name: 'Sherwood Residence',
      address: '127 Phố Pasteur Quận 3, Thành phố Hồ Chí Minh 700000 Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: 'A place you can rest and endures yourself',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 4,
      name: 'Reverie Saigon',
      address: '22-36 Nguyễn Huệ 57 - 69F Đồng Khởi, Thành phố Hồ Chí Minh 700000 Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: 'Experience the most beautiful view from the top of this place',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 4,
      name: 'Hotel Majestic Saigon',
      address: '1 Dong Khoi Street, Ben Nghe Ward, District 1, Thành phố Hồ Chí Minh Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: 'Nothing can beat this place in the coast of Sai Gon',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 5,
      name: 'Fusion Original Saigon Centre',
      address: '65 Le Loi Street District 1, Thành phố Hồ Chí Minh 700000 Việt Nam',
      city: 'Ho Chi Minh City',
      country: 'Viet Nam',
      description: '5 star hotel since 1995',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 6,
      name: 'Serene Beach Resort',
      address: 'Truong Sa Street, My An Beach',
      city: 'Da Nang',
      country: 'Viet Nam',
      description: 'Nestled on the pristine sands of My An Beach, this resort offers breathtaking ocean views, luxurious amenities, and unparalleled tranquility for a perfect getaway.',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 1,
      name: 'Ancient Town Homestay',
      address: '15 Nguyen Thai Hoc, Cam Pho Ward',
      city: 'Hoi An',
      country: 'Viet Nam',
      description: 'A charming traditional homestay located in the heart of Hoi An\'s ancient town, offering an authentic cultural experience within walking distance of all major attractions.',
      accommodation_type: 'room',
      status: 'approved'
    },
    {
      owner_id: 7,
      name: 'Imperial River View Hotel',
      address: '30 Le Loi Street, Vinh Ninh Ward',
      city: 'Hue',
      country: 'Viet Nam',
      description: 'Overlooking the Perfume River, this elegant hotel provides a serene escape with panoramic views of Hue\'s historic landmarks and a blend of traditional and modern comforts.',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 2,
      name: 'Nha Trang Oceanfront Apartment',
      address: '22 Tran Phu Street, Loc Tho Ward',
      city: 'Nha Trang',
      country: 'Viet Nam',
      description: 'A spacious and modern apartment with direct access to Nha Trang beach, perfect for families or groups seeking a self-catering option with stunning sea vistas.',
      accommodation_type: 'apartment',
      status: 'approved'
    },
    {
      owner_id: 8,
      name: 'Phu Quoc Jungle Retreat',
      address: 'Cua Can Commune, North Island',
      city: 'Phu Quoc',
      country: 'Viet Nam',
      description: 'Experience nature at its finest in this secluded jungle house, offering rustic charm, private pool, and close proximity to hiking trails and untouched beaches.',
      accommodation_type: 'house',
      status: 'approved'
    },
    {
      owner_id: 3,
      name: 'Vung Tau Beachfront Villa',
      address: '100 Ha Long Street, Ward 2',
      city: 'Vung Tau',
      country: 'Viet Nam',
      description: 'A luxurious villa boasting private beach access, a large garden, and exquisite furnishings, ideal for a peaceful retreat with family and friends in Vung Tau.',
      accommodation_type: 'house',
      status: 'approved'
    },
    {
      owner_id: 6,
      name: 'Can Tho Floating Market Inn',
      address: '5 Chau Van Liem Street, Ninh Kieu District',
      city: 'Can Tho',
      country: 'Viet Nam',
      description: 'An authentic guesthouse experience near the vibrant Cai Rang Floating Market, offering comfortable rooms and a glimpse into the Mekong Delta\'s unique culture.',
      accommodation_type: 'room',
      status: 'approved'
    },
    {
      owner_id: 4,
      name: 'Ha Long Bay View Hotel',
      address: '288 Bai Chay Street, Ha Long',
      city: 'Ha Long',
      country: 'Viet Nam',
      description: 'Enjoy stunning vistas of Ha Long Bay from this conveniently located hotel. Perfect for exploring the natural wonders of the bay with ease.',
      accommodation_type: 'hotel',
      status: 'approved'
    },
    {
      owner_id: 5,
      name: 'Dalat Pine Hill Residence',
      address: '25 Tran Hung Dao, Ward 10',
      city: 'Dalat',
      country: 'Viet Nam',
      description: 'A cozy apartment nestled in the cool pine hills of Dalat, offering a peaceful atmosphere and easy access to the city\'s famous flower gardens and lakes.',
      accommodation_type: 'apartment',
      status: 'approved'
    },
    {
      owner_id: 7,
      name: 'Mui Ne Sand Dunes Bungalow',
      address: '10 Huynh Thuc Khang Street, Ham Tien',
      city: 'Phan Thiet',
      country: 'Viet Nam',
      description: 'Charming bungalows near the iconic Mui Ne sand dunes, providing a relaxed atmosphere and convenient access to kitesurfing and other beach activities.',
      accommodation_type: 'house',
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
    },
    {
      accommodation_id: 3,
      number_guest: 2,
      price_per_day: 420.00,
      number_bed: 1,
      description: 'Standard double room with city view and modern amenities.',
      is_available: 1
    },
    {
      accommodation_id: 3,
      number_guest: 4,
      price_per_day: 500.00,
      number_bed: 2,
      description: 'Family suite with two queen beds and a spacious living area.',
      is_available: 1
    },
    {
      accommodation_id: 4,
      number_guest: 2,
      price_per_day: 950.00,
      number_bed: 1,
      description: 'Deluxe king room offering panoramic city views.',
      is_available: 1
    },
    {
      accommodation_id: 4,
      number_guest: 3,
      price_per_day: 880.00,
      number_bed: 2,
      description: 'Triple room, ideal for small groups or families, with comfortable beds.',
      is_available: 1
    },
    {
      accommodation_id: 5,
      number_guest: 2,
      price_per_day: 730.00,
      number_bed: 1,
      description: 'Executive double room featuring contemporary design and ample space.',
      is_available: 1
    },
    {
      accommodation_id: 5,
      number_guest: 2,
      price_per_day: 660.00,
      number_bed: 1,
      description: 'Premium suite providing extra space, luxury furnishings, and city views.',
      is_available: 1
    },
    {
      accommodation_id: 6,
      number_guest: 3,
      price_per_day: 520.00,
      number_bed: 2,
      description: 'Two-bedroom apartment with a fully equipped kitchen and living room.',
      is_available: 1
    },
    {
      accommodation_id: 6,
      number_guest: 5,
      price_per_day: 850.00,
      number_bed: 3,
      description: 'Spacious three-bedroom residence, perfect for larger families or groups.',
      is_available: 1
    },
    {
      accommodation_id: 7,
      number_guest: 2,
      price_per_day: 900.00,
      number_bed: 1,
      description: 'Opulent king room with bespoke furnishings and stunning city skyline views.',
      is_available: 1
    },
    {
      accommodation_id: 7,
      number_guest: 2,
      price_per_day: 980.00,
      number_bed: 1,
      description: 'Grand Deluxe room featuring lavish decor and a comfortable seating area.',
      is_available: 1
    },
    {
      accommodation_id: 8,
      number_guest: 2,
      price_per_day: 880.00,
      number_bed: 1,
      description: 'Historic riverside room exuding classic French colonial charm.',
      is_available: 1
    },
    {
      accommodation_id: 8,
      number_guest: 4,
      price_per_day: 850.00,
      number_bed: 2,
      description: 'Spacious junior suite offering views overlooking the Saigon River.',
      is_available: 1
    },
    {
      accommodation_id: 9,
      number_guest: 2,
      price_per_day: 770.00,
      number_bed: 1,
      description: 'Comfortable twin room with a contemporary design and city views.',
      is_available: 1
    },
    {
      accommodation_id: 9,
      number_guest: 2,
      price_per_day: 990.00,
      number_bed: 1,
      description: 'Executive double room including access to exclusive lounge benefits.',
      is_available: 1
    },
    {
      accommodation_id: 10,
      number_guest: 2,
      price_per_day: 540.00,
      number_bed: 1,
      description: 'Ocean view bungalow with a private terrace and direct beach access.',
      is_available: 1
    },
    {
      accommodation_id: 10,
      number_guest: 4,
      price_per_day: 730.00,
      number_bed: 2,
      description: 'Family villa with garden access and two separate bedrooms for privacy.',
      is_available: 1
    },
    {
      accommodation_id: 11,
      number_guest: 2,
      price_per_day: 700.00,
      number_bed: 1,
      description: 'Cozy double room adorned with traditional Hoi An decor.',
      is_available: 1
    },
    {
      accommodation_id: 11,
      number_guest: 1,
      price_per_day: 405.00,
      number_bed: 1,
      description: 'Single room, perfect for solo travelers seeking an authentic experience.',
      is_available: 1
    },
    {
      accommodation_id: 12,
      number_guest: 2,
      price_per_day: 500.00,
      number_bed: 1,
      description: 'Standard room offering serene views of the Perfume River.',
      is_available: 1
    },
    {
      accommodation_id: 12,
      number_guest: 3,
      price_per_day: 940.00,
      number_bed: 2,
      description: 'Triple room with a spacious layout, suitable for small families.',
      is_available: 1
    },
    {
      accommodation_id: 13,
      number_guest: 4,
      price_per_day: 580.00,
      number_bed: 2,
      description: 'Two-bedroom apartment featuring a full kitchen and a balcony with sea views.',
      is_available: 1
    },
    {
      accommodation_id: 13,
      number_guest: 6,
      price_per_day: 950.00,
      number_bed: 3,
      description: 'Three-bedroom apartment, ideal for larger families or groups, facing the ocean.',
      is_available: 1
    },
    {
      accommodation_id: 14,
      number_guest: 2,
      price_per_day: 500.00,
      number_bed: 1,
      description: 'Rustic bungalow set amidst the lush jungle, offering a true nature escape.',
      is_available: 1
    },
    {
      accommodation_id: 14,
      number_guest: 4,
      price_per_day: 1600.00,
      number_bed: 2,
      description: 'Family house with two bedrooms and an outdoor living space, surrounded by greenery.',
      is_available: 1
    },
    {
      accommodation_id: 15,
      number_guest: 6,
      price_per_day: 3000.00,
      number_bed: 3,
      description: 'Luxury villa with multiple bedrooms and private pool access, perfect for relaxation.',
      is_available: 1
    },
    {
      accommodation_id: 15,
      number_guest: 8,
      price_per_day: 1400.00,
      number_bed: 4,
      description: 'Grand villa boasting stunning ocean views and ample space for a large gathering.',
      is_available: 1
    },
    {
      accommodation_id: 16,
      number_guest: 2,
      price_per_day: 500.00,
      number_bed: 1,
      description: 'Simple double room located near the river, offering local charm and comfort.',
      is_available: 1
    },
    {
      accommodation_id: 16,
      number_guest: 3,
      price_per_day: 760.00,
      number_bed: 2,
      description: 'Family room with a view of the bustling local streets, an authentic experience.',
      is_available: 1
    },
    {
      accommodation_id: 17,
      number_guest: 2,
      price_per_day: 1000.00,
      number_bed: 1,
      description: 'Bay view room with a private balcony to fully enjoy the scenic beauty.',
      is_available: 1
    },
    {
      accommodation_id: 17,
      number_guest: 4,
      price_per_day: 1090.00,
      number_bed: 2,
      description: 'Suite offering a direct, unobstructed view of the magnificent Ha Long Bay.',
      is_available: 1
    },
    {
      accommodation_id: 18,
      number_guest: 3,
      price_per_day: 720.00,
      number_bed: 2,
      description: 'Cozy apartment with a fireplace, perfect for Dalat\'s cool mountain weather.',
      is_available: 1
    },
    {
      accommodation_id: 18,
      number_guest: 2,
      price_per_day: 905.00,
      number_bed: 1,
      description: 'Studio apartment equipped with a small kitchenette, ideal for couples.',
      is_available: 1
    },
    {
      accommodation_id: 19,
      number_guest: 2,
      price_per_day: 809.00,
      number_bed: 1,
      description: 'Beachfront bungalow with easy access to the iconic Mui Ne sand dunes.',
      is_available: 1
    },
    {
      accommodation_id: 19,
      number_guest: 4,
      price_per_day: 750.00,
      number_bed: 2,
      description: 'Spacious bungalow ideal for families or groups exploring the coastal attractions.',
      is_available: 1
    },
    {
      accommodation_id: 18,
      number_guest: 6,
      price_per_day: 300.00,
      number_bed: 3,
      description: 'Luxury villa with multiple bedrooms and private pool access, perfect for relaxation.',
      is_available: 1
    },
    {
      accommodation_id: 18,
      number_guest: 8,
      price_per_day: 700.00,
      number_bed: 4,
      description: 'Grand villa boasting stunning ocean views and ample space for a large gathering.',
      is_available: 1
    },
    {
      accommodation_id: 19,
      number_guest: 6,
      price_per_day: 500.00,
      number_bed: 3,
      description: 'Luxury villa with multiple bedrooms and private pool access, perfect for relaxation.',
      is_available: 1
    },
    {
      accommodation_id: 19,
      number_guest: 8,
      price_per_day: 480.00,
      number_bed: 4,
      description: 'Grand villa boasting stunning ocean views and ample space for a large gathering.',
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

  const reviews = [
    {
      user_id: 4,
      accommodation_id: 8,
      rating: 5,
      comment: 'Absolutely loved the ocean view and serene atmosphere at Serene Beach Resort. Highly recommend!'
    },
    {
      user_id: 5,
      accommodation_id: 9,
      rating: 4,
      comment: 'Charming homestay in Hoi An. The owner was very friendly and helpful. Great location!'
    },
    {
      user_id: 7,
      accommodation_id: 10,
      rating: 5,
      comment: 'Imperial River View Hotel offered fantastic views and excellent service. A truly relaxing stay in Hue.'
    },
    {
      user_id: 9,
      accommodation_id: 11,
      rating: 4,
      comment: 'Spacious apartment with a great view of Nha Trang beach. Perfect for our family vacation.'
    },
    {
      user_id: 10,
      accommodation_id: 12,
      rating: 3,
      comment: 'A unique jungle retreat in Phu Quoc. Very peaceful, though a bit far from the main town.'
    },
    {
      user_id: 12,
      accommodation_id: 13,
      rating: 5,
      comment: 'The Vung Tau Beachfront Villa was incredibly luxurious. We enjoyed every moment of our stay.'
    },
    {
      user_id: 13,
      accommodation_id: 14,
      rating: 4,
      comment: 'Authentic experience near Cai Rang Floating Market. The inn was clean and staff were welcoming.'
    },
    {
      user_id: 4,
      accommodation_id: 15,
      rating: 5,
      comment: 'Stunning views of Ha Long Bay from the hotel room. Made our trip unforgettable.'
    },
    {
      user_id: 5,
      accommodation_id: 16,
      rating: 4,
      comment: 'Cozy apartment in Dalat. Perfect for a quiet getaway, close to attractions.'
    },
    {
      user_id: 7,
      accommodation_id: 17,
      rating: 3,
      comment: 'Nice bungalows near Mui Ne sand dunes. Good for beach activities, but amenities were basic.'
    }
  ];

  const bookings = [
    {
      user_id: 1,
      accommodation_id: 1,
      room_id: 1,
      owner_id: 1,
      check_in_date: '2025-10-01',
      check_out_date: '2025-10-03',
      total_price: 240.00,
      status: 'confirmed'
    },
    {
      user_id: 1,
      accommodation_id: 2,
      room_id: 3,
      owner_id: 1,
      check_in_date: '2025-11-10',
      check_out_date: '2025-11-14',
      total_price: 600.00,
      status: 'pending'
    },
    {
      user_id: 2,
      accommodation_id: 8,
      room_id: 15,
      owner_id: 6,
      check_in_date: '2026-01-05',
      check_out_date: '2026-01-08',
      total_price: 420.00,
      status: 'confirmed'
    },
    {
      user_id: 2,
      accommodation_id: 9,
      room_id: 18,
      owner_id: 1,
      check_in_date: '2025-12-01',
      check_out_date: '2025-12-05',
      total_price: 180.00,
      status: 'pending'
    },
    {
      user_id: 3,
      accommodation_id: 10,
      room_id: 19,
      owner_id: 7,
      check_in_date: '2025-11-20',
      check_out_date: '2025-11-22',
      total_price: 200.00,
      status: 'confirmed'
    },
    {
      user_id: 3,
      accommodation_id: 11,
      room_id: 22,
      owner_id: 2,
      check_in_date: '2026-02-10',
      check_out_date: '2026-02-17',
      total_price: 1750.00,
      status: 'pending'
    },
    {
      user_id: 4,
      accommodation_id: 12,
      room_id: 23,
      owner_id: 6,
      check_in_date: '2025-09-15',
      check_out_date: '2025-09-18',
      total_price: 270.00,
      status: 'completed'
    },
    {
      user_id: 4,
      accommodation_id: 13,
      room_id: 25,
      owner_id: 3,
      check_in_date: '2026-03-01',
      check_out_date: '2026-03-05',
      total_price: 1200.00,
      status: 'confirmed'
    },
    {
      user_id: 5,
      accommodation_id: 14,
      room_id: 27,
      owner_id: 6,
      check_in_date: '2025-10-20',
      check_out_date: '2025-10-22',
      total_price: 100.00,
      status: 'completed'
    },
    {
      user_id: 5,
      accommodation_id: 15,
      room_id: 29,
      owner_id: 4,
      check_in_date: '2026-04-10',
      check_out_date: '2026-04-13',
      total_price: 570.00,
      status: 'pending'
    }
  ];

  const payments = [
    {
      booking_id: 1,
      amount: 240.00,
      host_amount: 192.00,
      payment_method: 'credit_card',
      payment_status: 'completed',
      payment_date: '2025-09-28'
    },
    {
      booking_id: 2,
      amount: 600.00,
      host_amount: 480.00,
      payment_method: 'bank_transfer',
      payment_status: 'pending',
      payment_date: null
    },
    {
      booking_id: 3,
      amount: 420.00,
      host_amount: 336.00,
      payment_method: 'credit_card',
      payment_status: 'completed',
      payment_date: '2026-01-02'
    },
    {
      booking_id: 4,
      amount: 180.00,
      host_amount: 144.00,
      payment_method: 'cash',
      payment_status: 'pending',
      payment_date: null
    },
    {
      booking_id: 5,
      amount: 200.00,
      host_amount: 160.00,
      payment_method: 'credit_card',
      payment_status: 'completed',
      payment_date: '2025-11-18'
    },
    {
      booking_id: 6,
      amount: 1750.00,
      host_amount: 1400.00,
      payment_method: 'bank_transfer',
      payment_status: 'pending',
      payment_date: null
    },
    {
      booking_id: 7,
      amount: 270.00,
      host_amount: 216.00,
      payment_method: 'credit_card',
      payment_status: 'completed',
      payment_date: '2025-09-14'
    },
    {
      booking_id: 8,
      amount: 1200.00,
      host_amount: 960.00,
      payment_method: 'bank_transfer',
      payment_status: 'completed',
      payment_date: '2026-02-28'
    },
    {
      booking_id: 9,
      amount: 100.00,
      host_amount: 80.00,
      payment_method: 'cash',
      payment_status: 'completed',
      payment_date: '2025-10-19'
    },
    {
      booking_id: 10,
      amount: 570.00,
      host_amount: 456.00,
      payment_method: 'credit_card',
      payment_status: 'pending',
      payment_date: null
    }
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

    // Insert owners idempotently
    const ownerInsert = db.prepare(`
      INSERT OR IGNORE INTO Owners (user_id, host_status, bank_account, id_card, business_license)
      VALUES (?, ?, ?, ?, ?)
    `);

    owners.forEach(o => {
      ownerInsert.run([o.user_id, o.host_status, o.bank_account, o.id_card, o.business_license], function(err) {
        if (err) console.error('Error inserting owner for user_id', o.user_id, err.message);
      });
    });

    ownerInsert.finalize((err) => {
      if (err) console.error('Error finalizing owner insert:', err.message);

      // Fetch owner_id for each owner by user_id
      const ownerIds = {};
      let fetchedOwners = 0;
      owners.forEach((o, index) => {
        db.get('SELECT owner_id FROM Owners WHERE user_id = ?', [o.user_id], (err, row) => {
          if (err) console.error('Error fetching owner_id for user_id', o.user_id, err.message);
          if (row) ownerIds[index + 1] = row.owner_id;  // index +1 because owner_id in data is 1-based
          fetchedOwners++;
          if (fetchedOwners === owners.length) {
            // Insert accommodations linked to owner_ids
            const accStmt = db.prepare(`
              INSERT OR IGNORE INTO Accommodations (owner_id, name, address, city, country, description, accommodation_type, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);

            accommodations.forEach(acc => {
              const dataOwnerId = acc.owner_id;
              const actualOwnerId = ownerIds[dataOwnerId];
              accStmt.run([actualOwnerId, acc.name, acc.address, acc.city, acc.country, acc.description, acc.accommodation_type, acc.status], function(err) {
                if (err) console.error('Error inserting accommodation:', err.message);
              });
            });

            accStmt.finalize((err) => {
              if (err) console.error('Error finalizing accommodations:', err.message);

              // Fetch accommodation ids by name
              const accNames = accommodations.map(a => a.name);
              const accIds = {};
              let fetchedAcc = 0;
              accNames.forEach(name => {
                db.get('SELECT accommodation_id FROM Accommodations WHERE name = ?', [name], (err, accRow) => {
                  if (err) console.error('Error fetching accommodation_id for name', name, err.message);
                  if (accRow) accIds[name] = accRow.accommodation_id;
                  fetchedAcc++;
                  if (fetchedAcc === accNames.length) {
                    // Insert rooms using fetched accIds
                    const roomStmt = db.prepare(`
                      INSERT INTO Rooms (accommodation_id, number_guest, price_per_day, number_bed, description, is_available)
                      VALUES (?, ?, ?, ?, ?, ?)
                    `);

                    rooms.forEach(room => {
                      const accIndex = room.accommodation_id - 1;
                      const accName = accommodations[accIndex].name;
                      const accId = accIds[accName];
                      roomStmt.run([accId, room.number_guest, room.price_per_day, room.number_bed, room.description, room.is_available], function(err) {
                        if (err) console.error('Error inserting room:', err.message);
                        else console.log('Inserted room id=', this.lastID, 'for accommodation_id=', accId);
                      });
                    });

                    roomStmt.finalize((err) => {
                      if (err) console.error('Error finalizing rooms:', err.message);

                      // Fetch room ids by accommodation_id and description
                      const roomIds = {};
                      let fetchedRooms = 0;
                      rooms.forEach(room => {
                        const accIndex = room.accommodation_id - 1;
                        const accName = accommodations[accIndex].name;
                        const accId = accIds[accName];
                        db.get('SELECT room_id FROM Rooms WHERE accommodation_id = ? AND description = ?', [accId, room.description], (err, row) => {
                          if (err) console.error('Error fetching room_id', err.message);
                          if (row) roomIds[`${accId}_${room.description}`] = row.room_id;
                          fetchedRooms++;
                          if (fetchedRooms === rooms.length) {
                            // Insert reviews
                            const reviewStmt = db.prepare(`
                              INSERT OR IGNORE INTO Reviews (user_id, accommodation_id, rating, comment)
                              VALUES (?, ?, ?, ?)
                            `);

                            reviews.forEach(r => {
                              const accIndex = r.accommodation_id + 1;
                              const accName = accommodations[accIndex].name;
                              const accId = accIds[accName];
                              reviewStmt.run([r.user_id, accId, r.rating, r.comment], function(err) {
                                if (err) console.error('Error inserting review:', err.message);
                              });
                            });

                            reviewStmt.finalize((err) => {
                              if (err) console.error('Error finalizing reviews:', err.message);

                              // Insert bookings
                              const bookingStmt = db.prepare(`
                                INSERT OR IGNORE INTO Bookings (user_id, accommodation_id, room_id, owner_id, check_in_date, check_out_date, total_price, status)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                              `);

                              bookings.forEach(b => {
                                const accIndex = b.accommodation_id + 1;
                                const accName = accommodations[accIndex].name;
                                const accId = accIds[accName];
                                const dataOwnerId = b.owner_id;
                                const actualOwnerId = ownerIds[dataOwnerId];
                                const roomIndex = b.room_id + 2;
                                const room = rooms[roomIndex];
                                const roomKey = `${accId}_${room.description}`;
                                const roomId = roomIds[roomKey];
                                bookingStmt.run([b.user_id, accId, roomId, actualOwnerId, b.check_in_date, b.check_out_date, b.total_price, b.status], function(err) {
                                  if (err) console.error('Error inserting booking:', err.message);
                                });
                              });

                              bookingStmt.finalize((err) => {
                                if (err) console.error('Error finalizing bookings:', err.message);

                                // Fetch booking ids
                                const bookingIds = {};
                                let fetchedBookings = 0;
                                bookings.forEach(b => {
                                  const accIndex = b.accommodation_id + 1;
                                  const accName = accommodations[accIndex].name;
                                  const accId = accIds[accName];
                                  db.get('SELECT booking_id FROM Bookings WHERE user_id = ? AND accommodation_id = ? AND check_in_date = ?', [b.user_id, accId, b.check_in_date], (err, row) => {
                                    if (err) console.error('Error fetching booking_id', err.message);
                                    if (row) bookingIds[`${b.user_id}_${accId}_${b.check_in_date}`] = row.booking_id;
                                    fetchedBookings++;
                                    if (fetchedBookings === bookings.length) {
                                      // Insert payments
                                      const paymentStmt = db.prepare(`
                                        INSERT OR IGNORE INTO Payments (booking_id, amount, host_amount, payment_method, payment_status, payment_date)
                                        VALUES (?, ?, ?, ?, ?, ?)
                                      `);

                                      payments.forEach((p, index) => {
                                        const b = bookings[index];
                                        const accIndex = b.accommodation_id + 1;
                                        const accName = accommodations[accIndex].name;
                                        const accId = accIds[accName];
                                        const bookingKey = `${b.user_id}_${accId}_${b.check_in_date}`;
                                        const bookingId = bookingIds[bookingKey];
                                        paymentStmt.run([bookingId, p.amount, p.host_amount, p.payment_method, p.payment_status, p.payment_date], function(err) {
                                          if (err) console.error('Error inserting payment:', err.message);
                                        });
                                      });

                                      paymentStmt.finalize((err) => {
                                        if (err) console.error('Error finalizing payments:', err.message);
                                        console.log('Seeding complete');
                                      });
                                    }
                                  });
                                });
                              });
                            });
                          }
                        });
                      });
                    });
                  }
                });
              });
            });
          }
        });
      });
    });
  });

  // Insert amenities
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
