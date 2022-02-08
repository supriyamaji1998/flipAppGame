import "./App.css";
import CardBox from "./components/CardBox";
import Homepage from "./components/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const cardsEasyType = [
  { icon: "⌬", id: 1, matched: false },
  { icon: "⍟", id: 2, matched: false },
  { icon: "⍣", id: 3, matched: false },
  { icon: "⍩", id: 4, matched: false },
];
const cardsMediumType = [
  { icon: "⌬", id: 1, matched: false },
  { icon: "⍟", id: 2, matched: false },
  { icon: "⍣", id: 3, matched: false },
  { icon: "⍩", id: 4, matched: false },
  { icon: "⌘", id: 5, matched: false },
  { icon: "⌆", id: 6, matched: false },
  { icon: "⌅", id: 7, matched: false },
  { icon: "⍦", id: 8, matched: false },
];
const cardsHardType = [
  { icon: "⌬", id: 1, matched: false },
  { icon: "⍟", id: 2, matched: false },
  { icon: "⍣", id: 3, matched: false },
  { icon: "⍩", id: 4, matched: false },
  { icon: "⌘", id: 5, matched: false },
  { icon: "⌆", id: 6, matched: false },
  { icon: "⌅", id: 7, matched: false },
  { icon: "⍦", id: 8, matched: false },
  { icon: "⍒", id: 9, matched: false },
  { icon: "⍢", id: 10, matched: false },
  { icon: "⍭", id: 11, matched: false },
  { icon: "⍷", id: 12, matched: false },
  { icon: "⍅", id: 13, matched: false },
  { icon: "⍎", id: 14, matched: false },
  { icon: "⍊", id: 15, matched: false },
  { icon: "⍍", id: 16, matched: false },
];

function App() {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
        </Routes>
        <Routes>
          <Route
            path="/easy"
            element={
              <CardBox
                cardsEasyType={cardsEasyType}
                totalFlip={40}
                totalTime={40}
                level={"Easy"}
                cardsize={8}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/hard"
            element={
              <CardBox
                cardsEasyType={cardsHardType}
                totalFlip={80}
                totalTime={80}
                level={"Hard"}
                cardsize={32}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/medium"
            element={
              <CardBox
                cardsEasyType={cardsMediumType}
                totalFlip={60}
                totalTime={60}
                level={"Medium"}
                cardsize={16}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
