
const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://broker.hivemq.com");

const poles = [
  {
    poleId: "POLE_01",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  {
    poleId: "POLE_02",
    latitude: 18.5221,
    longitude: 73.8612,
  },
  {
    poleId: "POLE_03",
    latitude: 18.5180,
    longitude: 73.8525,
  },
];

function generatePoleData(pole) {
  let voltage = 220 + Math.random() * 15;

  let current = Math.random() * 5;

  let status = "healthy";

  let faultType = null;

  let theftDetected = false;

  // LINE BREAK
  if (current < 0.5) {
    status = "fault";
    faultType = "line_break";
  }

  // OVERLOAD
  if (current > 4.5) {
    status = "fault";
    faultType = "overload";
  }

  // POWER THEFT
  if (current > 3.8 && voltage > 230) {
    theftDetected = true;
    status = "fault";
    faultType = "theft";
  }

  return {
    poleId: pole.poleId,

    voltage: Number(voltage.toFixed(1)),

    current: Number(current.toFixed(1)),

    voltageOut: Number(
      (voltage - Math.random() * 5).toFixed(1)
    ),

    currentOut: Number(
      (current - Math.random()).toFixed(1)
    ),

    status,

    faultType,

    theftDetected,

    weatherRisk:
      Math.random() > 0.8 ? "medium" : "low",

    latitude: pole.latitude,

    longitude: pole.longitude,

    timestamp: new Date(),
  };
}

setInterval(() => {

  poles.forEach((pole) => {

    const data = generatePoleData(pole);

    client.publish(
      "ltline/data",
      JSON.stringify(data)
    );

    console.log("Sent:", data);

  });

}, 3000);
