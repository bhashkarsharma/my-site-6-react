import Game from './Game'
import Helmet from 'react-helmet'
import Instructions from './Instructions'
import LabPage from '../../components/LabPage'
import Leaderboard from './Leaderboard'
import ModeSelector from '../../components/ModeSelector'
import React from 'react'
import Title from '../../components/Title'
import styled from 'styled-components'

const GameContainer = styled.div`
.button {
    border: 2px solid;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8em;
    padding: 2px 4px;

    &:hover {
        color: grey;
    }
}
`

const Menu = styled.div`
text-align: center;

    div {
        background: skyblue;
        border: 2px solid;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #CCC;
        color: steelblue;
        cursor: pointer;
        margin: 10px auto;
        padding: 10px;
        width: 200px;
        transition: all 0.2s;

        &:hover {
            background: yellowgreen;
            box-shadow: 2px 2px 4px #DDD;
            color: white;
        }
    }
`

export default class SetGame extends React.Component {
    constructor() {
        super()
        this.state = {
            difficulty: 0,
            display: 0,
            gameOver: false,
            hints: 0,
            score: 0,
            time: 0,
            timed: false
        }
    }

    setDifficulty(difficulty) {
        this.setState({ difficulty })
    }

    setTimed(timed) {
        this.setState({ timed })
    }

    showView(display) {
        this.setState({ display })
        if (display === 2) {
            this.updateStats(0, 0, 0, false)
        }
    }

    updateStats(score, hints, time, gameOver) {
        this.setState({ score, hints, time, gameOver })
        if (gameOver) {
            this.showView(3)
        }
    }

    render() {
        return (
            <LabPage>
                <Title>Set</Title>
                <GameContainer>
                    {this.state.display > 0 &&
                        <div className="button" onClick={this.showView.bind(this, 0)}>Back</div>}
                    {{
                        0: (
                            <Menu>
                                {/* <div onClick={this.showView.bind(this, 1)}>Instructions</div> */}
                                <div onClick={this.showView.bind(this, 2)}>Play Game</div>
                                {/* <div onClick={this.showView.bind(this, 2)}>Resume Game</div> */}
                                <div onClick={this.showView.bind(this, 4)}>Leaderboard</div>
                            </Menu>
                        ),
                        1: (
                            <Instructions></Instructions>
                        ),
                        2: (
                            <ModeSelector>
                                <div>
                                    <label className={`sans-serif ${this.state.difficulty === 0 ? 'chosen' : ''}`} onClick={this.setDifficulty.bind(this, 0)}>Easy</label>
                                    {this.state.difficulty === 0 && <div className="fa-holder"><i className="fa fa-toggle-off"></i></div>}
                                    {this.state.difficulty === 1 && <div className="fa-holder"><i className="fa fa-toggle-on"></i></div>}
                                    <label className={`sans-serif ${this.state.difficulty === 1 ? 'chosen' : ''}`} onClick={this.setDifficulty.bind(this, 1)}>Medium</label>
                                </div>
                                <div>
                                    <label className={`sans-serif ${!this.state.timed ? 'chosen' : ''}`} onClick={this.setTimed.bind(this, false)}>Free</label>
                                    {this.state.timed === false && <div className="fa-holder"><i className="fa fa-toggle-off"></i></div>}
                                    {this.state.timed === true && <div className="fa-holder"><i className="fa fa-toggle-on"></i></div>}
                                    <label className={`sans-serif ${this.state.timed ? 'chosen' : ''}`} onClick={this.setTimed.bind(this, true)}>Timed</label>
                                </div>
                                <div className="button" onClick={this.showView.bind(this, 3)}>Start</div>
                            </ModeSelector>
                        ),
                        3: (
                            <Game
                                difficulty={this.state.difficulty}
                                timed={this.state.timed}
                                updateStats={this.updateStats.bind(this)}>
                            </Game>
                        ),
                        4: (
                            <Leaderboard 
                                gameOver={this.state.gameOver}
                                score={this.state.score}
                                hints={this.state.hints}
                                time={this.state.time}>
                            </Leaderboard>
                        )
                    }[this.state.display]}
                </GameContainer>
                <Helmet title='Set' />
            </LabPage>
        )
    }
}
