import React, { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";

function Toolbar({
  el,
  selectedLinkIndex,
  selectedSubKey,
  onUpdateStyle,
  onMoveUp,
  onMoveDown,
}) {
  const [form, setForm] = useState({ ...el.style });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setForm({ ...el.style });
  }, [el.style]);

  useEffect(() => {
  setForm({ ...el.style });
  setVisible(true);
}, [el.style, el.id, selectedSubKey]);

  const px = (val) => (val.toString().endsWith("px") ? val : val + "px");

  const update = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onUpdateStyle(updated);
  };

  const updatePlanText = (planIndex, field, value) => {
    const updatedPlans = [...form.plans];
    updatedPlans[planIndex] = { ...updatedPlans[planIndex], [field]: value };
    update("plans", updatedPlans);
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    const updatedPlans = [...form.plans];
    const features = [...updatedPlans[planIndex].features];
    features[featureIndex] = value;
    updatedPlans[planIndex] = { ...updatedPlans[planIndex], features };
    update("plans", updatedPlans);
  };

  if (!visible) return null;

  // Parse selection for container
  let containerEditField = null;
  let planIndex = null;
  let featureIndex = null;
  if (el.type === "container" && selectedSubKey) {
    const match = selectedSubKey.match(
      /(title|price|feature|button)-(\d+)(?:-(\d+))?/
    );
    if (match) {
      containerEditField = match[1];
      planIndex = parseInt(match[2]);
      featureIndex = match[3] !== undefined ? parseInt(match[3]) : null;
    }
  }

  return (
    <div className="absolute top-[102%] left-0 backdrop-blur-xl bg-white border rounded-xl shadow-lg p-3 z-10 flex flex-wrap gap-3 text-sm items-center min-w-[260px]">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
      >
        <X size={16} />
      </button>

      {/* Font & Color */}
      {el.type !== "image" && (
        <>
          <div>
            <label className="block text-xs text-gray-500">Font Size</label>
            <input
              type="number"
              value={parseInt(form.fontSize) || ""}
              onChange={(e) => update("fontSize", px(e.target.value))}
              className="border rounded px-2 py-1 w-24"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500">Color</label>
            <input
              type="color"
              value={form.color || "#000000"}
              onChange={(e) => update("color", e.target.value)}
              className="w-10 h-8 rounded"
            />
          </div>
        </>
      )}

      {/* Text Element Text */}
      {el.type === "text" && (
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Update Text</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-40"
            value={form.text || ""}
            onChange={(e) => update("text", e.target.value)}
          />
        </div>
      )}

      {/* Image Source */}
      {el.type === "image" && (
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Image URL</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-52"
            value={form.src || ""}
            onChange={(e) => update("src", e.target.value)}
          />
        </div>
      )}

      {/* Width */}
      <div>
        <label className="block text-xs text-gray-500">Width</label>
        <input
          type="number"
          value={parseInt(form.width) || ""}
          onChange={(e) => update("width", px(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>

      {/* Header Link Editor */}
      {el.type === "header" &&
        Array.isArray(form.links) &&
        selectedLinkIndex !== null &&
        selectedLinkIndex < form.links.length && (
          <>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">
                Edit Link #{selectedLinkIndex + 1}
              </label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-40"
                value={form.links[selectedLinkIndex]}
                onChange={(e) => {
                  const updatedLinks = [...form.links];
                  updatedLinks[selectedLinkIndex] = e.target.value;
                  update("links", updatedLinks);
                }}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500">
                Link Font Size
              </label>
              <input
                type="number"
                value={
                  parseInt(form.linkStyles?.[selectedLinkIndex]?.fontSize) || ""
                }
                onChange={(e) => {
                  const updatedStyles = [...(form.linkStyles || [])];
                  const style = updatedStyles[selectedLinkIndex] || {};
                  style.fontSize = px(e.target.value);
                  updatedStyles[selectedLinkIndex] = style;
                  update("linkStyles", updatedStyles);
                }}
                className="border rounded px-2 py-1 w-24"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500">Link Color</label>
              <input
                type="color"
                value={
                  form.linkStyles?.[selectedLinkIndex]?.color || "#ffffff"
                }
                onChange={(e) => {
                  const updatedStyles = [...(form.linkStyles || [])];
                  const style = updatedStyles[selectedLinkIndex] || {};
                  style.color = e.target.value;
                  updatedStyles[selectedLinkIndex] = style;
                  update("linkStyles", updatedStyles);
                }}
                className="w-10 h-8 rounded"
              />
            </div>
          </>
        )}

      {/* Container Sub Item Editing */}
      {el.type === "container" && planIndex !== null && form.plans?.[planIndex] && (
        <>
          {/* Title */}
          {containerEditField === "title" && (
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">
                Title #{planIndex + 1}
              </label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-48"
                value={form.plans[planIndex].title || ""}
                onChange={(e) =>
                  updatePlanText(planIndex, "title", e.target.value)
                }
              />
            </div>
          )}

          {/* Price */}
          {containerEditField === "price" && (
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">
                Price #{planIndex + 1}
              </label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-48"
                value={form.plans[planIndex].price || ""}
                onChange={(e) =>
                  updatePlanText(planIndex, "price", e.target.value)
                }
              />
            </div>
          )}

          {/* Feature */}
          {containerEditField === "feature" &&
            featureIndex !== null &&
            form.plans[planIndex].features?.[featureIndex] !== undefined && (
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">
                  Feature #{planIndex + 1}.{featureIndex + 1}
                </label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-52"
                  value={form.plans[planIndex].features[featureIndex]}
                  onChange={(e) =>
                    updateFeature(planIndex, featureIndex, e.target.value)
                  }
                />
              </div>
            )}

          {/* Button */}
          {containerEditField === "button" && (
            <>
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">
                  Button Text #{planIndex + 1}
                </label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-48"
                  value={form.plans[planIndex].buttonText || ""}
                  onChange={(e) =>
                    updatePlanText(planIndex, "buttonText", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">
                  Button Link #{planIndex + 1}
                </label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-48"
                  value={form.plans[planIndex].buttonLink || ""}
                  onChange={(e) =>
                    updatePlanText(planIndex, "buttonLink", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">
                  Button Color #{planIndex + 1}
                </label>
                <input
                  type="color"
                  className="w-10 h-8 rounded"
                  value={form.plans[planIndex].buttonColor || "#2563eb"}
                  onChange={(e) =>
                    updatePlanText(planIndex, "buttonColor", e.target.value)
                  }
                />
              </div>
            </>
          )}
        </>
      )}

      {/* Move Up/Down Buttons */}
      <div className="flex gap-1 mt-4">
        <button
          onClick={onMoveUp}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          title="Move Up"
        >
          <ArrowUp size={16} />
        </button>
        <button
          onClick={onMoveDown}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          title="Move Down"
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
