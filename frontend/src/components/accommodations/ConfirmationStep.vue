<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const data = ref(props.modelValue)

function updateData() {
  emit('update:modelValue', data.value)
}

function handleSubmit() {
  if (data.value.acceptTerms) {
    emit('submit')
  }
}
</script>

<template>
  <div class="confirmation-step">
    <div class="terms-section">
      <h3>Finally, read WeGo's terms and policies carefully to complete your room listing process.</h3>

      <div class="terms-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet dui a lectus vehicula pharetra. Etiam ut mauris id nibh bibendum cursus ac turpis scelerisque tempor sit amet at nulla. Mauris congue gravida bibendum. Donec ut lorem lacus. Vivamus vehicula id eros nec lacoreet. Pellentesque interdum lacus vel justo ultrices, a congue lacus semper. Curabitur tempus enim tristique nisl suscipit, ut tempor lorem volutpat. Donec quis lorem volutpat, posuere lobortis, velit vehicula id. Quisque ut faucibus erat, eget efficitur urna. Donec quis arcu sit amet orci facilisis maximus. Sed sed lorem eu odio efficitur et eget orci. Fusce fermentum nulla sit amet imperdiet. Duis quam ex, ornare in efficitur ac, convallis in urna. Donec ut sagittis erat. Donec sed tristique nisl suscipit, ut tempor lorem volutpat. Sed ullamcorper et lacus non ultrices. In in risus pharetra, vulputate mauris mollis, imperdiet velit.</p>

        <p>Morbi finibus orci a lorem posuere, porta tellus maximus, nascetur ridiculus mus. Morbi finibus orci a lorem posuere, porta tellus maximus, nascetur ridiculus mus. Morbi finibus orci a lorem posuere, porta tellus maximus, nascetur ridiculus mus. Nunc quis auctor urna, sed tempor lacus. Aenean ipsum est, sagittis in tempor vitae, pretium vitae enim. Duis quis elementum odio. In sagittis mauris quis mauris maximus ante magna. Praesent faucibus nibh at tortor aliquet egestas.</p>

        <p>Phasellus tellus nibh, pharetra in interdum eu, posuere in nibh. Maecenas lobortis nunc sed tellus gravida bibendum. Donec ut lorem lacus. Vivamus vehicula id eros nec lacoreet. Maecenas congue a libero in mollis. Orci tempor et venenatis pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ac erat sit amet ligula tristique lacinia sollicitudin in nisl. Sed aliquam dignissim ut elit finibus.</p>

        <p>Sed euismod rhoncus mauris, non condimentum risus congue gravida. Nullam vehicula dignissim magna ut pharetra. Ut dui ante, rutrum ac arcu non, posuere dictum nibh. Curabitur eu nibh dictum, posuere ipsum consequat, viverra. Vestibulum suscipit tincidunt eros scelerisque efficitur. Nam nulla elit, lacinia a enim non, eleifend suscipit libero. Integer eu elementum dui. Pellentesque placerat integer sed dui elementum, tristique velit non, aliquet neque. Donec ornare sapien dui, a maximus neque porttitor in eget. Pellentesque turpis felis, venenatis in hendrerit nec, ullamcorper vitae enim. Nunc nec velit risus. Fusce placerat tortor id nisl faucibus tempor. Cras laoreet fermentum faucibus. Vestibulum ac ultrices nisl.</p>
      </div>

      <div class="terms-checkbox">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="data.acceptTerms"
            @change="updateData"
          />
          I accept your terms and policies
        </label>
      </div>

      <div class="submit-section">
        <button
          @click="handleSubmit"
          :disabled="!data.acceptTerms"
          class="submit-btn"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirmation-step {
  padding: 1rem 0;
}

.terms-section h3 {
  color: #3b82f6;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 2rem 0;
  line-height: 1.5;
}

.terms-content {
  max-height: 300px;
  overflow-y: auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  margin-bottom: 1.5rem;
}

.terms-content p {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.6;
  text-align: justify;
}

.terms-content p:last-child {
  margin-bottom: 0;
}

.terms-checkbox {
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

.submit-section {
  text-align: center;
}

.submit-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}
</style>
