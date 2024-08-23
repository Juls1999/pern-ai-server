CREATE DATABASE openai_text_generation;

CREATE TABLE feedback(
    id SERIAL PRIMARY KEY,
    prompt TEXT,
    response TEXT,
    feedback_type VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);