import { Ollama } from 'ollama'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const ollama = new Ollama({
  host: 'http://localhost:11434'
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await ollama.chat({
    model: 'llama2',
    stream: true,
    messages,
  })

  // Convert Ollama's response to OpenAI-compatible stream
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({
              id: chunk.id,
              object: 'chat.completion.chunk',
              created: Date.now(),
              model: 'llama2',
              choices: [{
                index: 0,
                delta: { content: chunk.message.content },
                finish_reason: null,
              }],
            })}\n\n`
          )
        )
      }
      controller.close()
    },
  })

  return new StreamingTextResponse(OpenAIStream(stream))
}