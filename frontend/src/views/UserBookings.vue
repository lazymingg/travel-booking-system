<template>
  <HeaderModal />
  
  <div class="min-h-screen bg-gradient-to-br py-8">
    <div class="container mx-auto max-w-6xl">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">My Bookings</h1>
        <p class="text-gray-600">View and manage your accommodation bookings</p>
        
        <!-- Debug button for testing API -->
        <button @click="testAPI" class="btn btn-secondary mt-4">
          🔧 Test API Connection
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="loading-spinner mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading your bookings...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card max-w-lg mx-auto border-red-200 bg-red-50">
        <div class="card-body text-center">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchBookings" class="btn btn-primary">Try Again</button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!bookings || bookings.length === 0" class="text-center py-12">
        <div class="card max-w-lg mx-auto">
          <div class="card-body text-center">
            <div class="text-6xl mb-4">🏨</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
            <p class="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring accommodations!</p>
            <router-link to="/search-accommodations" class="btn btn-primary">
              Explore Accommodations
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div v-else class="space-y-6">
        <div 
          v-for="booking in bookings" 
          :key="booking.booking_id"
          class="booking-card"
        >
          <!-- Card Header with Status & Price -->
          <div class="booking-header">
            <div class="booking-title-section">
              <h3 class="booking-title">
                🏨 {{ booking.accommodation_name || `Accommodation #${booking.accommodation_id}` }}
              </h3>
              <p class="booking-subtitle">
                Booking #{{ booking.booking_id }} • Room #{{ booking.room_id }}
              </p>
            </div>
            <div class="booking-status-price">
              <div class="status-badge" :class="getStatusClass(booking.status)">
                {{ getStatusText(booking.status) }}
              </div>
              <div class="booking-price">
                <span class="price-amount">${{ booking.total_price }}</span>
                <span class="price-label">Total</span>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="booking-content">
            <!-- Stay Info Section -->
            <div class="stay-info-section">
              <div class="stay-dates">
                <div class="date-item">
                  <div class="date-icon">📅</div>
                  <div class="date-content">
                    <span class="date-label">Check-in</span>
                    <span class="date-value">{{ formatDateNice(booking.check_in_date) }}</span>
                  </div>
                </div>
                <div class="arrow-separator">→</div>
                <div class="date-item">
                  <div class="date-icon">📅</div>
                  <div class="date-content">
                    <span class="date-label">Check-out</span>
                    <span class="date-value">{{ formatDateNice(booking.check_out_date) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="stay-details">
                <div class="detail-item">
                  <span class="detail-icon">🌙</span>
                  <span class="detail-text">{{ calculateNights(booking.check_in_date, booking.check_out_date) }} nights</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">👥</span>
                  <span class="detail-text">{{ booking.number_guest }} guests</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📅</span>
                  <span class="detail-text">Booked on {{ formatDateSimple(booking.booking_date) }}</span>
                </div>
              </div>
            </div>

            <!-- Special Requests -->
            <div v-if="booking.special_requests" class="special-requests">
              <div class="special-requests-header">
                <span class="special-icon">💬</span>
                <span class="special-title">Special Requests</span>
              </div>
              <p class="special-content">{{ booking.special_requests }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="booking-actions">
            <button 
              @click="viewAccommodation(booking.accommodation_id)"
              class="btn btn-outline"
            >
              <span>🏠</span>
              View Accommodation
            </button>
            <button 
              v-if="canCancel(booking.status)"
              @click="cancelBooking(booking.booking_id)"
              class="btn btn-danger"
            >
              <span>❌</span>
              Cancel Booking
            </button>
            <button 
              v-if="canReview(booking.status)"
              @click="writeReview(booking.accommodation_id)"
              class="btn btn-primary"
            >
              <span>⭐</span>
              Write Review
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterModal />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import api from '@/frontend-api-helper.js'
import { useError } from '@/composables/useError.js'

const router = useRouter()
const { handleApiError } = useError()

const bookings = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch user bookings
const fetchBookings = async () => {
  try {
    loading.value = true
    error.value = null
    
    const result = await api.get('/users/bookings')
    
    if (result.success) {
      bookings.value = result.data || []
      
      // Fetch accommodation details for each booking
      for (const booking of bookings.value) {
        if (booking.accommodation_id) {
          try {
            const accommodationResult = await api.get(`/accommodations/${booking.accommodation_id}`)
            if (accommodationResult.success) {
              booking.accommodation_name = accommodationResult.data.name
              booking.accommodation_address = accommodationResult.data.address
            }
          } catch (err) {
            console.warn('Failed to fetch accommodation details:', err)
          }
        }
      }
    } else {
      throw new Error(result.message || 'Failed to fetch bookings')
    }
  } catch (err) {
    console.error('Error fetching bookings:', err)
    error.value = 'Unable to load your bookings. Please try again.'
    handleApiError(err)
  } finally {
    loading.value = false
  }
}

// Date formatting functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateNice = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateSimple = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Status handling
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'status-confirmed'
    case 'pending':
      return 'status-pending'
    case 'cancelled':
      return 'status-cancelled'
    case 'completed':
      return 'status-completed'
    default:
      return 'status-pending'
  }
}

const getStatusText = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'Confirmed'
    case 'pending':
      return 'Pending'
    case 'cancelled':
      return 'Cancelled'
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}

// Action handlers
const viewAccommodation = (accommodationId) => {
  if (accommodationId) {
    router.push(`/detail/${accommodationId}`)
  }
}

const canCancel = (status) => {
  return ['confirmed', 'pending'].includes(status?.toLowerCase())
}

const canReview = (status) => {
  return status?.toLowerCase() === 'completed'
}

const cancelBooking = async (bookingId) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    try {
      console.log('Attempting to cancel booking:', bookingId)
      
      // Try PUT first, then fallback to POST if needed
      let result = await api.put(`/users/bookings/${bookingId}/cancel`, {})
      
      // If PUT fails, try POST
      if (!result.success && result.status === 404) {
        console.log('PUT failed, trying POST...')
        result = await api.post(`/users/bookings/${bookingId}/cancel`, {})
      }
      
      console.log('Cancel booking result:', result)
      if (result.success) {
        alert('Booking cancelled successfully')
        fetchBookings() // Refresh the list
      } else {
        throw new Error(result.message || 'Failed to cancel booking')
      }
    } catch (err) {
      console.error('Error cancelling booking:', err)
      alert('Failed to cancel booking. Please try again.')
    }
  }
}

const writeReview = (accommodationId) => {
  // Navigate to review page or open review modal
  alert(`Review functionality for accommodation ${accommodationId} will be implemented`)
}

// Debug function to test API
const testAPI = async () => {
  try {
    console.log('Testing API connection...')
    const result = await api.get('/users/bookings')
    console.log('API Test Result:', result)
    alert(`API Test: ${result.success ? 'Success' : 'Failed'} - ${result.message}`)
  } catch (err) {
    console.error('API Test Error:', err)
    alert('API Test Failed: ' + err.message)
  }
}

// Lifecycle
onMounted(fetchBookings)
</script>

<style scoped>
/* ==========================================
   MODERN BOOKING CARDS
   ========================================== */

.booking-card {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.booking-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Header Section */
.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-6);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid var(--gray-200);
}

.booking-title-section {
  flex: 1;
}

.booking-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--gray-800);
  margin: 0 0 var(--spacing-2) 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.booking-subtitle {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  margin: 0;
  font-weight: 500;
}

.booking-status-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-3);
}

.booking-price {
  text-align: right;
}

.price-amount {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--primary-blue);
  display: block;
  line-height: 1;
}

.price-label {
  font-size: var(--font-size-xs);
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

/* Content Section */
.booking-content {
  padding: var(--spacing-6);
}

.stay-info-section {
  margin-bottom: var(--spacing-6);
}

.stay-dates {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  border: 2px solid var(--gray-100);
}

.date-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  flex: 1;
}

.date-icon {
  font-size: var(--font-size-lg);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.date-content {
  display: flex;
  flex-direction: column;
}

.date-label {
  font-size: var(--font-size-xs);
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 2px;
}

.date-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--gray-800);
}

.arrow-separator {
  font-size: var(--font-size-lg);
  color: var(--gray-400);
  font-weight: bold;
}

.stay-details {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background: white;
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
  font-size: var(--font-size-sm);
}

.detail-icon {
  font-size: var(--font-size-base);
}

.detail-text {
  color: var(--gray-700);
  font-weight: 500;
}

/* Special Requests */
.special-requests {
  background: linear-gradient(135deg, #fef3cd 0%, #fde68a 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  border: 1px solid #f59e0b;
}

.special-requests-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
}

.special-icon {
  font-size: var(--font-size-lg);
}

.special-title {
  font-weight: 600;
  color: #92400e;
  font-size: var(--font-size-sm);
}

.special-content {
  color: #92400e;
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1.5;
}

/* Actions */
.booking-actions {
  display: flex;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--gray-50);
  border-top: 1px solid var(--gray-200);
}

.btn-outline {
  background: white;
  color: var(--gray-700);
  border: 2px solid var(--gray-300);
}

.btn-outline:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
  transform: translateY(-1px);
}

/* Status badges */
.status-badge {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.status-confirmed {
  background: var(--success-green);
  color: white;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}

.status-pending {
  background: var(--warning-orange);
  color: white;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.status-cancelled {
  background: var(--error-red);
  color: white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.status-completed {
  background: var(--primary-blue);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* Animation for cards */
.booking-card {
  animation: slideUp 0.4s ease-out;
}

.booking-card:nth-child(2) {
  animation-delay: 0.1s;
}

.booking-card:nth-child(3) {
  animation-delay: 0.2s;
}

.booking-card:nth-child(4) {
  animation-delay: 0.3s;
}

/* Responsive design */
@media (max-width: 768px) {
  .booking-header {
    flex-direction: column;
    gap: var(--spacing-4);
    align-items: stretch;
  }

  .booking-status-price {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .stay-dates {
    flex-direction: column;
    gap: var(--spacing-3);
  }

  .arrow-separator {
    transform: rotate(90deg);
  }

  .stay-details {
    justify-content: center;
  }

  .booking-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .booking-header,
  .booking-content,
  .booking-actions {
    padding: var(--spacing-4);
  }

  .booking-title {
    font-size: var(--font-size-lg);
  }

  .price-amount {
    font-size: var(--font-size-xl);
  }
}
</style>
