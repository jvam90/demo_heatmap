const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;

mongoose.connect(
  "mongodb://admin:admin123@localhost:27017/heatmap?authSource=admin"
)
const PointSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  value: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

const Point = mongoose.model("Point", PointSchema);

app.post("/points", async (req, res) => {
  const { x, y } = req.body
  const point = await Point.create({ x, y, value: 1 })
  res.json(point)
})

/* Buscar pontos */
app.get("/points", async (req, res) => {
  const points = await Point.find()
  res.json(points)
})

app.listen(PORT, () => {
    console.log("Servidor online")
});