<!-- src/components/ChatComponent.vue -->
<template>
    <div>
        <input v-model="userInput" placeholder="输入您的问题..." />
        <button @click="sendMessage">发送</button>
        <p>回复：{{ response }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ModelManager } from '@/models'

const userInput = ref('')
const response = ref('')

const sendMessage = async () => {
    const model = ModelManager.getModel()
    response.value = await model.chat(userInput.value)
}
</script>
