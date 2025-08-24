# 📚 HƯỚNG DẪN SỬ DỤNG CSS TOÀN CỤC

## 🎯 Mục đích
File `global-styles.css` cung cấp một hệ thống CSS toàn cục để:
- Giảm code trùng lặp
- Đảm bảo thiết kế nhất quán
- Dễ dàng bảo trì và cập nhật
- Tăng tốc độ phát triển

## 🎨 Cách sử dụng

### 1. CSS Variables (Biến CSS)
Sử dụng các biến đã định nghĩa sẵn:

```css
/* Màu sắc */
color: var(--primary-blue);
background: var(--success-green);

/* Khoảng cách */
padding: var(--spacing-4);
margin: var(--spacing-6);

/* Border radius */
border-radius: var(--radius-lg);

/* Shadow */
box-shadow: var(--shadow-md);
```

### 2. Utility Classes (Lớp tiện ích)

#### Layout:
```html
<div class="container">...</div>
<div class="flex items-center justify-between">...</div>
<div class="flex-col gap-4">...</div>
```

#### Typography:
```html
<h1 class="text-xl font-bold text-primary">Tiêu đề</h1>
<p class="text-sm text-gray-500">Mô tả</p>
```

### 3. Button System (Hệ thống nút)

```html
<!-- Các loại nút -->
<button class="btn btn-primary">Chính</button>
<button class="btn btn-secondary">Phụ</button>
<button class="btn btn-success">Thành công</button>
<button class="btn btn-warning">Cảnh báo</button>
<button class="btn btn-danger">Nguy hiểm</button>
<button class="btn btn-owner">Chủ sở hữu</button>

<!-- Kích thước nút -->
<button class="btn btn-primary btn-sm">Nhỏ</button>
<button class="btn btn-primary">Bình thường</button>
<button class="btn btn-primary btn-lg">Lớn</button>

<!-- Nút với icon -->
<button class="btn btn-primary">
  <span class="btn-icon">📧</span>
  Gửi Email
</button>
```

### 4. Form System (Hệ thống form)

```html
<div class="form-group">
  <label class="form-label">Tên</label>
  <input type="text" class="form-input" placeholder="Nhập tên...">
</div>

<div class="form-group">
  <label class="form-label">Mô tả</label>
  <textarea class="form-input form-textarea" placeholder="Nhập mô tả..."></textarea>
</div>
```

### 5. Card System (Hệ thống thẻ)

```html
<div class="card">
  <div class="card-header">
    <h3>Tiêu đề thẻ</h3>
  </div>
  <div class="card-body">
    <p>Nội dung thẻ...</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Hành động</button>
  </div>
</div>
```

### 6. Modal System (Hệ thống modal)

```html
<div class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Tiêu đề Modal</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Nội dung modal...</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Hủy</button>
      <button class="btn btn-primary">Xác nhận</button>
    </div>
  </div>
</div>
```

### 7. Badge System (Hệ thống nhãn)

```html
<span class="badge badge-primary">Chính</span>
<span class="badge badge-success">Thành công</span>
<span class="badge badge-warning">Cảnh báo</span>
<span class="badge badge-danger">Nguy hiểm</span>
<span class="badge badge-gray">Xám</span>
```

### 8. Loading & States (Trạng thái)

```html
<!-- Loading -->
<div class="loading-state">
  <div class="loading-spinner"></div>
  <p>Đang tải...</p>
</div>

<!-- Error -->
<div class="error-state">
  <p>Có lỗi xảy ra!</p>
</div>

<!-- Empty -->
<div class="empty-state">
  <p>Không có dữ liệu</p>
</div>
```

### 9. Action Groups (Nhóm hành động)

```html
<div class="action-group">
  <h3 class="action-group-title">Chức năng Admin</h3>
  <button class="btn btn-primary">Quản lý người dùng</button>
  <button class="btn btn-secondary">Xem báo cáo</button>
</div>
```

### 10. Profile Components (Component hồ sơ)

```html
<div class="profile-section">
  <div class="profile-header">
    <div class="avatar">A</div>
    <h2>Admin User</h2>
  </div>
  
  <div class="info-grid">
    <div class="info-item">
      <label>Tên</label>
      <div class="info-value">Nguyễn Văn A</div>
    </div>
    <div class="info-item">
      <label>Vai trò</label>
      <div class="info-value role-badge">Admin</div>
    </div>
  </div>
</div>
```

## 🔧 Ví dụ refactor component

### Trước khi sử dụng global CSS:
```vue
<template>
  <div class="custom-button-container">
    <button class="my-custom-primary-button">Click me</button>
  </div>
</template>

<style scoped>
.custom-button-container {
  display: flex;
  gap: 1rem;
}

.my-custom-primary-button {
  background: linear-gradient(135deg, #1D4ED8 0%, #3b82f6 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.my-custom-primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
```

### Sau khi sử dụng global CSS:
```vue
<template>
  <div class="flex gap-4">
    <button class="btn btn-primary">Click me</button>
  </div>
</template>

<style scoped>
/* Không cần CSS tùy chỉnh! */
</style>
```

## 📱 Responsive Design
Tất cả component đều responsive tự động trên mobile với breakpoint 768px.

## 🎨 Tùy chỉnh màu sắc
Để thay đổi màu sắc chủ đạo, chỉ cần sửa trong `:root`:

```css
:root {
  --primary-blue: #your-new-color;
  --success-green: #your-success-color;
}
```

## ⚡ Performance
- Sử dụng CSS Variables để tối ưu hiệu suất
- Animations được tối ưu với `transform` và `opacity`
- Mobile-first responsive design

## 🔄 Migration (Chuyển đổi)
1. Thay thế CSS cũ bằng utility classes
2. Sử dụng component classes có sẵn
3. Xóa CSS trùng lặp trong các component
4. Test trên mobile và desktop

Hệ thống này sẽ giúp dự án của bạn nhất quán, dễ bảo trì và phát triển nhanh hơn! 🚀
