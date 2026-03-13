require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectMQTT = require("./mqtt/subscriber");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

connectMQTT(process.env.MQTT_BROKER);

const dataRoutes = require("./routes/dataRoutes");
app.use("/api/data", dataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
