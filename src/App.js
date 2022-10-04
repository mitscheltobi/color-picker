import './App.css';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import * as Confetti from './Resources/confetti.json'


function App() {
  const genRandomColorCode = () => {
    let c = "#"
    const hex = "0123456789ABCDEF".split("")
    for (let i=0; i<6; i++) {
      c = c + hex[Math.floor(Math.random() * 16)]
    }
    return c
  }

  const genRandomAns = () => {
    return Math.floor(Math.random() * 3)
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Confetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  const handleClick = (guess) => {
    if (guess === ansIndx) {
      setA(genRandomColorCode())
      setB(genRandomColorCode())
      setC(genRandomColorCode())
      setAnswerIndx(genRandomAns())
      setTA(false)
      setTB(false)
      setTC(false)
      setCorrect(true)
      setTimeout(()=>setCorrect(false), 1500)
      setScore(prev => prev+1)
      setStreak(prev => prev+1)
    } else {
      switch (guess){
        case 0:
          setTA(true)
          setTimeout(()=>setTA(false), 1000)
          break;
        case 1:
          setTB(true)
          setTimeout(()=>setTB(false), 1000)
          break;
        case 2:
          setTC(true)
          setTimeout(()=>setTC(false), 1000)
          break;
      }
      setScore(prev => prev-1)
      setStreak(0)
    }
  }

  const [A, setA] = useState(genRandomColorCode())
  const [B, setB] = useState(genRandomColorCode())
  const [C, setC] = useState(genRandomColorCode())
  const [ansIndx, setAnswerIndx] = useState(genRandomAns())
  const [tA, setTA] = useState(false)
  const [tB, setTB] = useState(false)
  const [tC, setTC] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pick the correct color code!</h2>
        <div className="colorBox" style={{background: [A,B,C][ansIndx]}}>
          <div className="info">
            <p>Score: {score}</p>
            <p>Streak: {streak}</p>
          </div>
          {correct&&<Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}/>
          }
        </div>
        <div className="answerButtonWrapper">
          <button className={tA?'answerButton guessedAnim':'answerButton'} onClick={()=> handleClick(0)}>{A}</button>
          <button className={tB?'answerButton guessedAnim':'answerButton'} onClick={()=> handleClick(1)}>{B}</button>
          <button className={tC?'answerButton guessedAnim':'answerButton'} onClick={()=> handleClick(2)}>{C}</button>
        </div>
      </header>
    </div>
  );
}

export default App;
