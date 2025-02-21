<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2>火山Chat</h2>
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
import http from '@/utils/tauriHttp'

const messages = ref<ChatMessage[]>([
    {
        role: 'system',
        content: '你是豆包，是由字节跳动开发的 AI 人工智能助手.',
    },
    {
        role: 'user',
        content: '常见的十字花科植物有哪些？',
    },
])

const inputMessage = ref<string>('你好')
// 替换为你的 DeepSeek API Key
const apiKey = import.meta.env.VITE_HUOSHAN_KEY

const sendMessage = async () => {
    console.log('sendMessage')

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

    var data = JSON.stringify({
        model: 'deepseek-v3-241226',
        messages: [
            {
                role: 'system',
                content: '你是豆包，是由字节跳动开发的 AI 人工智能助手.',
            },
            {
                role: 'user',
                content: '常见的十字花科植物有哪些？',
            },
        ],
    })

    const response: any = await http(
        'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: data,
        }
    )
    console.log('res----', response)
    botMessage.content = response.data.choices[0].message.content
    // 得到的响应
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

.message.system {
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
