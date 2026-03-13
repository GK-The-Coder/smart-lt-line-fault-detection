const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");

function generateData() {
  let voltage = 220 + Math.random() * 15;
  let current = Math.random() * 5;

  let status = "healthy";
  let faultType = null;
  let theftDetected = false;

  if (current < 0.3) {
    status = "fault";
    faultType = "line_break";
  }

  if (current > 4.5) {
    status = "fault";
    faultType = "overload";
  }

  if (current > 3.8 && voltage > 230) {
    theftDetected = true;
    faultType = "theft";
  }

  return {
    poleId: "POLE_01",
    voltage,
    current,
    status,
    faultType,
    theftDetected,
    weatherRisk: "low",
    latitude: 18.5204,
    longitude: 73.8567
  };
}

setInterval(() => {
  const data = generateData();
  client.publish("ltline/data", JSON.stringify(data));
  console.log("Sent:", data);
}, 3000);
