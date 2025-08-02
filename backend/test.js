const axios = require('axios');
async function getData() {
  try {
    const response = await axios.get('http://localhost:3000/users/1');
    console.log(response.data);  // in ra dữ liệu trả về từ server
  } catch (error) {
    console.error('Lỗi gọi API:', error);
  }
}

getData();