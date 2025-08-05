const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create database and tables
const initializeDatabase = () => {
  const dbPath = './db/db.db';
  const sqlPath = './db/querry_history/1_createdb.sql';
  
  // Ensure db directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Connected to SQLite database');
  });
  
  // Read and execute SQL file
  if (fs.existsSync(sqlPath)) {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL file by statements and execute each
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
    
    statements.forEach((statement, index) => {
      db.run(statement + ';', (err) => {
        if (err) {
          console.error(`Error executing statement ${index + 1}:`, err);
        } else {
          console.log(`Statement ${index + 1} executed successfully`);
        }
      });
    });
  } else {
    console.error('SQL file not found:', sqlPath);
  }
  
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database initialization completed');
    }
  });
};

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
