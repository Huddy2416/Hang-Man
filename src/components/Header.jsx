import { useState } from "react";
import Categories from "../Data/Categories.jsx";
import '../styles/Header.css'

const Header = ({setDepth, setWordList, setTopic}) => {
  const [currentChoice, setCurrentChoice] = useState(Categories); // Start with top level
  const [history, setHistory] = useState([]); // To go back up if needed
  const [choice, setChoice] = useState(""); // Track the level of depth
  const handleClick = (key) => {
    const next = currentChoice[key];
    if (typeof next === "object" && !Array.isArray(next)) {
      // It's another nested object
      const newHistory = [...history, currentChoice]; // Save current level
      setHistory(newHistory); // Save current level
      setCurrentChoice(next);
      setDepth(newHistory.length) // Go deeper
    } else if (Array.isArray(next)) {// It's a word list
      setWordList(next);
      setTopic(key);
      setChoice(key) // Set the topic
      setDepth(history.length + 1);
      setCurrentChoice(next); // Set the depth to current history length
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = history.slice(0, history.length - 1);
      const prev = history[history.length - 1];
      setCurrentChoice(prev);
      setHistory(newHistory);
      setDepth(newHistory.length);
      setChoice("")
    }
  };
  return <header className="w-100 p10 py4 flex">
    <div className="w-50 flex flex-column items-center">
      <h1 className="f1 light-gray">Hang-Man</h1>
      <p className="f4 light-gray">A React Application</p>
    </div>
    <nav className="w-50 h-100 flex flex-wrap flex-column items-center">
      <ul className="h-50 w-100 list ma0 pa0 flex flex-column flex-row-ns justify-around items-center">
        {choice === "" ? Object.keys(currentChoice).map((key) => (
          <li key={key}>
            <button  onClick={() => handleClick(key)} className="header-button grow dib f6 link br3 ba bw1 ph3 pv2 mb2 dib">
             {key}
            </button>
          </li>
        )) : <li>
          <button  className="header-button pa0 ma0 grow dib f6 link br3 ba bw1 ph3 pv2 mb2 dib ">
            {choice}
          </button>
        </li>
      }
      </ul>
      <div className="h-50 flex">
       {history.length > 0 && (
          <button
            onClick={goBack}
            className="pa0 ma0 grow dib f6 link br3 ba bw1 ph3 pv2 mb2 dib header-button"
          >
          Go Back
          </button>
        )}
      </div>  
    </nav>
    </header>
  
};
export default Header;