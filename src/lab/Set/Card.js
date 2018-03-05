import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
--card-shadow: 0px 0px 4px 3px;

    @keyframes zoominout {
        0% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(1.05, 1.05);
        }
        100% {
            transform: scale(1, 1);
        }
    }

    @keyframes shake {
        20% {
            transform: translate3d(-3px, 0, 0);
        }
        80% {
            transform: translate3d(3px, 0, 0);
        }
    }

    @keyframes jiggle {
        20% {
            transform: rotate(-1deg);
        }
        80% {
            transform: rotate(1deg);
        }
    }

    .inner {
        background-color: white;
        border: 1px solid #333;
        border-radius: 5px;
        height: 100px;
        margin: 5px;
        overflow: hidden;
        padding: 10px;
        text-align: center;
        transition: all .2s ease-in-out;

        &.red {
            color: #E74C3C;
        }
    
        &.green {
            color: #27AE60;
        }
    
        &.blue {
            color: #2980B9;
        }

        &.clicked {
            box-shadow: var(--card-shadow) #555;
        }
        
        &.error {
            animation: shake 0.5s infinite;
            box-shadow: var(--card-shadow) #ff2f00;
        }
        
        &.hint {
            animation: jiggle 0.5s infinite;
            box-shadow: var(--card-shadow) #0077ff;
        }

        &.success {
            animation: zoominout 1s infinite;
            box-shadow: var(--card-shadow) #00ff00;
            filter: blur(2px);
        }

        div {
            &:nth-child(1):nth-last-child(1) {
                margin: 30px auto;
            }
    
            &:nth-child(1):nth-last-child(2),
            &:nth-child(2):nth-last-child(1) {
                margin: 10px auto;
            }

            .fa-stack {
                font-size: 14px;
            }
        }
    }

    .icon {
        margin: auto;
    }
`

export default class Card extends React.Component {
    render() {
        return (
            <CardContainer>
                <div
                    className={`inner ${this.props.conf.color} ${this.props.conf.shape} ${this.props.conf.fill} ${this.props.conf.clicked ? 'clicked' : ''} ${this.props.conf.visual}`}
                    onClick={this.props.onClick}>
                    {
                        Array.from(Array(this.props.conf.count).keys()).map((i, k) => {
                            const fill = this.props.conf.fill === 'empty' ? (this.props.conf.shape === 'circle' ? '-thin' : '-o') : ''
                            return <div key={k}>
                                {this.props.conf.fill === 'shaded' ?
                                    <span className='fa-stack'>
                                        <i className={`fa fa-${this.props.conf.shape}${fill} fa-stack-2x`}></i>
                                        <i className={`fa fa-${this.props.conf.shape}${fill} fa-inverse fa-stack-1x`}></i>
                                    </span> :
                                    <i className={`fa fa-${this.props.conf.shape}${fill}`} aria-hidden='true'></i>
                                }
                            </div>
                        })
                    }
                </div>
            </CardContainer>
        )
    }
}
