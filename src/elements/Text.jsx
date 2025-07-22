import React from 'react';

function Text({ style }) {
  return (
    <div style={{ ...style }}>
      {style.text || "Hi I am Text"}
    </div>
  );
}

export default Text;
