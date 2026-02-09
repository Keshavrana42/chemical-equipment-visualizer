# Chemical Equipment Parameter Visualizer

A full‑stack web application to upload, analyze, and visualize chemical equipment operating parameters. Built with **Django REST Framework** (backend) and **React + Chart.js** (frontend).

---

## ✨ Features

* 📤 Upload CSV files containing equipment data
* 🗄️ Persist data in a database
* 📊 Interactive visualizations:

  * Line charts for **Flowrate**, **Pressure**, **Temperature**
  * Bar chart comparison (**Flowrate vs Pressure**)
  * Equipment selector (dropdown)
  * Parameter toggles (show/hide charts)
* 📜 View upload history via REST API
* 🔐 Authentication support (protected endpoints)

---

## 🏗️ Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SQLite (default DB)
* Pandas

### Frontend

* React
* Axios
* Chart.js + react-chartjs-2

---

## 📁 Project Structure

```
chemical-equipment-visualizer/
│
├── backend/
│   ├── backend/
│   ├── equipment/
│   ├── manage.py
│   └── db.sqlite3
│
├── web-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## 🚀 How to Run the Project

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

### 2️⃣ Frontend Setup

```bash
cd web-frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000/
```

---

## 📄 CSV Format

The uploaded CSV file must contain the following columns:

```
Equipment Name, Type, Flowrate, Pressure, Temperature
```

Example:

```
Pump A, Pump, 120, 5.6, 80
Pump B, Pump, 100, 6.1, 75
```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/upload/`  | Upload CSV file        |
| GET    | `/api/history/` | Fetch uploaded records |
| GET    | `/api/report/`  | Generate report (stub) |

---

## 📊 Dashboard Overview

* Select equipment from dropdown
* Toggle metrics (Flowrate / Pressure / Temperature)
* View trends using line charts
* Compare Flowrate vs Pressure using bar chart

---

## 🧠 Explanation (For Viva / Interview)

> "This project allows users to upload CSV files containing chemical equipment parameters. The backend processes and stores the data using Django REST Framework, while the frontend visualizes trends and comparisons using React and Chart.js. Interactive filters and chart toggles improve analytical clarity."

---

## 🔮 Future Enhancements

* Export charts as images
* Download filtered data as CSV
* Advanced authentication (JWT)
* Deployment on cloud (AWS / Render)

---

## ✅ Status

✔ Fully functional
✔ PDF‑compliant
✔ Ready for submission & demo

---

**Author:** KESHAV RANA
**Project Type:** Internship Task For Selection
