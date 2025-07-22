import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CentralArea from "./components/CentralArea";
import { Smartphone, Tablet, Monitor } from "lucide-react";

const devices = [
  {
    label: "Desktop",
    size: "100%",
    icon: Monitor,
  },
  {
    label: "Tablet",
    size: "768px",
    icon: Tablet,
  },
  {
    label: "Mobile",
    size: "380px",
    icon: Smartphone,
  },
];

export default function App() {
  const [responsiveSize, setResponsiveSize] = useState("100%");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800 font-sans">
      <Sidebar />
      <div className="flex-1 p-6 bg-white shadow-inner rounded-l-3xl">
        {/* Device Toggle Buttons */}
        <div className="flex gap-3 mb-6">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = responsiveSize === device.size;
            return (
              <button
                key={device.label}
                onClick={() => setResponsiveSize(device.size)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-medium
                  ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                  }`}
              >
                <Icon size={18} />
                {device.label}
              </button>
            );
          })}
        </div>

        {/* Main Canvas Area */}
        <CentralArea width={responsiveSize} />
      </div>
    </div>
  );
}
