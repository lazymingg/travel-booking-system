// API Helper cho frontend - sử dụng với responseHelper backend
class APIHelper {
  constructor(baseURL = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        credentials: 'include', // thêm cookie
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      // Backend response format: { success, message, data, error }
      return {
        success: data.success,
        data: data.data,
        message: data.message,
        error: data.error,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Network error',
        error: error.message,
        status: 0
      };
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Export để sử dụng
export default new APIHelper();

// ============ VÍ DỤ SỬ DỤNG ============

// 1. Fetch User Info (Fixed version)
// const fetchUserInfo = async () => {
//   try {
//     loading.value = true;
//     error.value = null;

//     const result = await api.get('/users/');

//     if (result.success) {
//       // Success - data có trong result.data
//       Object.assign(userInfo, result.data);
//       console.log('Success:', result.message);
//     } else {
//       // Error - message có trong result.error hoặc result.message
//       throw new Error(result.error || result.message || 'Unknown error');
//     }

//   } catch (err) {
//     error.value = 'Không thể tải thông tin người dùng: ' + err.message;
//     if (err.message.includes('401') || result?.status === 401) {
//       router.push('/login');
//     }
//   } finally {
//     loading.value = false;
//   }
// };
