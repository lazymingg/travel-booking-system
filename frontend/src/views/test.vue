<!-- manage all accommodation of owners -->
<template>
    <div class="test-page">
        <h1>Test Page</h1>
        <pre v-if="results">{{ JSON.stringify(results, null, 2) }}</pre>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/frontend-api-helper.js'
import { useError } from '@/composables/useError.js'

const results = ref(null)
const { handleApiError } = useError()

onMounted(async () => {
    try {
        const res = await api.get('/owners/accommodations')
        results.value = res
        console.log('owner accommodations:', res)
    } catch (err) {
        console.error('Failed fetching owner accommodations', err)
        handleApiError(err)
    }
})
</script>

<style scoped>
.test-page {
    padding: 1rem;
}
pre {
    background: #f5f7fb;
    padding: 1rem;
    border-radius: 6px;
    overflow: auto;
}
</style>