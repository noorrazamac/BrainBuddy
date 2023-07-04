async function askChatGpt() {
    const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello there!"}],
  });
  console.log(completion.data.choices[0].message);
}

askChatGpt();

function isPrime(number) {
  
}