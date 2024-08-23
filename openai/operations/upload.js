const fs = require("fs");
const OpenAI = require("openai");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function uploadFile() {
  try {
    // Use fs.createReadStream to read the file and upload it
    const response = await openai.files.create({
      file: fs.createReadStream("../training_data/training_data.jsonl"),
      purpose: "fine-tune",
    });

    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// Call the async function to perform the upload
uploadFile();
