const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const fs = require('fs');
const path = require('path');
const { requireAuth, requireOwner } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

//cấu hình Multer cho Room images
const roomsDir = path.join(__dirname, '..', 'db', 'images', 'Rooms');

// Ensure destination directory exists
if (!fs.existsSync(roomsDir)) {
  fs.mkdirSync(roomsDir, { recursive: true });
}

const roomStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, roomsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeOriginal = path.basename(file.originalname).replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${safeOriginal}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(png|jpe?g|gif|webp|bmp)$/i.test(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new Error('Only image files are allowed'));
};

const roomUpload = multer({ 
  storage: roomStorage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } 
});

const db = new sqlite3.Database('./db/db.db');

// Get all images for a specific room
router.get('/:accommodation_id/rooms/:room_id/images', (req, res, next) => {
    const { accommodation_id, room_id } = req.params;
    db.all('SELECT * FROM Room_Images WHERE accommodation_id = ? AND room_id = ?', 
        [accommodation_id, room_id], (err, rows) => {
        if (err) return responseHelper.error(res, 'Error retrieving room images', 500, err.message);
        return responseHelper.success(res, rows, 'Room images retrieved successfully');
    });
});

// Upload new room images
router.post('/:accommodation_id/rooms/:room_id/images', requireOwner, roomUpload.array('images', 10), (req, res, next) => {
    const { accommodation_id, room_id } = req.params;
    
    // Check if accommodation belongs to owner
    db.get('SELECT * FROM Accommodations WHERE accommodation_id = ? AND owner_id = ?', 
        [accommodation_id, req.session.user.owner_id], (err, accommodation) => {
        if (err) return responseHelper.error(res, 'Error checking accommodation', 500, err.message);
        if (!accommodation) {
            return responseHelper.error(res, 'Accommodation not found or does not belong to you', 404);
        }
        
        // Check if room exists
        db.get('SELECT * FROM Rooms WHERE accommodation_id = ? AND room_id = ?', 
            [accommodation_id, room_id], (err, room) => {
            if (err) return responseHelper.error(res, 'Error checking room', 500, err.message);
            if (!room) {
                return responseHelper.error(res, 'Room not found', 404);
            }
            
            const images = req.files.map(file => ({
                accommodation_id: accommodation_id,
                room_id: room_id,
                image_url: file.path
            }));
            
            if (images.length === 0) {
                return responseHelper.error(res, 'No images provided', 400);
            }
            
            db.serialize(() => {
                const stmt = db.prepare('INSERT INTO Room_Images (accommodation_id, room_id, image_url) VALUES (?, ?, ?)');
                images.forEach(image => {
                    stmt.run(image.accommodation_id, image.room_id, image.image_url);
                });
                stmt.finalize(err => {
                    if (err) return responseHelper.error(res, 'Error inserting room images', 500, err.message);
                    return responseHelper.success(res, { message: 'Room images uploaded successfully' }, 'Room images uploaded successfully');
                });
            });
        });
    });
});

// Delete a specific room image
router.delete('/:accommodation_id/rooms/:room_id/images/:image_id', requireOwner, (req, res, next) => {
    const { accommodation_id, room_id, image_id } = req.params;
    
    // Check if accommodation belongs to owner
    db.get('SELECT * FROM Accommodations WHERE accommodation_id = ? AND owner_id = ?', 
        [accommodation_id, req.session.user.owner_id], (err, accommodation) => {
        if (err) return responseHelper.error(res, 'Error checking accommodation', 500, err.message);
        if (!accommodation) {
            return responseHelper.error(res, 'Accommodation not found or does not belong to you', 404);
        }
        
        // Get image info before deleting
        db.get('SELECT * FROM Room_Images WHERE accommodation_id = ? AND room_id = ? AND image_id = ?', 
            [accommodation_id, room_id, image_id], (err, image) => {
            if (err) return responseHelper.error(res, 'Error retrieving room image', 500, err.message);
            if (!image) return responseHelper.error(res, 'Room image not found', 404);
            
            // Delete file if exists
            let fileDeleted = false;
            try {
                if (image.image_url && !image.image_url.startsWith('http')) {
                    const filePath = path.join(__dirname, '..', 'db', 'images', 'Rooms', path.basename(image.image_url));
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        fileDeleted = true;
                    }
                }
            } catch (error) {
                console.error('Error deleting file:', image.image_url, error);
            }
            
            // Delete record from database
            db.run('DELETE FROM Room_Images WHERE accommodation_id = ? AND room_id = ? AND image_id = ?', 
                [accommodation_id, room_id, image_id], function(err) {
                if (err) return responseHelper.error(res, 'Error deleting room image from database', 500, err.message);
                
                return responseHelper.success(res, {
                    deleted_record: this.changes > 0,
                    deleted_file: fileDeleted,
                    image_url: image.image_url
                }, 'Room image deleted successfully');
            });
        });
    });
});

// Delete all images for a specific room
router.delete('/:accommodation_id/rooms/:room_id/images', requireOwner, (req, res, next) => {
    const { accommodation_id, room_id } = req.params;
    
    // Check if accommodation belongs to owner
    db.get('SELECT * FROM Accommodations WHERE accommodation_id = ? AND owner_id = ?', 
        [accommodation_id, req.session.user.owner_id], (err, accommodation) => {
        if (err) return responseHelper.error(res, 'Error checking accommodation', 500, err.message);
        if (!accommodation) {
            return responseHelper.error(res, 'Accommodation not found or does not belong to you', 404);
        }
        
        // Get all images for the room
        db.all('SELECT * FROM Room_Images WHERE accommodation_id = ? AND room_id = ?', 
            [accommodation_id, room_id], (err, images) => {
            if (err) return responseHelper.error(res, 'Error retrieving room images', 500, err.message);
            
            // Delete all image files
            let deletedFiles = 0;
            let errorFiles = [];
            
            images.forEach(image => {
                try {
                    if (image.image_url && !image.image_url.startsWith('http')) {
                        const filePath = path.join(__dirname, '..', 'db', 'images', 'Rooms', path.basename(image.image_url));
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                            deletedFiles++;
                        }
                    }
                } catch (error) {
                    errorFiles.push(image.image_url);
                    console.error('Error deleting file:', image.image_url, error);
                }
            });
            
            // Delete all records from database
            db.run('DELETE FROM Room_Images WHERE accommodation_id = ? AND room_id = ?', 
                [accommodation_id, room_id], function(err) {
                if (err) return responseHelper.error(res, 'Error deleting room images from database', 500, err.message);
                
                return responseHelper.success(res, {
                    deleted_records: this.changes,
                    deleted_files: deletedFiles,
                    error_files: errorFiles,
                    total_images: images.length
                }, 'All room images deleted successfully');
            });
        });
    });
});

module.exports = router;
