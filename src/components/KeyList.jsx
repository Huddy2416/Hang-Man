import React from "react";
import '../styles/Keylist.css'

class KeyList extends React.Component {
  static defaultProps = {
    maxWrong: 6
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: null 
    };
  }

  componentDidUpdate(prevProps) {
    // Generate new word when wordList changes
    if (prevProps.wordList !== this.props.wordList && this.props.wordList.length > 0) {
      const randomWord = this.props.wordList[Math.floor(Math.random() * this.props.wordList.length)];
      this.setState({
        answer: randomWord,
        nWrong: 0,
        guessed: new Set()
      });
      this.props.setAddPart(0);
    }
  }
reset = () => {
  const randomWord = this.props.wordList[Math.floor(Math.random() * this.props.wordList.length)];  
  this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord
    });
    this.props.setAddPart(0);
  }
  prompt = () => {
    const { depth, wordList, topic } = this.props;
    return depth === 0 ? "Please select a category to start the game"
        : depth === 1 ? "Please select a topic to start the game"
        : wordList.length > 0 ? `Guess the ${topic}!`
        : "Ready to play?";
  }

  guessedWord = () => {
    return this.state.answer
      ? this.state.answer.split("").map((ltr, ind) => (this.state.guessed.has(ltr.toLowerCase()) ?
      <div key={ind} className="puzzle-box ba bw1 flex justify-center items-center"><p className="puzzle-ltr">{ltr}</p></div> 
      : <div key={ind} className="ba bw1 ma2-ns pa3-l pa2-m pa1 ma1 puzzle-box"></div>))
      : [];
  }
  handleGuess = (e) => {
    let ltr = e.target.value;
    const isCorrect = this.state.answer && this.state.answer.toLowerCase().includes(ltr.toLowerCase());
    
    this.setState(ps => ({
      guessed: ps.guessed.add(ltr.toLowerCase()),
      nWrong: ps.nWrong + (isCorrect ? 0 : 1)
    }), () => {
      // Update the hangman after state is set
      if (!isCorrect) {
        this.props.setAddPart(this.state.nWrong);
      }
    });
  }

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button className ="keyboard pa3-l ma3-l pa2-m ma2-m grow"
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  }
setAddPart = () => {;
  return this.state.nWrong;
}
  render() { 
    const {maxWrong} = this.props;
    const {nWrong, answer} = this.state; 
    let gameOver = nWrong >= maxWrong;
    let isWinner = answer && answer.split("").every(ltr => this.state.guessed.has(ltr.toLowerCase()));
    let gameState = this.generateButtons()
    if (gameOver) {
      gameState = "You lose!"; 
    } else if (isWinner) {
      gameState = "You win!";
    }
    
    return (
      <div className="w-100 h-100 flex flex-column justify-around items-center keys-container">
        <p className="f4 w-100 tc state">{this.prompt()}</p>
        <p className="state">Guessed Wrong: {nWrong}</p>
        <div className="flex justify-around ">
          {gameOver ? answer : this.guessedWord()}
        </div>
        <div className="flex flex-wrap justify-center overflow-auto w-100 keyboard-container">{gameState}</div>
        <button className="reset" onClick={this.reset}>Restart</button>
      </div>     
    );
  }
}

export default KeyList;