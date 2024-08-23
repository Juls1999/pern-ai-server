const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_config/db.js");
const { getAIResponse } = require("./ai.js");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// AI chat route
app.post("/api/message", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiMessage = await getAIResponse(userMessage);
    res.json({ aiMessage });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create a feedback
app.post("/feedbacks", async (req, res) => {
  try {
    const { prompt, response, feedback_type } = req.body;

    // Basic validation
    if (!prompt || !response || !feedback_type) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await pool.query(
      "INSERT INTO feedback(prompt, response, feedback_type) VALUES ($1, $2, $3) RETURNING *",
      [prompt, response, feedback_type]
    );

    // Return the inserted row
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all feebacks
app.get("/feedbacks", async (req, res) => {
  try {
    const allFeedbacks = await pool.query("SELECT * FROM feedback ORDER BY id DESC");
    res.status(200).json(allFeedbacks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get a feedback
app.get("/feedbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await pool.query("SELECT * FROM feedback WHERE id = $1", [
      id,
    ]);
    res.status(200).json(feedback.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update a feedback
app.put("/feedbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback_type } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE feedback SET feedback_type = $1 WHERE id = $2",
      [feedback_type, id]
    );
    res.status(200).json("Feedback was updated!");
  } catch (err) {
    console(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a feedback
app.delete("/feedbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFeedback = await pool.query(
      "DELETE FROM feedback WHERE id = $1",
      [id]
    );
    res.status(200).json("Feedback was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

//start server
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
