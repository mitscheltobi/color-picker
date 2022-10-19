import './CSS/GameModeInfo.css'
import React, { useState } from 'react';

const GameModeInfo = (props) => {
    return (
        <div className="game-mode-info-wrapper">
            <div className="header">
                <h1>{props.gameInfo.name}</h1>
                <button onClick={()=>props.handleClose()}>x</button>
            </div>
            <p>{props.gameInfo.desc}</p>
        </div>
    )
}

export default GameModeInfo;