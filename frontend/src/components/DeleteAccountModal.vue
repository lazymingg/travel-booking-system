<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content delete-modal" @click.stop>
      <div class="modal-header">
        <h3>Xác nhận xóa tài khoản</h3>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <div class="delete-content">
        <div class="warning-icon">⚠️</div>
        <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
        <p class="warning-text">Hành động này không thể hoàn tác!</p>

        <div class="delete-form">
          <label for="delete-confirm">Nhập "DELETE" để xác nhận</label>
          <input
            type="text"
            id="delete-confirm"
            v-model="deleteConfirm"
            placeholder="DELETE"
          />
        </div>
      </div>

      <div class="modal-actions">
        <button @click="closeModal" class="btn btn-secondary">
          Hủy
        </button>
        <button
          @click="deleteAccount"
          class="btn btn-danger"
          :disabled="deleteConfirm !== 'DELETE'"
        >
          Xóa tài khoản
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteAccountModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deleteConfirm: ''
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.deleteConfirm = ''
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },

    deleteAccount() {
      if (this.deleteConfirm === 'DELETE') {
        this.$emit('delete')
        this.closeModal()
      }
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

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.btn-secondary:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-border);
}

.btn-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: var(--vt-c-white);
}

.btn-danger:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.75rem rgba(255, 107, 107, 0.4);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Delete Modal Specific Styles */
.delete-modal {
  max-width: 25rem;
}

.delete-content {
  padding: 1.5rem;
  text-align: center;
}

.warning-icon {
  font-size: 3rem;
  margin-bottom: 1.25rem;
}

.delete-content p {
  margin: 0.625rem 0;
  color: var(--color-text);
}

.warning-text {
  color: #ff6b6b !important;
  font-weight: 500;
}

.delete-form {
  margin-top: 1.25rem;
  text-align: left;
}

.delete-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-heading);
}

.delete-form input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--color-background);
  color: var(--color-text);
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
  .delete-content {
    padding: 1rem;
  }

  .modal-actions {
    padding: 1rem;
  }
}
</style>
