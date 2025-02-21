<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2>DeepSeek Chat</h2>
        </div>
        <div class="chat-messages">
            <div
                v-for="(message, index) in messages"
                :key="index"
                :class="['message', message.role]"
            >
                <div
                    class="message-content"
                    v-html="renderMarkdown(message.content)"
                ></div>
                <!-- <div class="message-time">{{ message.time }}</div> -->
            </div>
        </div>
        <div class="chat-input">
            <el-input
                v-model="inputMessage"
                placeholder="Type a message..."
                @keyup.enter="sendMessage"
            />
            <el-button type="primary" @click="sendMessage">Send</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { renderMarkdown } from '@/utils/markdown'
import { ChatMessage } from '@/types'
import http from '@/utils/stream'

const messages = ref<ChatMessage[]>([])

const inputMessage = ref<string>('你好')
// 替换为你的 DeepSeek API Key
const apiKey = import.meta.env.VITE_DEEPSEEK_KEY

const sendMessage = async () => {
    if (inputMessage.value.trim() === '') return

    const userMessage: ChatMessage = {
        role: 'user',
        content: inputMessage.value,
    }
    messages.value.push(userMessage)

    const botMessage: ChatMessage = reactive({
        role: 'assistant',
        content: '',
    })
    messages.value.push(botMessage)

    try {
        const response: any = await fetch(
            'https://api.deepseek.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: messages.value.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    stream: true,
                }),
            }
        )
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n').filter((line) => line.trim() !== '')

            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const data = line.replace('data: ', '')
                    if (data === '[DONE]') break // 流式响应结束

                    const parsedData = JSON.parse(data)
                    const content = parsedData.choices[0].delta.content || ''

                    // 更新 assistantMessage 的内容
                    botMessage.content += content
                }
            }
        }
    } catch (error) {
        botMessage.content = 'Sorry, something went wrong.'
    }

    inputMessage.value = ''
}
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* max-width: 600px; */
    margin: 0 auto;
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
}

.chat-header {
    padding: 16px;
    background-color: #409eff;
    color: white;
    text-align: center;
}

.chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
}

.message {
    margin-bottom: 16px;
}

.message.user {
    text-align: right;
}

.message.assistant {
    text-align: left;
}

.message-content {
    padding: 8px 12px;
    background-color: white;
    border-radius: 8px;
    display: inline-block;
    max-width: 70%;
}

.message.user .message-content {
    /* background-color: #409eff; */
    /* color: white; */
}

.message-time {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

.chat-input {
    display: flex;
    padding: 16px;
    background-color: white;
    border-top: 1px solid #ddd;
}

.el-input {
    flex: 1;
    margin-right: 8px;
}
</style>
