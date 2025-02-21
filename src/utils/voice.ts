// // utils/voice.ts
// export const recognizeSpeech = async (): Promise<string> => {
//     const recognition = new (window.SpeechRecognition ||
//         window.webkitSpeechRecognition)()
//     recognition.lang = 'zh-CN'
//     return new Promise((resolve) => {
//         recognition.onresult = (event) => {
//             resolve(event.results[0][0].transcript)
//         }
//         recognition.start()
//     })
// }

export const synthesizeSpeech = (text: string): void => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    window.speechSynthesis.speak(utterance)
}
