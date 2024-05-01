import OpenAI from "openai";

const openai = new OpenAI({
apiKey: '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'
});


export const makeChatRequest = async (messageText) => {
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "user",
      "content": messageText
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
}