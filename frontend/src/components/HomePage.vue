<template>
  <div class="min-h-screen bg-stone-200">
    <!-- Header -->
    <header class="bg-stone-700 text-white px-4 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-stone-500 rounded-full"></div>
          <h1 class="text-xl font-bold">WeGo</h1>
        </div>
        
        <nav class="hidden md:flex items-center space-x-6">
          <a href="#" class="hover:text-stone-300">Giới thiệu</a>
          <a href="#" class="hover:text-stone-300">Đăng nhập</a>
          <a href="#" class="hover:text-stone-300">Đăng ký</a>
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-stone-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        </nav>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row gap-2">
          <div class="flex-1 bg-stone-300 px-4 py-3 rounded">
            <div class="text-sm text-stone-600">Điểm đến:</div>
            <div class="font-medium">Q1, TP. HCM</div>
          </div>
          <div class="flex-1 bg-stone-300 px-4 py-3 rounded">
            <div class="text-sm text-stone-600">Nhận phòng:</div>
            <div class="font-medium">dd/mm/yyyy</div>
          </div>
          <div class="flex-1 bg-stone-300 px-4 py-3 rounded">
            <div class="text-sm text-stone-600">Trả phòng:</div>
            <div class="font-medium">dd/mm/yyyy</div>
          </div>
          <button class="bg-stone-700 text-white px-6 py-3 rounded hover:bg-stone-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button class="bg-stone-700 text-white px-6 py-3 rounded hover:bg-stone-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Hotel -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="relative bg-stone-400 rounded-lg overflow-hidden">
        <div class="flex items-center">
          <button class="absolute left-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="w-full bg-stone-800 rounded-lg mx-12 my-8">
            <div class="flex items-center justify-center py-16">
              <svg class="w-32 h-20 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.48 3.38-.84C16.5 26.32 18.47 25 20 23.5V7L12 2z"/>
                <path d="M12 2L22 7v16.5c-1.53 1.5-3.5 2.82-5.62 3.66C15.31 26.52 14.16 26.79 13 27c-5.16-1-9-5.45-9-11V7L12 2z"/>
              </svg>
            </div>
            <div class="bg-stone-900 text-white p-4">
              <h3 class="text-lg font-medium mb-2">Khách sạn của TKin nè bà con ơi</h3>
              <div class="flex items-center text-sm text-stone-300 mb-2">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                Quận 1, TP HCM
              </div>
              <div class="text-sm text-stone-400 mb-2">123 lượt xem đánh giá</div>
              <div class="text-right">
                <span class="text-xl font-bold">Giá: 100,000 / h</span>
              </div>
            </div>
          </div>
          
          <button class="absolute right-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- City Sections -->
    <div class="max-w-7xl mx-auto px-4 pb-8">
      <div v-for="city in cities" :key="city.name" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">{{ city.name }}</h2>
        
        <div class="relative">
          <button class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-12">
            <div v-for="hotel in city.hotels" :key="hotel.id" class="bg-stone-400 rounded-lg overflow-hidden">
              <div class="bg-stone-800 p-8 flex items-center justify-center">
                <svg class="w-16 h-10 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.48 3.38-.84C16.5 26.32 18.47 25 20 23.5V7L12 2z"/>
                  <path d="M12 2L22 7v16.5c-1.53 1.5-3.5 2.82-5.62 3.66C15.31 26.52 14.16 26.79 13 27c-5.16-1-9-5.45-9-11V7L12 2z"/>
                </svg>
              </div>
              <div class="bg-stone-900 text-white p-4">
                <h3 class="font-medium mb-2">{{ hotel.name }}</h3>
                <div class="flex items-center text-sm text-stone-300 mb-1">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{ hotel.location }}
                </div>
                <div class="text-xs text-stone-400 mb-2">{{ hotel.views }} lượt xem đánh giá</div>
                <div class="text-right">
                  <span class="font-bold">{{ hotel.price }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-stone-900 text-white">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-stone-500 rounded-full"></div>
              <h3 class="text-xl font-bold">WeGo</h3>
            </div>
            <div class="flex space-x-4">
              <a href="#" class="w-8 h-8 bg-stone-700 rounded flex items-center justify-center hover:bg-stone-600">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 bg-stone-700 rounded flex items-center justify-center hover:bg-stone-600">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 bg-stone-700 rounded flex items-center justify-center hover:bg-stone-600">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599-.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Thông tin liên hệ</h4>
            <p class="text-sm text-stone-300">
              227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam
            </p>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Địa chỉ</h4>
            <p class="text-sm text-stone-300">
              Ghi chú gì đó không biết
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cities = ref([
  {
    name: 'Thành phố Hồ Chí Minh',
    hotels: [
      {
        id: 1,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 2,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 3,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 4,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Đà Nẵng',
    hotels: [
      {
        id: 5,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 6,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 7,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 8,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Huế',
    hotels: [
      {
        id: 9,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 10,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 11,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 12,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Vũng Tàu',
    hotels: [
      {
        id: 13,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 14,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 15,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      },
      {
        id: 16,
        name: 'Khách sạn của TKin nè bà con ơi',
        location: 'Quận 1, TP HCM',
        views: '123 lượt',
        price: 'Giá: 100,000 / h'
      }
    ]
  }
])
</script>

<style scoped>
/* Custom styles if needed */
</style>