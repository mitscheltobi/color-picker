import './App.css';
import React, { useState } from 'react';
import GameModeInfo from './Components/GameModeInfo.js'
import GameOver from './Components/GameOver.js'
import NewGame from './Components/NewGame.js'
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

  const fadeColor = (c1, c2, t) => {
    const r_s = parseInt(c1.slice(1,3), 16);
    const g_s = parseInt(c1.slice(3,5), 16);
    const b_s = parseInt(c1.slice(5,7), 16);
    const r_t = parseInt(c2.slice(1,3), 16);
    const g_t = parseInt(c2.slice(3,5), 16);
    const b_t = parseInt(c2.slice(5,7), 16);

    for (let i; i++; i<t*100){
      const updateTime = () => {
        console.log("called")
        const r_i = (r_t - r_s) * i
        const g_i = (g_t - g_s) * i
        const b_i = (b_t - b_s) * i
        [setA, setB, setC][ansIndx](['#',r_i,g_i,b_i].join(''))
      }
      setTimeout(updateTime(), 1000)
    }
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
      // fadeColor(genRandomColorCode(), A, 100)
      setGuessed([false, false, false])
      setCorrect(true)
      setScore(prev => prev+1)
      setStreak(prev => prev+1)
    } else {
      switch (guess){
        case 0:
          setGuessed(prev => {
            return [true, prev[1], prev[2]]
          })
          break;
        case 1:
          setGuessed(prev => {
            return [prev[0], true, prev[2]]
          })
          break;
        case 2:
          setGuessed(prev => {
            return [prev[0], prev[1], true]
          })
          break;
      }
      setScore(prev => prev-1)
      setStreak(0)
    }
  }

  const handleGameMode = (gameMode) => {
    setGameMode(gameMode)
    setNewGameWindow(false)
  }

  const [A, setA] = useState(genRandomColorCode())
  const [B, setB] = useState(genRandomColorCode())
  const [C, setC] = useState(genRandomColorCode())
  const [ansIndx, setAnswerIndx] = useState(genRandomAns())
  const [guessed, setGuessed] = useState([false, false, false])
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [newGameWindow, setNewGameWindow] = useState(true)

  const gameModes = {
      'endless': {
        'name': 'Endless',
        'desc': 'Game with no time limit. Play as long as you want!'
      },
      'time': {
        'name': 'Time race',
        'desc': 'Play against time. Start with 60 second timer, for each wrong answer you lose 5 seconds. Each correct answer adds 1 second to the timer.'
      },
      'streak': {
        'name': 'Streak',
        'desc': 'Game ends if you lose your streak. No time limit. Have fun :)'
      }
    }

  const [gameMode, setGameMode] = useState(gameModes.endless)

  return (
    <div className="App">
      <header className="App-header">
        <div className="game-container">
          {/* displayable windows */}
          {newGameWindow&& <NewGame handleSubmit={handleGameMode} gameModes={gameModes}/>}
          {gameOver&& <GameOver handleNewGame={()=> {setGameOver(false); setNewGameWindow(true)}} streak={streak} score={score}/>}

          <h2>Pick the correct <span className='color-code'>color code</span>!</h2>
          <div className="colorBox" style={{
            background: [A,B,C][ansIndx]
          }}>
            <p className='game-mode-display'>{gameMode.name}</p>
            <h1 className='cheat'>{[A,B,C][ansIndx]}</h1>
            {correct&&
              <div className="anim-wrapper">
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={400}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                    eventListeners={[
                      {
                        eventName: 'complete',
                        callback: () => {
                          setCorrect(false)
                        }
                      }
                    ]} />
              </div>
            }
          </div>
          <div className="answerButtonWrapper">
            <button className={guessed[0]?'answerButton guessed':'answerButton'} onClick={()=> !guessed[0]&&handleClick(0)}>{A}</button>
            <button className={guessed[1]?'answerButton guessed':'answerButton'} onClick={()=> !guessed[1]&&handleClick(1)}>{B}</button>
            <button className={guessed[2]?'answerButton guessed':'answerButton'} onClick={()=> !guessed[2]&&handleClick(2)}>{C}</button>
          </div>
          <div className="info">
              <div className="info-panel">
                <span>🔥</span>
                <p>{streak}</p>
              </div>
              <button className='new-game-button' onClick={()=> setNewGameWindow(true)}>🚀</button>
              <div className="info-panel">
                <span>🔺</span>
                <p>{score}</p>  
              </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;