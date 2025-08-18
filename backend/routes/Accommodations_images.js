const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('../middleware/multer')

const db = new sqlite3.Database('./db/db.db');

router.get('/:accommodation_id/images', (req, res, next) => {
    const { accommodation_id } = req.params;
    db.all('SELECT * FROM Accommodation_Images WHERE accommodation_id = ?', [accommodation_id], (err, rows) => {
        if (err) return responseHelper.error(res, 'Error retrieving images', 500, err.message);
        return responseHelper.success(res, rows, 'Images retrieved successfully');
    });
});
// Insert new accommodation image
router.post('/:accommodation_id/images', multer.array('images',10), (req, res, next) => {
    const { accommodation_id } = req.params;
    const images = req.files.map(file => ({
        accommodation_id: accommodation_id,
        image_url: file.path
    }));
    if (images.length === 0) {
        return responseHelper.error(res, 'No images provided', 400);
    }
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO Accommodation_Images (accommodation_id, image_url) VALUES (?, ?)');
        images.forEach(image => {
            stmt.run(image.accommodation_id, image.image_url);
        });
        stmt.finalize(err => {
            if (err) return responseHelper.error(res, 'Error inserting images', 500, err.message);
            return responseHelper.success(res, { message: 'Images uploaded successfully' }, 'Images uploaded successfully');
        });
    }); 
});

// Delete a specific image
router.delete('/:accommodation_id/images/:image_id', (req, res, next) => {
    const { accommodation_id, image_id } = req.params;
    
    // Lấy thông tin ảnh trước khi xóa
    db.get('SELECT * FROM Accommodation_Images WHERE accommodation_id = ? AND image_id = ?', 
        [accommodation_id, image_id], (err, image) => {
        if (err) return responseHelper.error(res, 'Error retrieving image', 500, err.message);
        if (!image) return responseHelper.error(res, 'Image not found', 404);
        
        // Xóa file nếu tồn tại
        let fileDeleted = false;
        try {
            if (image.image_url && !image.image_url.startsWith('http')) {
                const filePath = path.join(__dirname, '..', 'db', 'images', 'Accommodations', path.basename(image.image_url));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    fileDeleted = true;
                }
            }
        } catch (error) {
            console.error('Error deleting file:', image.image_url, error);
        }
        
        // Xóa record trong database
        db.run('DELETE FROM Accommodation_Images WHERE accommodation_id = ? AND image_id = ?', 
            [accommodation_id, image_id], function(err) {
            if (err) return responseHelper.error(res, 'Error deleting image from database', 500, err.message);
            
            return responseHelper.success(res, {
                deleted_record: this.changes > 0,
                deleted_file: fileDeleted,
                image_url: image.image_url
            }, 'Image deleted successfully');
        });
    });
});

// Delete all accommodation images in a specific accommodation and all images
router.delete('/:accommodation_id/images', (req, res, next) => {
    const { accommodation_id } = req.params;
    
    // Trước tiên lấy danh sách tất cả ảnh để xóa file
    db.all('SELECT * FROM Accommodation_Images WHERE accommodation_id = ?', [accommodation_id], (err, images) => {
        if (err) return responseHelper.error(res, 'Error retrieving images', 500, err.message);
        
        // Xóa tất cả file ảnh
        let deletedFiles = 0;
        let errorFiles = [];
        
        images.forEach(image => {
            try {
                // Kiểm tra nếu là file local (không phải URL)
                if (image.image_url && !image.image_url.startsWith('http')) {
                    const filePath = path.join(__dirname, '..', 'db', 'images', 'Accommodations', path.basename(image.image_url));
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
        
        // Xóa tất cả record trong database
        db.run('DELETE FROM Accommodation_Images WHERE accommodation_id = ?', [accommodation_id], function(err) {
            if (err) return responseHelper.error(res, 'Error deleting images from database', 500, err.message);
            
            return responseHelper.success(res, {
                deleted_records: this.changes,
                deleted_files: deletedFiles,
                error_files: errorFiles,
                total_images: images.length
            }, 'All images deleted successfully');
        });
    });
});

module.exports = router;

