PRAGMA foreign_keys = ON;

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number TEXT,
    address TEXT,
    role TEXT NOT NULL CHECK(role IN ('customer', 'admin', 'manager')) DEFAULT 'customer',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE Owners (
    owner_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    host_status TEXT CHECK(host_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    bank_account TEXT,
    id_card TEXT,
    business_license TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Accommodations (
    accommodation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT,
    country TEXT,
    description TEXT,
    accommodation_type TEXT NOT NULL CHECK(accommodation_type IN ('hotel', 'apartment', 'house', 'room')),
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (owner_id) REFERENCES Owners(owner_id) ON DELETE CASCADE
);

CREATE TABLE Rooms (
    accommodation_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    room_type TEXT NOT NULL,
    price_per_night REAL NOT NULL CHECK(price_per_night > 0),
    capacity INTEGER NOT NULL CHECK(capacity > 0),
    description TEXT,
    is_available INTEGER DEFAULT 1 CHECK(is_available IN (0, 1)),
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (accommodation_id, room_id),
    FOREIGN KEY (accommodation_id) REFERENCES Accommodations(accommodation_id) ON DELETE CASCADE
);

CREATE TABLE Bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    accommodation_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    owner_id INTEGER,
    check_in_date TEXT NOT NULL,
    check_out_date TEXT NOT NULL,
    total_price REAL NOT NULL CHECK(total_price > 0),
    status TEXT CHECK(status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (accommodation_id, room_id) REFERENCES Rooms(accommodation_id, room_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES Owners(owner_id) ON DELETE SET NULL
);


CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    amount REAL NOT NULL,
    host_amount REAL,
    payment_method TEXT NOT NULL CHECK(payment_method IN ('credit_card', 'bank_transfer', 'cash')),
    payment_status TEXT CHECK(payment_status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    payment_date TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id) ON DELETE CASCADE
);

CREATE TABLE Reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    accommodation_id INTEGER,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (accommodation_id) REFERENCES Accommodations(accommodation_id) ON DELETE CASCADE
);

CREATE TABLE Amenities (
    amenity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE Accommodation_Amenities (
    accommodation_id INTEGER,
    amenity_id INTEGER,
    PRIMARY KEY (accommodation_id, amenity_id),
    FOREIGN KEY (accommodation_id) REFERENCES Accommodations(accommodation_id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES Amenities(amenity_id) ON DELETE CASCADE
);

CREATE TABLE Accommodation_Images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    accommodation_id INTEGER,
    image_url TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (accommodation_id) REFERENCES Accommodations(accommodation_id) ON DELETE CASCADE
);

CREATE TABLE Room_Images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    accommodation_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (accommodation_id, room_id) REFERENCES Rooms(accommodation_id, room_id) ON DELETE CASCADE
);

CREATE TABLE User_Images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
