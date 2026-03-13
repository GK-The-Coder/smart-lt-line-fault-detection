const express = require("express");
const router = express.Router();
const PoleData = require("../models/poledata");

router.get("/latest", async (req, res) => {
  const latest = await PoleData.findOne().sort({ timestamp: -1 });
  res.json(latest);
});

router.get("/history", async (req, res) => {
  const history = await PoleData.find().sort({ timestamp: -1 }).limit(50);
  res.json(history);
});

module.exports = router;
