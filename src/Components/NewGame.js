import './CSS/NewGame.css'
import React from "react"
import Info from './Resources/info.png'
import Timer from './Resources/timer.png'
import Endless from './Resources/endless.png'

const NewGame = (props) => {
    return (
        <div className="new-game-wrapper">
            <div className='new-game-window'>
                <div className="new-game-window-button" onClick={()=> props.handleSubmit(props.gameModes.endless)}>
                    {/* <img className='game-mode-icon' src={Endless} /> */}
                    <div className="new-game-button-text">
                        <h1>Endless</h1><img className='game-info' src={Info} />
                    </div>
                </div>
                <div className="new-game-window-button" onClick={()=> props.handleSubmit(props.gameModes.time)}>
                    {/* <img className='game-mode-icon' src={Timer} /> */}
                    <div className="new-game-button-text">
                        <h1>Time Race</h1><img className='game-info' src={Info} />
                    </div>
                </div>
                <div className="new-game-window-button" onClick={()=> props.handleSubmit(props.gameModes.streak)}>
                    {/* <img className='game-mode-icon' src="" /> */}
                    <div className="new-game-button-text">
                        <h1>Streak</h1><img className='game-info' src={Info} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewGame;