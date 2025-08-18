<template>
  <div class="page-wrapper">
    <!-- title row -->
    <div class="section-title-row">
      <h2 class="section-title"> Manage Properties</h2>
      <div class="add-properties-btn"> + Add Properties </div>
    </div>
    <!-- status card -->
    <div class="list-status-cards-container">

      <div class="status-card-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home h-8 w-8 text-blue-600"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <div class="status-card-text-container">
          <p class="status-card-content-title">
            Total Properties
          </p>
          <p class="status-card-content-ammount">
            37
          </p>
        </div>
      </div>

      <div class="status-card-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-8 w-8 text-green-600"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        <div class="status-card-text-container">
          <p class="status-card-content-title">
            Total Revenue
          </p>
          <p class="status-card-content-ammount">
            10.000.000 VND
          </p>
        </div>
      </div>

      <div class="status-card-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-8 w-8 text-purple-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <div class="status-card-text-container">
          <p class="status-card-content-title">
            Total bookings
          </p>
          <p class="status-card-content-ammount">
            51
          </p>
        </div>
      </div>

      <div class="status-card-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star h-8 w-8 text-yellow-600"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <div class="status-card-text-container">
          <p class="status-card-content-title">
            Average ratings
          </p>
          <p class="status-card-content-ammount">
            4.6/5
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.list-status-cards-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
}

.status-card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 1rem;
}

.status-card-text-container {
  display: flex;
  flex-direction: column;
}

.status-card-content-title {
  font-size: 1.5rem;
}

.status-card-content-ammount {
  font-size: 1rem;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem, 1rem;
  background: #f9fafb;
  min-height: 100vh;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: #fff;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(30,64,175,0.08);
  border: 1px solid #E5E7EB;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.25rem;
}

.add-properties-btn {
  background-color: #e5e5e5;
  border-radius: 10%;
}
</style>
