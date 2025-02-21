<template>
    <div class="homeBox">
        <v-btn @click="toDeepSeek('deepseek')">Deepseek</v-btn>
        <v-btn @click="toDeepSeek('huoshan')">火山</v-btn>
        <v-btn @click="toDeepSeek('models')">通用模型</v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toDeepSeek = (model: any) => {
    router.push(`/${model}`)
}
</script>

<style scoped lang="scss">
.homeBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
}
</style>
