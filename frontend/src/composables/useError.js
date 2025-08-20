import { ref } from 'vue'

// Global error state
const showError = ref(false)
const errorMessage = ref('')
const errorDetails = ref('')

export function useError() {
  const displayError = (message, details = '') => {
    errorMessage.value = message
    errorDetails.value = details
    showError.value = true
  }

  const clearError = () => {
    showError.value = false
    errorMessage.value = ''
    errorDetails.value = ''
  }

  const handleApiError = (error) => {
    console.error('API Error:', error)

    let message = error.message || error.error || 'Có lỗi xảy ra'
    let details = error.details || JSON.stringify(error, null, 2)

    displayError(message, details)
  }

  return {
    showError,
    errorMessage,
    errorDetails,
    displayError,
    clearError,
    handleApiError
  }
}
