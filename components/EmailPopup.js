import { useState } from "react";
import style from "globals.css"

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(true); // Force visibility

  return (
    isVisible && (
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "1px solid black",
        zIndex: 1000
      }}>
        <h2>Test Pop-up</h2>
        <p>This is a test pop-up to check rendering.</p>
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>
    )
  );
}
