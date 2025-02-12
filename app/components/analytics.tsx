"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function Analytics() {
  const data = {
    labels,
    datasets: [
      {
        label: "New Visits",
        data: [150, 200, 180, 250, 220, 300, 280, 250, 200, 180, 160, 140],
        borderColor: "rgb(96, 165, 250)",
        backgroundColor: "rgba(96, 165, 250, 0.5)",
        tension: 0.4,
      },
      {
        label: "Unique Visits",
        data: [100, 150, 200, 180, 150, 170, 160, 140, 130, 120, 110, 100],
        borderColor: "rgb(74, 222, 128)",
        backgroundColor: "rgba(74, 222, 128, 0.5)",
        tension: 0.4,
      },
      {
        label: "Old Visits",
        data: [200, 180, 160, 170, 190, 200, 220, 200, 180, 160, 140, 120],
        borderColor: "rgb(192, 132, 252)",
        backgroundColor: "rgba(192, 132, 252, 0.5)",
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-black">Statistic</h2>
        <select className="px-2 py-1 border rounded-md">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="h-[400px] w-[800px]">Content here 
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

