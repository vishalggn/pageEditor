import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Text from "../elements/Text";
import Header from "../elements/Header";
import Container from "../elements/Container";
import Image from "../elements/Image";

function DraggableElement({
  el,
  isSelected,
  onSelect,
  onUpdateStyle,
  onMoveUp,
  onMoveDown,
  selectedSubKey,
  onSelectSubItem,
}) {
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(null);

  const renderContent = () => {
    switch (el.type) {
      case "text":
        return <Text style={el.style} />;
      case "header":
        return (
          <Header
            style={el.style}
            selectedIndex={selectedLinkIndex}
            onLinkSelect={(i) => {
              onSelect(); // keep element selected
              setSelectedLinkIndex(i);
            }}
          />
        );
      case "image":
        return <Image style={el.style} />;
      case "container":
        return (
          <Container
            style={el.style}
            selectedKey={selectedSubKey}
            onSelectItem={onSelectSubItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative transition-all duration-200 ${
        isSelected ? "border-2 border-red-500" : "border border-transparent"
      }`}
      onClick={() => {
        onSelect();
        setSelectedLinkIndex(null);
      }}
    >
      {renderContent()}
      {isSelected && (
  <div onClick={(e) => e.stopPropagation()}>
    <Toolbar
      el={el}
      selectedLinkIndex={selectedLinkIndex}
      selectedSubKey={selectedSubKey}
      onUpdateStyle={onUpdateStyle}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    />
  </div>
)}

    </div>
  );
}

export default DraggableElement;
