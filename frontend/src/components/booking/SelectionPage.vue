<script setup>
import Filter from '@/components/booking/Filter.vue'
import RoomList from '@/components/booking/RoomList.vue'
</script>

<template>
    <Filter/>
    <div id="room-list">
        <RoomList/>
    </div>
</template>

<style scoped>
#room-list {
    align-items: center;
    padding: 0 8em;
}
</style>