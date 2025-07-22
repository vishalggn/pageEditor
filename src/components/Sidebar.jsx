import React from 'react';
import { Blocks } from 'lucide-react';

const items = [
  { type: 'text', label: 'Text' },
  { type: 'header', label: 'Header' },
  { type: 'image', label: 'Image' },
  { type: 'container', label: 'Container' },
];

function Sidebar() {
  return (
    <div className="w-1/4 bg-gradient-to-b from-white to-gray-100 p-6 border-r border-gray-300 shadow-inner min-h-screen">
      <div className="flex items-center gap-2 text-gray-700 mb-6">
        <Blocks className="text-blue-500" size={22} />
        <h2 className="text-xl font-semibold tracking-wide">Components</h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("type", item.type);
              e.dataTransfer.setData("source", "sidebar");
            }}
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition hover:bg-blue-50 cursor-move"
          >
            <span className="text-gray-700 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
