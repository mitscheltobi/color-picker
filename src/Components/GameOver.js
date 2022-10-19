import './CSS/GameOver.css'
import React from 'react';

const GameOver = (props) => {
    return (
        <div className="game-over">
            <h1>Game over!</h1>
            <div className="game-over-info">
                <div className='game-over-stat'>🔺{props.score}</div>
                <div className='game-over-stat'>🔥{props.streak}</div>
            </div>
            <button className='game-over-new-game' onClick={()=> props.handleNewGame()}>🚀</button>
        </div>
    )
}

export default GameOver;