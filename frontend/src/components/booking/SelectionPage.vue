<script setup>
import { ref } from 'vue'

import Filter from '@/components/booking/Filter.vue'
import RoomList from '@/components/booking/RoomList.vue'

const filter = ref(null)

const updateFilter = (newFilter) => {
    filter.value = newFilter
}
</script>

<template>
    <Filter @filter="updateFilter"/>
    <div id="room-list">
        <RoomList :filter="filter"/>
    </div>
</template>

<style scoped>
#room-list {
    align-items: center;
    padding: 0 8rem;
}
</style>