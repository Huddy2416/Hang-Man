import React from 'react'
import Header from './components/Header.jsx'
import KeysList from './components/KeyList.jsx'
import Footer from './components/Footer.jsx'
import Hangman from './components/Hangman.jsx'
import './styles/App.css'

function App() {
  const [wordList, setWordList] = React.useState([]);
  const [depth, setDepth] = React.useState(0);
  const [addPart, setAddPart] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  return (
    <div className="flex flex-column vh-100 w-100">
      <Header setWordList={setWordList} setDepth={setDepth} setTopic={setTopic} />
      <main className="flex-auto w-100 flex">
        <div className="w-50">
          <KeysList wordList={wordList} depth={depth} setAddPart={setAddPart} topic={topic}/>
        </div>
        <div className="w-50 flex justify-center items-center">
          <Hangman addPart={addPart} />
        </div>
      </main>
      <Footer/>
    </div>
  )
};

export default App