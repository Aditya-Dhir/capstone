const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Simulated AI response
function generateResponse(instruction) {
    const responses = {
        "cough": "Drink warm fluids and rest. If it persists, see a doctor.",
        "fever": "Stay hydrated and take paracetamol if needed. See a doctor if it goes above 102°F.",
        "headache": "Try resting in a dark room and drinking water. If it persists, consult a doctor."
    };

    for (let key in responses) {
        if (instruction.toLowerCase().includes(key)) {
            return responses[key];
        }
    }

    return "I'm not sure. Please consult a doctor.";
}

// API Endpoint
app.post("/generate", (req, res) => {
    try {
        const instruction = req.body.instruction;
        if (!instruction) {
            return res.status(400).json({ error: "Instruction is required" });
        }

        const generatedText = generateResponse(instruction);
        res.json({ generated_text: generatedText });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
