// src/stores/chatStore.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
    state: () => ({
        currentModel: 'chatgpt', // 默认使用 ChatGPT
        conversation: [] as any[], // 对话记录
    }),
    actions: {
        switchModel(model) {
            this.currentModel = model
        },
        addMessage(message: any) {
            this.conversation.push(message)
        },
    },
})
