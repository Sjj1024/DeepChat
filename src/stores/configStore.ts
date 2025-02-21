import { defineStore } from 'pinia'

type ModelConfig = {
    apiKey: string
    baseUrl: string
    enabled: boolean
}

interface AppState {
    currentModel: 'deepseek' | 'chatgpt' | 'doubao'
    modelConfigs: Record<string, ModelConfig>
    battleModels: [string, string] | null
    compareModels: string[]
}

export const useConfigStore = defineStore('config', {
    state: (): AppState => ({
        currentModel: 'deepseek',
        modelConfigs: {},
        battleModels: null,
        compareModels: [],
    }),
    actions: {
        // 保存模型配置到本地存储
        saveConfig(modelName: string, config: ModelConfig) {
            this.modelConfigs[modelName] = config
            localStorage.setItem(
                'modelConfigs',
                JSON.stringify(this.modelConfigs)
            )
        },
        // 切换当前模型
        switchModel(model: 'deepseek' | 'chatgpt' | 'doubao') {
            this.currentModel = model
        },
    },
})
