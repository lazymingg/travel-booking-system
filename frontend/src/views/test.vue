<!-- manage all accommodation of owners -->
<template>
    <div class="test-page">
        <h1>Test Page</h1>
        <pre v-if="results">{{ JSON.stringify(results, null, 2) }}</pre>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/frontend-api-helper.js'
import { useError } from '@/composables/useError.js'

const results = ref(null)
const { handleApiError } = useError()

onMounted(async () => {
    try {
        const res = await api.get('/users/bookings')
        results.value = res
        // for each booking, get accommodation details
        // Get single accommodation by ID with details
        // router.get('/:id(\\d+)', (req, res, next) => { the routes are in backend
//         router.get('/:id(\\d+)', (req, res, next) => {
//   const { id } = req.params;
  
//   // Get accommodation details
//   db.get(
//     `SELECT 
//       a.*,
//       (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) as avg_rating,
//       (SELECT COUNT(*) FROM Reviews WHERE accommodation_id = a.accommodation_id) as review_count,
//       (SELECT COUNT(*) FROM Rooms WHERE accommodation_id = a.accommodation_id) as room_count,
//       (SELECT MIN(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as min_price,
//       (SELECT MAX(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_price
//     FROM Accommodations a
//     WHERE a.accommodation_id = ?`, 
//     [id], 
//     (err, accommodation) => {
//       if (err) return responseHelper.error(res, 'Error retrieving accommodation', 500, err.message);
//       if (!accommodation) {
//         return responseHelper.error(res, 'Accommodation not found', 404);
//       }
      
//       // Get images
//       db.all('SELECT image_url FROM Accommodation_Images WHERE accommodation_id = ?', [id], (err, images) => {
//         if (err) return responseHelper.error(res, 'Error retrieving images', 500, err.message);
//         accommodation.images = images.map(img => img.image_url);
        
//         // Get amenities if available
//         db.all(`
//           SELECT am.amenity_id, am.name, am.description
//           FROM accommodations_amenities aa
//           JOIN Amenities am ON aa.amenity_id = am.amenity_id
//           WHERE aa.accommodation_id = ?`, 
//           [id], 
//           (err, amenities) => {
//             if (!err) {
//               accommodation.amenities = amenities;
//             } else {
//               accommodation.amenities = [];
//             }
            
//             // Get reviews
//             db.all(`
//               SELECT r.*, u.full_name as reviewer_name
//               FROM Reviews r
//               LEFT JOIN Users u ON r.user_id = u.user_id
//               WHERE r.accommodation_id = ?
//               ORDER BY r.created_at DESC
//               LIMIT 5`, 
//               [id], 
//               (err, reviews) => {
//                 if (!err) {
//                   accommodation.reviews = reviews;
//                 } else {
//                   accommodation.reviews = [];
//                 }
                
//                 return responseHelper.success(res, accommodation, 'Accommodation retrieved successfully');
//               }
//             );
//           }
//         );
//       });
//     }
//   );
// });

        console.log('Accommodation Details:', accommodationDetails)
    } catch (err) {
        console.error('Failed fetching owner accommodations', err)
        handleApiError(err)
    }
})
</script>

<style scoped>
.test-page {
    padding: 1rem;
}
pre {
    background: #f5f7fb;
    padding: 1rem;
    border-radius: 6px;
    overflow: auto;
}
</style>