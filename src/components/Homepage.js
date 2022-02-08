import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
export default function Homepage() {
  const [hardScore, setHardScore] = useState(0);
  const [mediumScore, setMediumScore] = useState(0);
  const [easyScore, setEasyScore] = useState(0);
  const [hardLastScore, setHardLastScore] = useState(0);
  const [mediumLastScore, setMediumLastScore] = useState(0);
  const [easyLastScore, setEasyLastScore] = useState(0);
  useEffect(() => {
    const easyScore = localStorage.getItem("Score-Easy")
      ? localStorage.getItem("Score-Easy")
      : 0;
    setEasyScore(easyScore);
    const mediumScore = localStorage.getItem("Score-Medium")
      ? localStorage.getItem("Score-Medium")
      : 0;
    setMediumScore(mediumScore);
    const hardScore = localStorage.getItem("Score-Hard")
      ? localStorage.getItem("Score-Hard")
      : 0;
    setHardScore(hardScore);
    const easyLastScore = localStorage.getItem("LastScore-Easy")
      ? localStorage.getItem("LastScore-Easy")
      : 0;
    setEasyLastScore(easyLastScore);
    const mediumLastScore = localStorage.getItem("LastScore-Medium")
      ? localStorage.getItem("LastScore-Medium")
      : 0;
    setMediumLastScore(mediumLastScore);
    const hardLastScore = localStorage.getItem("LastScore-Hard")
      ? localStorage.getItem("LastScore-Hard")
      : 0;
    setHardLastScore(hardLastScore);
  }, []);

  return (
    <div className="levelList">
      <div className="scoreBox">
        <div>Highest Score</div>
        <table>
          <tr>
            <th>Level</th>
            <th>Best Score</th>
            <th>Last Score</th>
          </tr>
          <tr>
            <td>Easy</td>
            <td>{easyScore}</td>
            <td>{easyLastScore}</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>{mediumScore}</td>
            <td>{mediumLastScore}</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>{hardScore}</td>
            <td>{hardLastScore}</td>
          </tr>
        </table>
      </div>
      <div>
        <div>
          <div className="levelKey">
            <Link to="/easy" style={{ textDecoration: "none" }}>
              <p>Easy</p>
            </Link>
          </div>
          <div className="levelKey">
            <Link to="/medium" style={{ textDecoration: "none" }}>
              <p>Medium</p>
            </Link>
          </div>
          <div className="levelKey">
            <Link to="/hard" style={{ textDecoration: "none" }}>
              <p>Hard</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
