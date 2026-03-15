# ⚡ Smart LT Line Fault Detection System

A **Smart Grid monitoring system** that detects **Low Tension (LT) line faults in real time** and visualizes them on an interactive dashboard.

The system continuously monitors voltage and current data from LT poles, detects anomalies such as **line breaks, overload, and electricity theft**, and alerts operators through a modern monitoring dashboard.

---

## 🌐 Live Dashboard

Access the deployed dashboard here:

**Live Demo:**
https://smart-lt-line-fault-detection.vercel.app/dashboard

---

## 🎯 Problem Statement

Traditional power distribution systems depend mainly on **circuit breakers and manual inspection** to detect LT line faults.

This approach has several limitations:

* Slow fault detection
* Manual monitoring of poles
* Delayed response to electrical hazards
* Electricity theft detection is difficult
* Lack of centralized monitoring

Our system provides a **software-based smart monitoring solution** that enables **real-time fault detection and visualization**.

---

## 🚀 Key Features

* ⚡ **Real-Time Fault Detection**
* 🗺 **Interactive Map Visualization**
* 📊 **Live Voltage & Current Monitoring**
* 🚨 **Automatic Fault Alerts with Sound**
* 🔎 **Electricity Theft Detection**
* 📍 **Pole Location Tracking**
* 🌙 **Modern Dark-Themed Control Dashboard**
* ☁ **Cloud-Based Monitoring**

---

## 🧠 How the System Works

```
Sensors / Simulator
        ↓
     MQTT Broker
        ↓
Node.js Backend (API)
        ↓
MongoDB Atlas Database
        ↓
Next.js Dashboard
```

1. Sensors (or simulator) generate voltage/current data.
2. Data is transmitted via **MQTT protocol**.
3. Backend processes and stores data in **MongoDB Atlas**.
4. Dashboard fetches data through REST APIs.
5. Faults are detected and displayed on the monitoring interface.

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TailwindCSS
* Leaflet Maps
* Axios

### Backend

* Node.js
* Express.js
* MQTT

### Database

* MongoDB Atlas

### Deployment

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

## 📂 Project Structure

```
smart-lt-line-fault-detection
│
├── backend
│   ├── server.js
│   ├── routes
│   └── models
│
├── frontend
│   ├── app
│   ├── components
│   └── public
│
├── simulator
│   └── simulator.js
│
└── README.md
```

---

## ⚙️ Running the Project Locally

### 1️⃣ Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/smart-lt-line-fault-detection.git
cd smart-lt-line-fault-detection
```

---

### 2️⃣ Run Backend

```
cd backend
npm install
node server.js
```

---

### 3️⃣ Run Frontend

```
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Run Simulator (optional)

```
cd simulator
node simulator.js
```

This generates simulated pole data for testing.

---

## 🔔 Fault Alert System

When a fault is detected:

* Dashboard status changes
* Map marker color changes
* Alert sound is triggered
* Fault statistics update instantly

---

## 📈 Future Improvements

* AI-based fault prediction
* SMS notifications to engineers
* Real-time WebSocket updates
* Mobile monitoring app
* Integration with smart meters

---

## 👨‍💻 Author

Ganesh Karadkar

---

## 📜 License

This project is created for **educational and hackathon purposes**.
