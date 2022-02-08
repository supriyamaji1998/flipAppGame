import React from "react";
import "./Card.css";
export default function Card({ card, handleSelect, flipped, level }) {
  const handleClick = () => {
    handleSelect(card);
  };
  return (
    <div>
      <div className={flipped ? "flipped" : ""}>
        <div className="card">
          <div
            className={
              level === "Easy"
                ? "front-Easy"
                : level === "Medium"
                ? "front-Medium"
                : "front-Hard"
            }
          >
            {card.icon}
          </div>
          <div
            className={
              level === "Easy"
                ? "back-Easy"
                : level === "Medium"
                ? "back-Medium"
                : "back-Hard"
            }
            onClick={handleClick}
          ></div>
        </div>
      </div>
    </div>
  );
}
