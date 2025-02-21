import axios from 'axios'

export const sendMessage = async (message: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const reply = `
**You said:**  
\`\`\`javascript
${message}
\`\`\`

**Response:**  
Here is some code:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`
`
            resolve({ data: { reply } })
        }, 1000)
    })
}
