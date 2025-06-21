const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));


const messageSchema = new mongoose.Schema({ text: String });
const Message = mongoose.model("Message", messageSchema);

app.get("/api/message", async (req, res) => {
  const msg = await Message.findOne();
  res.json(msg);
});

app.get("/api/seed", async (req, res) => {
  await Message.deleteMany({});
  const msg = new Message({ text: "Hey, just wanted to say... I miss you a lot." });
  await msg.save();
  res.send("Seeded!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
