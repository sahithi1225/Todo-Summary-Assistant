const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios"); 
const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);


const sendSlackStartupMessage = async () => {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: "🚀 Todo Summary Assistant server is up and running!",
    });
    console.log("✅ Slack notification sent.");
  } catch (error) {
    console.error("❌ Failed to send Slack message:", error.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sendSlackStartupMessage(); 
});
