import React from "react";

function Container({ style = {}, selectedKey, onSelectItem, conWidth }) {
  const pricingPlans = style.plans || [];

  let cardWidth = "w-full";
  if (conWidth === "100%") {
    cardWidth = "w-[31%]";
  } else if (conWidth === "768px") {
    cardWidth = "w-[48%]";
  } else if (conWidth === "380px") {
    cardWidth = "w-full";
  }

  return (
    <div
      className={`mx-auto flex flex-wrap gap-6 justify-center`}
      style={style}
    >
      {pricingPlans.map((plan, planIndex) => {
        const isSelected =
          selectedKey?.startsWith(`title-${planIndex}`) ||
          selectedKey?.startsWith(`price-${planIndex}`) ||
          selectedKey?.startsWith(`button-${planIndex}`) ||
          selectedKey?.startsWith(`feature-${planIndex}-`);

        return (
          <div
            key={plan.title}
            className={`${cardWidth} bg-blue-100 rounded-2xl shadow-md p-6 flex flex-col items-center ${
              isSelected ? "border-2 border-red-500" : ""
            }`}
          >
            <h2
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem?.(`title-${planIndex}`);
              }}
              className={`text-xl font-bold text-gray-800 ${
                selectedKey === `title-${planIndex}`
                  ? "border-2 border-red-500 p-1"
                  : ""
              }`}
              style={{ fontSize: style.fontSize, color: style.color }}
            >
              {plan.title}
            </h2>

            <p
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem?.(`price-${planIndex}`);
              }}
              className={`text-3xl font-semibold text-blue-600 my-4 ${
                selectedKey === `price-${planIndex}`
                  ? "border-2 border-red-500 p-1"
                  : ""
              }`}
              style={{ fontSize: style.fontSize, color: style.color }}
            >
              {plan.price}
            </p>

            <ul
              className="space-y-2 text-gray-600 text-sm mb-6 text-center"
              style={{ fontSize: style.fontSize, color: style.color }}
            >
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem?.(`feature-${planIndex}-${i}`);
                  }}
                  className={`cursor-pointer ${
                    selectedKey === `feature-${planIndex}-${i}`
                      ? "border-2 border-red-500 p-1"
                      : ""
                  }`}
                >
                  • {feature}
                </li>
              ))}
            </ul>

            <a
              href={plan.buttonLink}
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem?.(`button-${planIndex}`);
              }}
              className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${
                selectedKey === `button-${planIndex}`
                  ? "border-2 border-red-500 p-1"
                  : ""
              }`}
              style={{
                fontSize: style.fontSize,
                color: plan.buttonColor || "#ffffff",
                width: style.width,
              }}
            >
              {plan.buttonText}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Container;
