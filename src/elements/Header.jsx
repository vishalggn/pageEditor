import React from "react";
import { Menu } from "lucide-react";

function Header({ style = {}, selectedIndex = null, onLinkSelect = () => {} }) {
  const links = style.links;
  const linkStyles = style.linkStyles || [];

  return (
    <header className="bg-blue-500 px-6 py-4 rounded-xl shadow flex items-center justify-between flex-wrap text-white">
      <div className="text-2xl font-bold">Logo</div>

      <nav className="hidden md:flex gap-6">
        {links.map((link, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              onLinkSelect(i);
            }}
            className={`font-medium transition ${
              selectedIndex === i ? "border-2 border-red-500" : ""
            }`}
            style={{
              fontSize: linkStyles[i]?.fontSize || style.fontSize,
              color: linkStyles[i]?.color || style.color,
              width: linkStyles[i]?.width || style.width,
            }}
          >
            {link}
          </button>
        ))}
      </nav>

      <button className="md:hidden p-2 text-gray-700 hover:text-emerald-500">
        <span className="sr-only">Menu</span>
      </button>
    </header>
  );
}

export default Header;
