const mqtt = require("mqtt");
const PoleData = require("../models/poledata");

const connectMQTT = (brokerUrl) => {
  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe("ltline/data");
  });

  client.on("message", async (topic, message) => {
    const data = JSON.parse(message.toString());
    await PoleData.create(data);
    console.log("Data Saved:", data);
  });
};

module.exports = connectMQTT;
