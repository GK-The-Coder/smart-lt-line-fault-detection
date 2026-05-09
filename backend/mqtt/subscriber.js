const mqtt = require("mqtt");

const PoleData = require("../models/poledata");

const sendSMS = require("../services/sendSMS");

const recentAlerts = {};

const ALERT_COOLDOWN = 60000;

const connectMQTT = (brokerUrl) => {

  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {

    console.log("MQTT Connected");

    client.subscribe("ltline/data");

  });

  client.on("message", async (topic, message) => {

    try {

      const data = JSON.parse(
        message.toString()
      );

      await PoleData.create(data);

      console.log(
        "Data Saved:",
        data
      );

      // SMS ALERT
      if (data.status === "fault") {

        const now = Date.now();

        if (
          !recentAlerts[data.poleId] ||
          now -
            recentAlerts[data.poleId] >
            ALERT_COOLDOWN
        ) {

          await sendSMS(
            `${data.poleId}:FAULT`
          );

          console.log(
            "SMS Alert Sent"
          );

          recentAlerts[data.poleId] =
            now;
        }
      }

    } catch (error) {

      console.error(
        "MQTT Error:",
        error.message
      );

    }

  });

};

module.exports = connectMQTT;
