import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./CardBox.css";
export default function CardBox({
  cardsEasyType,
  totalTime,
  totalFlip,
  cardsize,
  level,
}) {
  const [cards, setCards] = useState([]);
  const [time, setTime] = useState(0);
  const [match, setMatch] = useState(0);
  const [win, setWin] = useState(false);
  const [flip, setFlip] = useState(0);
  const [score, setScore] = useState(0);
  const [timeTakenToWin, setTimeTakenToWin] = useState(0);
  const [disable, setDisabled] = useState(false);
  const [firstSelect, setFirstSelect] = useState(null);
  const [secondSelect, setSecondSelect] = useState(null);

  useEffect(() => {
    if (firstSelect && secondSelect) {
      if (firstSelect.id === secondSelect.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === firstSelect.id) {
              setMatch((pre) => pre + 2);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        reSchdule();
      } else {
        reSchdule();
      }
    }
  }, [firstSelect, secondSelect]);

  useEffect(() => {
    if (match === cardsize * 2) {
      setWin(true);
      calculateScore();
      setTimeTakenToWin(time);
      setTimeout(() => {
        level === "Easy"
          ? (window.location.href = "/medium")
          : (window.location.href = "/hard");
      }, 3000);
    }
  }, [setSecondSelect, firstSelect]);
  const handleSelect = (card) => {
    if (flip < totalFlip) {
      if (firstSelect) {
        setSecondSelect(card);
      } else {
        setFirstSelect(card);
      }
    } else {
      alert("You Have reached Maximum limit of Flip");
      setDisabled(true);
    }
  };
  const suffle = () => {
    const cardsEasyIcons = [...cardsEasyType, ...cardsEasyType]
      .sort(() => Math.random() - 0.5)
      .map((ele) => ({ ...ele, uniqueId: Math.random() }));

    setFirstSelect(null);
    setSecondSelect(null);
    setCards(cardsEasyIcons);
    setScore(0);
    setDisabled(false);
    setFlip(0);
    setTime(0);
    handleTime();
    clearTime();
  };

  let timeDuration;

  const handleTime = () => {
    timeDuration = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  const clearwintinterval = setInterval(() => {
    if (win === true) {
      setWin(true);
      setTimeTakenToWin(time);
      calculateScore();
      setTimeout(() => {
        level === "Easy"
          ? (window.location.href = "/flipAppGame/medium")
          : (window.location.href = "/hard");
      }, 3000);
      clearwintintervalfunc();
    } else if ((!win && flip === totalFlip) || (!win && time === totalTime)) {
      setDisabled(true);
      clearwintintervalfunc();
    }
  }, 100);
  const clearwintintervalfunc = () => {
    clearInterval(clearwintinterval);
  };
  const clearTime = () => {
    setTimeout(() => {
      setDisabled(true);
      clearInterval(timeDuration);
    }, totalTime * 1000);
  };
  const reSchdule = () => {
    setTimeout(() => {
      setFirstSelect(null);
      setSecondSelect(null);
      setFlip((prevFlip) => prevFlip + 1);
    }, 500);
  };
  const calculateScore = () => {
    if (!timeTakenToWin) {
      const scoretemp = (totalTime - timeTakenToWin) * (totalFlip - flip);
      setScore(scoretemp);
      if (!localStorage.getItem(`Score-${level}`)) {
        localStorage.setItem(`Score-${level}`, scoretemp);
      } else {
        let x = localStorage.getItem(`Score-${level}`);
        if (x < scoretemp) {
          localStorage.setItem(`Score-${level}`, scoretemp);
        }
      }
      if (!localStorage.getItem(`LastScore-${level}`)) {
        localStorage.setItem(`LastScore-${level}`, scoretemp);
      } else {
        let x = localStorage.getItem(`LastScore-${level}`);
        if (x < scoretemp) {
          localStorage.setItem(`LastScore-${level}`, scoretemp);
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Link
          to="/"
          style={{ color: "white", fontSize: "23px", textDecoration: "none" }}
        >
          <p>⌫back</p>
        </Link>
        <div className="start">
          <p>Memory Game</p>
          <button onClick={suffle}>New Game</button>
        </div>
        <div className="end">
          <div>Number of Flip :{flip}</div>
          <div>Time Duration :{time}</div>
          <div>Level :{level}</div>
        </div>
      </div>
      {!disable ? (
        <div
          className={
            level === "Easy"
              ? "card-grid-Easy"
              : level === "Medium"
              ? "card-grid-Medium"
              : "card-grid-Hard"
          }
        >
          {win !== true ? (
            cards.map((card) => (
              <Card
                key={card.uniqueId}
                card={card}
                level={level}
                handleSelect={handleSelect}
                flipped={
                  !!card.matched && card.matched
                    ? true
                    : !!!secondSelect &&
                      !!firstSelect &&
                      card.uniqueId === firstSelect.uniqueId
                    ? true
                    : !!secondSelect &&
                      !!firstSelect &&
                      card.uniqueId === firstSelect.uniqueId
                    ? true
                    : !!secondSelect &&
                      !!firstSelect &&
                      card.uniqueId === secondSelect.uniqueId
                    ? true
                    : false
                }
              />
            ))
          ) : level !== "Hard" ? (
            <div style={{ textAlign: "center", width: "100vw" }}>
              <h1>You won the game. Redirecting to next stage... </h1>
              <h1>Score:{score}</h1>
            </div>
          ) : (
            <h1 style={{ textAlign: "center", width: "100vw" }}>
              You won the Game
            </h1>
          )}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", width: "100vw" }}>Oops,game over!</h1>
      )}
    </div>
  );
}
