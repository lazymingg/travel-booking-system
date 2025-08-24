<template>
  <div class="upload-container">
    <h2>Upload Hình ảnh cho Accommodation</h2>

    <!-- Nhập ID accommodation -->
    <input 
      type="number" 
      v-model="accommodationId" 
      placeholder="Nhập accommodation_id"
      class="input-id"
    />

    <!-- Chọn file -->
    <input 
      type="file" 
      multiple 
      @change="onFileChange"
    />

    <!-- Nút upload -->
    <button @click="uploadImages" :disabled="!files.length || !accommodationId">
      Upload
    </button>

    <!-- Preview ảnh -->
    <div v-if="previewUrls.length" class="preview">
      <h3>Xem trước:</h3>
      <div v-for="(url, index) in previewUrls" :key="index">
        <img :src="url" alt="preview" width="150" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const accommodationId = ref(""); // ID nhập vào
const files = ref([]);
const previewUrls = ref([]);

function onFileChange(e) {
  files.value = Array.from(e.target.files);

  // tạo preview
  previewUrls.value = files.value.map(file => URL.createObjectURL(file));
}

async function uploadImages() {
  if (!files.value.length || !accommodationId.value) {
    alert("Vui lòng nhập ID và chọn ảnh");
    return;
  }

  const formData = new FormData();
  files.value.forEach(file => {
    formData.append("images", file); // "images" phải trùng multer.array("images")
  });

  try {
    const res = await fetch(`http://localhost:3000/accommodations/${accommodationId.value}/images`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log("Upload thành công:", data);
    alert("Upload thành công!");
  } catch (err) {
    console.error("Lỗi upload:", err);
    alert("Upload thất bại!");
  }
}
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-id {
  padding: 0.5rem;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.preview img {
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
