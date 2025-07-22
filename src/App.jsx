import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import CentralArea from "./components/CentralArea";
import { Smartphone, Tablet, Monitor } from "lucide-react";

const devices = [
  { label: "Desktop", size: "100%", icon: Monitor },
  { label: "Tablet", size: "768px", icon: Tablet },
  { label: "Mobile", size: "380px", icon: Smartphone },
];

function App() {
  const [responsiveSize, setResponsiveSize] = useState("100%");
  const centralRef = useRef(); 

  const handleShowPreview = () => {
    if (!centralRef.current) return;

    const clone = centralRef.current.cloneNode(true);

    clone.querySelectorAll(".border-red-500").forEach((el) => {
      el.classList.remove("border-red-500", "border-2", "p-1");
    });

    const content = clone.innerHTML;

    const previewHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Live Preview</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          body { background: #f9fafb; padding: 20px; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div style="max-width: ${responsiveSize}; margin: auto;">
          ${content}
        </div>
      </body>
    </html>
  `;

    const newTab = window.open("", "_blank");
    if (newTab) {
      newTab.document.open();
      newTab.document.write(previewHTML);
      newTab.document.close();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800 font-sans">
      <Sidebar />
      <div className="flex-1 p-6 bg-white shadow-inner rounded-l-3xl">
        {/* Toolbar */}
        <div className="flex gap-3 mb-6">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = responsiveSize === device.size;
            return (
              <button
                key={device.label}
                onClick={() => setResponsiveSize(device.size)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                <Icon size={18} />
                {device.label}
              </button>
            );
          })}
          <button
            onClick={handleShowPreview}
            className="px-4 py-2 rounded-lg border font-medium ms-auto bg-green-600 text-white hover:bg-green-700"
          >
            Show Preview
          </button>
        </div>

        {/* Main Canvas Area */}
        <div ref={centralRef}>
          <CentralArea width={responsiveSize} />
        </div>
      </div>
    </div>
  );
}

export default App;
