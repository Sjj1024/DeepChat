// src/api/ModelManager.ts
import { BaseModel } from '@/models/BaseModel'
import { DeepSeekModel } from '@/models/DeepSeekModel'
import { ChatGPTModel } from '@/models/ChatGPTModel'
import { DoubaoModel } from '@/models/DoubaoModel'

const models: Record<string, BaseModel> = {
    deepseek: new DeepSeekModel(),
    chatgpt: new ChatGPTModel(),
    doubao: new DoubaoModel(),
}

/**
 * 模型管理器类，用于管理不同的AI模型。
 */
export class ModelManager {
    /**
     * 当前选中的模型
     */
    private static currentModel: BaseModel = models.deepseek

    /**
     * 设置当前选中的模型
     * @param modelKey - 模型名称
     */
    static setModel(modelKey: string) {
        if (models[modelKey]) {
            this.currentModel = models[modelKey]
        }
    }

    /**
     * 获取当前选中的模型
     * @returns 当前选中的模型
     */
    static getModel(): BaseModel {
        return this.currentModel
    }

    /**
     * 发送消息
     * @param model - 模型名称
     * @param message - 消息内容
     * @returns 回复内容
     */
    static sendMessage(model: string, message: string): Promise<string> {
        return models[model].chat(message)
    }
}
