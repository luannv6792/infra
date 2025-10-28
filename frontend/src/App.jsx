import React, { useEffect, useState } from "react";
import infraLogo from "/infra.svg";

export default function App() {
  const [status, setStatus] = useState("Đang kiểm tra...");

  useEffect(() => {
    fetch("http://host.docker.internal:32001/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.db_status === "connected") {
          setStatus("✅ Kết nối database thành công!");
        } else {
          setStatus("❌ Lỗi kết nối database");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("⚠️ Không thể kết nối backend");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <img src={infraLogo} alt="Infra Logo" className="w-20 h-20 mb-4 drop-shadow-xl" />
      <h1 className="text-4xl font-bold text-blue-600 mb-2">L Dashboard</h1>
      <p className="text-gray-600 mb-6">Modern Monitoring & Analytics</p>
      <div className="text-lg font-medium text-gray-800">{status}</div>
    </div>
  );
}
