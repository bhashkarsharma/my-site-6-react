import Face from './Face'
import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import ModeSelector from '../../components/ModeSelector'
import React from 'react'
import Title from '../../components/Title'
import styled from 'styled-components'

const DigilogContainer = styled.div`
margin: 2vw auto;
max-width: 1140px;

.face-box {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}
`

export default class Digilog extends React.Component {
    constructor() {
        super()
        this.state = {
            hh: 0,
            mm: 0,
            mode: 1,
            time: [0, 0, 0, 0, 0, 0]
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount() {
        this.tick()
        this.interval = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    tick() {
        const date = new Date()
        if (this.state.mode === 0) {
            const h = date.getHours()
            const m = date.getMinutes()
            const mm = 6 * m - 90
            const hh = 0.5 * (60 * h + m) - 90
            this.setState({ hh, mm })
        } else {
            let time = []
            const bits = [date.getHours(), date.getMinutes(), date.getSeconds()]
            bits.forEach(i => {
                if (i >= 10) {
                    time = time.concat(String(i).split(''))
                } else {
                    time = time.concat(['0', String(i)])
                }
            });
            this.setState({ time })
        }
    }

    switchMode(mode) {
        this.setState({ mode })
    }

    render() {
        return (
            <LabPage>
                <Title>Digilog</Title>
                <DigilogContainer>
                    <div className="face-box">
                    {
                        this.state.time.map((i, k) => {
                            return <Face mode={this.state.mode} hh={this.state.hh} mm={this.state.mm} val={i} key={k}></Face> 
                        })
                    }
                    </div>
                    <ModeSelector>
                        <div>
                            <label className={`sans-serif ${this.state.mode === 0 ? 'chosen' : ''}`} onClick={this.switchMode.bind(this, 0)}>Analog</label>
                            {this.state.mode === 0 && <div className="fa-holder"><i className="fa fa-toggle-off"></i></div>}
                            {this.state.mode === 1 && <div className="fa-holder"><i className="fa fa-toggle-on"></i></div>}
                            <label className={`sans-serif ${this.state.mode === 1 ? 'chosen' : ''}`} onClick={this.switchMode.bind(this, 1)}>Digital</label>
                        </div>
                    </ModeSelector>
                </DigilogContainer>
                <Helmet title='Digilog' />
            </LabPage>
        )
    }
}
