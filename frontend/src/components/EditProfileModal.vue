<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Cập nhật thông tin</h3>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <form @submit.prevent="updateProfile" class="edit-form">
        <div class="form-group">
          <label for="edit-full-name">Họ và tên</label>
          <input
            type="text"
            id="edit-full-name"
            v-model="editForm.full_name"
            required
          />
        </div>

        <div class="form-group">
          <label for="edit-email">Email</label>
          <input
            type="email"
            id="edit-email"
            v-model="editForm.email"
            required
          />
        </div>

        <div class="form-group">
          <label for="edit-phone">Số điện thoại</label>
          <input
            type="tel"
            id="edit-phone"
            v-model="editForm.phone_number"
            required
          />
        </div>

        <div class="form-group">
          <label for="edit-address">Địa chỉ</label>
          <textarea
            id="edit-address"
            v-model="editForm.address"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Hủy
          </button>
          <button type="submit" class="btn btn-primary">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfileModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editForm: {
        full_name: '',
        email: '',
        phone_number: '',
        address: ''
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.initializeForm()
      }
    }
  },
  methods: {
    initializeForm() {
      this.editForm = {
        full_name: this.userInfo.full_name,
        email: this.userInfo.email,
        phone_number: this.userInfo.phone_number,
        address: this.userInfo.address
      }
    },

    closeModal() {
      this.$emit('close')
    },

    updateProfile() {
      // Emit event to parent component
      this.$emit('update', {
        ...this.editForm,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })
      this.closeModal()
    }
  }
}
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(0.3125rem);
}

.modal-content {
  background: var(--color-background);
  border-radius: 1rem;
  padding: 0;
  max-width: 31.25rem;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0.625rem 2.5rem rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  margin: 0;
  color: var(--color-heading);
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--vt-c-text-light-2);
  padding: 0;
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: var(--color-background-soft);
}

.edit-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-heading);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: var(--color-background);
  color: var(--color-text);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-border);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;
}

.btn-primary {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.btn-primary:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-border);
}

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.btn-secondary:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-border);
}

/* Responsive Design */
@media (max-width: 48rem) {
  .modal-content {
    width: 95%;
    margin: 0.625rem;
  }
}

@media (max-width: 30rem) {
  .modal-content {
    width: 98%;
    margin: 0.25rem;
  }

  .modal-header,
  .edit-form {
    padding: 1rem;
  }

  .modal-actions {
    padding: 1rem;
  }
}
</style> 