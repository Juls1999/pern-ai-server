const OpenAI = require("openai");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function main() {
  const model = await openai.models.del(
    "ft:gpt-4o-mini-2024-07-18:8-ventures-network-pte-ltd::9xqpfE0B"
  );

  console.log(model);
}
main();
