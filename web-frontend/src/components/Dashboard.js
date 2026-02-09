import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const [showFlowrate, setShowFlowrate] = useState(true);
  const [showPressure, setShowPressure] = useState(true);
  const [showTemperature, setShowTemperature] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/history/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const equipmentNames = [...new Set(data.map(d => d.equipment_name))];

  const filteredData = selectedEquipment
    ? data.filter(d => d.equipment_name === selectedEquipment)
    : data;

  const labels = filteredData.map((_, index) => `Record ${index + 1}`);

  const lineChartData = (label, key) => ({
    labels,
    datasets: [
      {
        label,
        data: filteredData.map(item => item[key]),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  });

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Flowrate",
        data: filteredData.map(item => item.flowrate),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pressure",
        data: filteredData.map(item => item.pressure),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Chemical Equipment Dashboard</h2>

      {/* Equipment Selector */}
      <label>Select Equipment: </label>
      <select
        value={selectedEquipment}
        onChange={(e) => setSelectedEquipment(e.target.value)}
      >
        <option value="">All</option>
        {equipmentNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>

      {/* Toggles */}
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={showFlowrate}
            onChange={() => setShowFlowrate(!showFlowrate)}
          />
          Flowrate
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={showPressure}
            onChange={() => setShowPressure(!showPressure)}
          />
          Pressure
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={showTemperature}
            onChange={() => setShowTemperature(!showTemperature)}
          />
          Temperature
        </label>
      </div>

      {/* Line Charts */}
      {showFlowrate && (
        <>
          <h3>Flowrate Trend</h3>
          <Line data={lineChartData("Flowrate", "flowrate")} />
        </>
      )}

      {showPressure && (
        <>
          <h3>Pressure Trend</h3>
          <Line data={lineChartData("Pressure", "pressure")} />
        </>
      )}

      {showTemperature && (
        <>
          <h3>Temperature Trend</h3>
          <Line data={lineChartData("Temperature", "temperature")} />
        </>
      )}

      {/* Bar Chart Comparison */}
      <h3>Flowrate vs Pressure Comparison</h3>
      <Bar data={barChartData} />
    </div>
  );
}

export default Dashboard;
