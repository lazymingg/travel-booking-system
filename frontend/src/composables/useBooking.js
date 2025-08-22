import { ref, reactive } from 'vue';
import api from '@/frontend-api-helper';

export function useBooking() {
  // State
  const loading = ref(false);
  const error = ref(null);
  const selectedRoom = ref(null);
  const bookingDetails = reactive({
    accommodationId: null,
    roomId: null,
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0,
    numberOfGuests: 0
  });
  const bookingSuccess = ref(false);
  const bookingId = ref(null);

  // Set booking details
  const setBookingDetails = (details) => {
    Object.assign(bookingDetails, details);
  };

  // Select a room
  const selectRoom = (room) => {
    selectedRoom.value = room;
    bookingDetails.roomId = room.room_id;
  };

  // Create booking in backend
  const createBooking = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Validate that we have all the required information
      if (!bookingDetails.roomId || !bookingDetails.checkInDate || 
          !bookingDetails.checkOutDate || !bookingDetails.totalPrice) {
        error.value = 'Missing required booking information';
        return false;
      }

      const payload = {
        room_id: bookingDetails.roomId,
        check_in_date: bookingDetails.checkInDate,
        check_out_date: bookingDetails.checkOutDate,
        total_price: bookingDetails.totalPrice
      };

      console.log('Creating booking with payload:', payload);

      const result = await api.post(`/accommodations/${bookingDetails.accommodationId}/bookings`, payload);

      if (result.success) {
        console.log('Booking created successfully:', result.data);
        bookingSuccess.value = true;
        bookingId.value = result.data.booking_id;
        return true;
      } else {
        console.error('Failed to create booking:', result);
        error.value = result.message || 'Failed to create booking';
        return false;
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      error.value = 'Error creating booking: ' + err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Reset booking state
  const resetBooking = () => {
    selectedRoom.value = null;
    bookingSuccess.value = false;
    bookingId.value = null;
    error.value = null;
    Object.assign(bookingDetails, {
      accommodationId: null,
      roomId: null,
      checkInDate: '',
      checkOutDate: '',
      totalPrice: 0,
      numberOfGuests: 0
    });
  };

  return {
    // State
    loading,
    error,
    selectedRoom,
    bookingDetails,
    bookingSuccess,
    bookingId,
    
    // Actions
    setBookingDetails,
    selectRoom,
    createBooking,
    resetBooking
  };
}
