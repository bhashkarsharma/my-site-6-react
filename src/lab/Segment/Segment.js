import Digit from './Digit'
import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'
import styled from 'styled-components'

const SegmentContainer = styled.div`
    margin: 100px auto;
    max-width: 1140px;

    .error-message {
        display: none;
    }
    .clock {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
    }
`

export default class Segment extends React.Component {
    constructor() {
        super()
        this.state = {
            time: ['0', '0', '0', '0', '0', '0']
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
        let time = []
        const d = [date.getHours(), date.getMinutes(), date.getSeconds()]
        d.forEach(i => {
            if (i >= 10) {
                time = time.concat(String(i).split(''))
            } else {
                time = time.concat(['0', String(i)])
            }
        })
        this.setState({ time })
    }

    render() {
        return (
            <LabPage>
                <Title>Segment</Title>
                <SegmentContainer>
                    <div className="error-message">Your screen is too small.
                    Try viewing in landscape mode, or use a bigger device.</div>
                    <div className="clock">
                        {
                            this.state.time.map((i, k) => {
                                return <Digit key={k} val={i}></Digit>
                            })
                        }
                    </div>
                </SegmentContainer>
                <Helmet title='Segment' />
            </LabPage>
        )
    }
}
