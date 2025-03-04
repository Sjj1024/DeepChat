<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConfigStore } from './stores/configStore'

const configStore = useConfigStore()

watch(
    configStore.$state,
    (state) => {
        // 每当它发生变化时，将整个状态持久化到本地存储
        localStorage.setItem('configStore', JSON.stringify(state))
        console.log('configStore', state)
    },
    { deep: true }
)
</script>

<style scoped lang="scss"></style>
