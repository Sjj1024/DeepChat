<!-- src/components/ModelSwitcher.vue -->
<template>
    <div>
        <label>选择模型：</label>
        <select v-model="selectedModel" @change="switchModel">
            <option value="deepseek">DeepSeek</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="doubao">豆包</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ModelManager } from '@/models'

const selectedModel = ref('deepseek')

const switchModel = () => {
    ModelManager.setModel(selectedModel.value)
}
</script>
