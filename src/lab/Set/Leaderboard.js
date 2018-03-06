import Fire from './firebase/Fire'
import React from 'react'
import styled from 'styled-components'

const LeaderboardContainer = styled.div`
animation: rainbow 18s ease infinite;
background: linear-gradient(90deg, #ff2400, #e81d1d, #e8b71d, #e3e81d,
            #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
background-size: 1800% 1800%;
padding: 20px;
text-align: center;

    .scoreForm {
        margin: 10px 0;

        input {
            color: #333;
            line-height: 1.5em;
            padding: 5px;
        }

        button {
            font-size: 1em;
            padding: 10px 15px;
        }

    }
    
    .scoreboard {
        border: 1px solid;
        width: 100%;

        thead {
            border-bottom: 1px solid;
        }
        
        th, td {
            padding: 5px;
            text-align: center;
        }
    }

    @keyframes rainbow { 
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position:100% 19%;
        }
        100% {
            background-position:0% 82%;
        }
    }
`

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            top: [],
            saved: false
        }
    }

    componentDidMount() {
        this.scoreDB = Fire.database().ref('leaderboard')
        this.scorelistRef = this.scoreDB.child('scoreList')
        this.highestScoreRef = this.scoreDB.child('highestScore')
        this.getTopScores()
    }

    getTopScores() {
        const scoreList = this.scorelistRef.limitToLast(10)
        scoreList.once('value', snap => {
            const val = snap.val()
            const top = []
            Object.keys(val).forEach(i => {
                top.push(val[i])
            })
            top.sort((a, b) => b.score - a.score)
            this.setState({ top })
        })
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    saveScore() {
        const name = this.state.name
        const score = this.props.score
        const hints = this.props.hints
        const time = this.props.time
        if (name.length > 0) {
            const userScoreRef = this.scorelistRef.child(name)
            userScoreRef.setWithPriority({ name, score, hints, time }, score)

            this.highestScoreRef.transaction((currHigh) => {
                if (currHigh === null || score > currHigh) {
                    return score
                }
                return
            })
            
            this.setState({ saved: true })
        }
    }

    render() {
        return (
            <LeaderboardContainer>
                {(this.props.gameOver && !this.state.saved) ? 
                <div className="scoreForm">
                    <input
                        type="text"
                        placeholder="Name"
                        maxLength="20"
                        value={this.state.name}
                        onChange={this.handleNameChange.bind(this)} />
                    <button onClick={this.saveScore.bind(this)}>Save</button>
                </div> :
                <div>
                    {this.state.top.length > 0 ? 
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                                <th>Time</th>
                                <th>Hints</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.top.map((i, k) => {
                                return <tr key={k}>
                                    <td>{i.name}</td>
                                    <td>{i.score}</td>
                                    <td>{i.time ? i.time : '-'}</td>
                                    <td>{i.hints ? i.hints : '-'}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table> : 
                    <div>Loading...</div>}
                </div>}
            </LeaderboardContainer>
        )
    }
}
