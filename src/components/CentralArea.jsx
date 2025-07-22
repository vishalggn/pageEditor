import React, { useState } from "react";
import DraggableElement from "./DraggableElement";

function CentralArea({ width }) {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSubKey, setSelectedSubKey] = useState(null);

  const moveElement = (id, direction) => {
    setElements((prev) => {
      const index = prev.findIndex((el) => el.id === id);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || newIndex < 0 || newIndex >= prev.length) return prev;

      const reordered = [...prev];
      const [moved] = reordered.splice(index, 1);
      reordered.splice(newIndex, 0, moved);
      return reordered;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (!type) return;

    const newElement = {
      id: Date.now(),
      type,
      style:
        type === "header"
          ? {
              links: ["Link1", "Link2", "Link3", "Link4"],
              fontSize: "16px",
              color: "#ffffff",
            }
          : type === "container"
          ? {
              plans: [
                {
                  title: "Basic",
                  price: "$9/mo",
                  features: ["1 User", "5 Projects", "Basic Support"],
                  buttonText: "Choose Plan",
                  buttonLink: "#",
                  buttonColor: "#ffffff",
                },
                {
                  title: "Pro",
                  price: "$29/mo",
                  features: ["5 Users", "50 Projects", "Priority Support"],
                  buttonText: "Choose Plan",
                  buttonLink: "#",
                  buttonColor: "#ffffff",
                },
                {
                  title: "Enterprise",
                  price: "$99/mo",
                  features: [
                    "Unlimited Users",
                    "Unlimited Projects",
                    "24/7 Support",
                  ],
                  buttonText: "Choose Plan",
                  buttonLink: "#",
                  buttonColor: "#ffffff",
                },
              ],
              fontSize: "16px",
              color: "#000000",
            }
          : {},
    };

    setElements((prev) => [...prev, newElement]);
  };

  return (
    <div
      className="relative mx-auto bg-blue-50 p-4 rounded-lg"
      style={{ width, minHeight: "650px" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {elements.map((el) => (
        <div key={el.id} className="mb-4" onClick={() => setSelected(el.id)}>
          <DraggableElement
            el={el}
            isSelected={selected === el.id}
            selectedSubKey={selected === el.id ? selectedSubKey : null}
            onSelect={() => {
              setSelected(el.id);
              setSelectedSubKey(null);
            }}
            onSelectSubItem={(key) => {
              setSelected(el.id);
              setSelectedSubKey(key);
            }}
            onUpdateStyle={(style) => {
              setElements((prev) =>
                prev.map((e) => (e.id === el.id ? { ...e, style } : e))
              );
            }}
            onMoveUp={() => moveElement(el.id, "up")}
            onMoveDown={() => moveElement(el.id, "down")}
            conWidth={width}
          />
        </div>
      ))}
    </div>
  );
}

export default CentralArea;
