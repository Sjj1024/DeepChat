// src/api/models/DeepSeekModel.ts
import { BaseModel } from '@/models/BaseModel'

export class DoubaoModel implements BaseModel {
    name = 'Doubao'

    /**
     * 与豆包 API进行对话
     * @param prompt - 用户输入的对话内容
     * @returns 返回豆包 API的响应内容
     */
    async chat(prompt: string): Promise<string> {
        const response = await fetch(
            'https://api.doubao.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_API_KEY',
                },
                body: JSON.stringify({ prompt }),
            }
        )
        const data = await response.json()
        return data.response
    }

    /**
     * 对传入的音频Blob进行语音识别。
     *
     * @param audioBlob - 包含音频数据的Blob对象。
     * @returns 一个Promise，当语音识别完成时解析为包含识别结果的字符串。
     */
    async transcribe(audioBlob: Blob): Promise<string> {
        // 语音识别 API 实现
        return 'DeepSeek 语音识别结果'
    }
}
