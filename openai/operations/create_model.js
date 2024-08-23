const OpenAI = require("openai");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function main() {
  const fineTune = await openai.fineTuning.jobs.create({
    training_file: "file-t1Fde5mOVqHjyPa2x3Nelqtv",
    model: "gpt-4o-mini-2024-07-18",
  });

  console.log(fineTune);
}

main();
