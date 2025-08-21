const multer = require('multer');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'db', 'images', 'Accommodations');

// Ensure destination directory exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Preserve original extension
    const safeOriginal = path.basename(file.originalname).replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${safeOriginal}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only common image mime types
  if (/^image\/(png|jpe?g|gif|webp|bmp)$/i.test(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new Error('Only image files are allowed'));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });