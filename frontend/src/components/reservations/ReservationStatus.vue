<template>
  <div class="reservation-status">
    <div 
      v-if="!editing"
      :class="statusClasses"
      class="status-badge"
      @click="startEdit"
    >
      <i :class="statusIcon" class="status-icon"></i>
      <span class="status-text">{{ formattedStatus }}</span>
      <i v-if="editable" class="fas fa-chevron-down edit-indicator"></i>
    </div>

    <div v-if="editing" class="status-editor">
      <select 
        v-model="selectedStatus"
        @change="updateStatus"
        @blur="cancelEdit"
        class="status-select"
        ref="statusSelect"
      >
        <option 
          v-for="option in statusOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Status History (if provided) -->
    <div v-if="showHistory && statusHistory.length" class="status-history">
      <button @click="toggleHistory" class="history-toggle">
        <i class="fas fa-history"></i>
        History
      </button>
      
      <div v-if="historyExpanded" class="history-timeline">
        <div 
          v-for="(entry, index) in statusHistory"
          :key="index"
          class="history-entry"
        >
          <div class="history-status" :class="`status-${entry.status}`">
            <i :class="getStatusIcon(entry.status)"></i>
            {{ formatStatus(entry.status) }}
          </div>
          <div class="history-date">
            {{ formatHistoryDate(entry.timestamp) }}
          </div>
          <div v-if="entry.note" class="history-note">
            {{ entry.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReservationStatus',
  props: {
    status: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    showHistory: {
      type: Boolean,
      default: false
    },
    statusHistory: {
      type: Array,
      default: () => []
    },
    allowedTransitions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  data() {
    return {
      editing: false,
      selectedStatus: this.status,
      historyExpanded: false,
      statusConfig: {
        pending: {
          label: 'Pending',
          icon: 'fas fa-clock',
          class: 'status-pending',
          color: '#f39c12'
        },
        confirmed: {
          label: 'Confirmed',
          icon: 'fas fa-check-circle',
          class: 'status-confirmed',
          color: '#27ae60'
        },
        'checked-in': {
          label: 'Checked In',
          icon: 'fas fa-sign-in-alt',
          class: 'status-checked-in',
          color: '#3498db'
        },
        'checked-out': {
          label: 'Checked Out',
          icon: 'fas fa-sign-out-alt',
          class: 'status-checked-out',
          color: '#95a5a6'
        },
        cancelled: {
          label: 'Cancelled',
          icon: 'fas fa-times-circle',
          class: 'status-cancelled',
          color: '#e74c3c'
        },
        'no-show': {
          label: 'No Show',
          icon: 'fas fa-user-times',
          class: 'status-no-show',
          color: '#8e44ad'
        }
      }
    }
  },
  computed: {
    statusClasses() {
      const config = this.statusConfig[this.status]
      return [
        'status-display',
        config?.class || 'status-unknown',
        { 'editable': this.editable }
      ]
    },
    statusIcon() {
      return this.statusConfig[this.status]?.icon || 'fas fa-question-circle'
    },
    formattedStatus() {
      return this.statusConfig[this.status]?.label || this.status
    },
    statusOptions() {
      const defaultTransitions = {
        pending: ['confirmed', 'cancelled'],
        confirmed: ['checked-in', 'no-show', 'cancelled'],
        'checked-in': ['checked-out'],
        'checked-out': [],
        cancelled: [],
        'no-show': []
      }

      const allowedNext = this.allowedTransitions.length 
        ? this.allowedTransitions 
        : defaultTransitions[this.status] || []

      return Object.entries(this.statusConfig).map(([value, config]) => ({
        value,
        label: config.label,
        disabled: value !== this.status && !allowedNext.includes(value)
      }))
    }
  },
  watch: {
    status(newStatus) {
      this.selectedStatus = newStatus
    }
  },
  methods: {
    startEdit() {
      if (!this.editable) return
      this.editing = true
      this.selectedStatus = this.status
      this.$nextTick(() => {
        if (this.$refs.statusSelect) {
          this.$refs.statusSelect.focus()
        }
      })
    },
    updateStatus() {
      if (this.selectedStatus !== this.status) {
        this.$emit('change', this.selectedStatus)
      }
      this.editing = false
    },
    cancelEdit() {
      setTimeout(() => {
        this.editing = false
        this.selectedStatus = this.status
      }, 100)
    },
    toggleHistory() {
      this.historyExpanded = !this.historyExpanded
    },
    getStatusIcon(status) {
      return this.statusConfig[status]?.icon || 'fas fa-question-circle'
    },
    formatStatus(status) {
      return this.statusConfig[status]?.label || status
    },
    formatHistoryDate(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Just now'
      if (diffInHours < 24) return `${diffInHours}h ago`
      
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays === 1) return 'Yesterday'
      if (diffInDays < 7) return `${diffInDays} days ago`
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }
}
</script>

<style scoped>
.reservation-status {
  position: relative;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  position: relative;
}

.status-badge.editable {
  cursor: pointer;
}

.status-badge.editable:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.status-icon {
  font-size: 10px;
}

.edit-indicator {
  font-size: 8px;
  margin-left: 2px;
  opacity: 0.7;
}

/* Status Editor */
.status-editor {
  display: inline-block;
}

.status-select {
  padding: 6px 12px;
  border: 2px solid #3498db;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: white;
  cursor: pointer;
  min-width: 120px;
}

.status-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Status-specific styles */
.status-pending {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
  border: 1px solid rgba(243, 156, 18, 0.3);
}

.status-confirmed {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
  border: 1px solid rgba(39, 174, 96, 0.3);
}

.status-checked-in {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border: 1px solid rgba(52, 152, 219, 0.3);
}

.status-checked-out {
  background: rgba(149, 165, 166, 0.1);
  color: #95a5a6;
  border: 1px solid rgba(149, 165, 166, 0.3);
}

.status-cancelled {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.status-no-show {
  background: rgba(142, 68, 173, 0.1);
  color: #8e44ad;
  border: 1px solid rgba(142, 68, 173, 0.3);
}

.status-unknown {
  background: rgba(127, 140, 141, 0.1);
  color: #7f8c8d;
  border: 1px solid rgba(127, 140, 141, 0.3);
}

/* History styles */
.status-history {
  margin-top: 10px;
}

.history-toggle {
  background: none;
  border: 1px solid #dee2e6;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 4px;
}

.history-toggle:hover {
  background: #f8f9fa;
}

.history-timeline {
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 11px;
}

.history-entry {
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
}

.history-entry:last-child {
  border-bottom: none;
}

.history-status {
  font-weight: 600;
  margin-bottom: 2px;
}

.history-date {
  color: #6c757d;
  font-size: 10px;
}

.history-note {
  color: #495057;
  font-style: italic;
  margin-top: 2px;
}
</style>
