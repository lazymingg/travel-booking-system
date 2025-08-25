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
      // console.log('API Response:', data);
      // Backend response format: { success, message, data, error }
      return {
        success: data.success,
        data: data.data,
        message: data.message,
        details: data.details || 'no details',
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Network error',
        details: 'Cant connect to server',
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

