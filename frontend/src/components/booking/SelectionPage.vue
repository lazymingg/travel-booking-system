<script setup>
import Filter from '@/components/booking/Filter.vue'
import RoomtList from '@/components/booking/RoomList.vue'
</script>

<template>
    <Filter/>
    <div id="room-list">
        <RoomtList/>
    </div>
</template>

<style scoped>
#room-list {
    align-items: center;
    padding: 0 8em;
}
</style>