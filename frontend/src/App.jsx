import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(LineElement, PointElement, CategoryScale, LinearScale)

export default function App() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Example Data',
      data: [10, 20, 15, 30, 25],
      borderColor: '#3b82f6',
      fill: false
    }]
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">InfraFront Dashboard</h1>
      <div className="w-2/3 bg-white p-4 rounded-xl shadow">
        <Line data={data} />
      </div>
      <p className="mt-6 text-sm text-gray-500">Frontend running on Kubernetes 🚀</p>
    </div>
  )
}
