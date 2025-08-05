const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Simple cookie jar to maintain session
const CookieJar = class {
  constructor() {
    this.cookies = {};
  }
  
  setCookies(headers) {
    const cookies = headers['set-cookie'];
    if (cookies) {
      cookies.forEach(cookie => {
        const [nameValue] = cookie.split(';');
        const [name, value] = nameValue.split('=');
        this.cookies[name.trim()] = value;
      });
    }
  }
  
  getCookieHeader() {
    return Object.entries(this.cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');
  }
};

async function simpleSessionTest() {
  console.log('🎯 Simple Session Authentication Test\n');
  
  const cookieJar = new CookieJar();
  
  try {
    // 1. Register
    console.log('1. 📝 Registering user...');
    try {
      const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
        full_name: 'Simple User',
        email: 'simple@test.com',
        password: 'password123'
      });
      console.log('✅', registerRes.data.message);
      cookieJar.setCookies(registerRes.headers);
    } catch (err) {
      if (err.response?.status === 409) {
        console.log('ℹ️ User already exists');
      }
    }
    
    // 2. Login
    console.log('\n2. 🔐 Logging in...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'simple@test.com',
      password: 'password123'
    });
    console.log('✅', loginRes.data.message);
    console.log('👤 User:', loginRes.data.user);
    cookieJar.setCookies(loginRes.headers);
    
    // 3. Check session
    console.log('\n3. 🍪 Checking session...');
    const meRes = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Cookie: cookieJar.getCookieHeader() }
    });
    console.log('✅ Session active:', meRes.data.user);
    
    // 4. Create booking (protected)
    console.log('\n4. 📅 Creating booking (requires auth)...');
    const bookingRes = await axios.post(`${BASE_URL}/bookings`, {
      accommodation_id: 1,
      room_id: 101,
      check_in_date: '2025-12-01',
      check_out_date: '2025-12-05',
      total_price: 400
    }, {
      headers: { Cookie: cookieJar.getCookieHeader() }
    });
    console.log('✅', bookingRes.data.message);
    
    // 5. Logout
    console.log('\n5. 🚪 Logging out...');
    const logoutRes = await axios.post(`${BASE_URL}/auth/logout`, {}, {
      headers: { Cookie: cookieJar.getCookieHeader() }
    });
    console.log('✅', logoutRes.data.message);
    
    // 6. Try to access protected route (should fail)
    console.log('\n6. 🚫 Trying protected route after logout...');
    try {
      await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Cookie: cookieJar.getCookieHeader() }
      });
      console.log('❌ This should have failed!');
    } catch (err) {
      console.log('✅ Correctly blocked:', err.response.data.error);
    }
    
    console.log('\n🎉 Simple session test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

simpleSessionTest();
