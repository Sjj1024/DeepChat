export interface BaseModel {
    name: string
    chat(prompt: string): Promise<string>
    transcribe(audioBlob: Blob): Promise<string>
}
