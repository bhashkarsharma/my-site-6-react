import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
--icon_size: 20px;
--icon_inner_diff: 6px;

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
        border: 1px solid;
        border-radius: 5px;
        height: 100px;
        margin: 5px;
        padding: 10px;
        text-align: center;
        transition: all .2s ease-in-out;
    }

    .icon {
        position: relative;
    }

    .square {
        border-style: solid;
        border-width: 2px;
        height: var(--icon_size);
        width: var(--icon_size);
    }

    .round {
        border-style: solid;
        border-width: 2px;
        border-radius: calc(var(--icon_size)/2);
        height: calc(var(--icon_size));
        width: calc(var(--icon_size) * 3/2);
    }

    .triangle {
        border-left: calc(var(--icon_size)/2) solid transparent;
        border-right: calc(var(--icon_size)/2) solid transparent;
        height: 0;
        width: 0;

        &.empty:after {
            content: '';
            border-left: calc((var(--icon_size) - var(--icon_inner_diff))/2) solid transparent;
            border-right: calc((var(--icon_size) - var(--icon_inner_diff))/2) solid transparent;
            border-bottom: calc(var(--icon_size) - var(--icon_inner_diff)) solid white;
            height: 0; 
            left: calc(-(var(--icon_inner_diff) + 1));
            position: absolute;
            top: calc(var(--icon_inner_diff)/2 + 1);
            width: 0;
        }

        &.shaded:before {
            content: '';
            border-left: calc((var(--icon_size) - var(--icon_inner_diff))/2) solid transparent;
            border-right: calc((var(--icon_size) - var(--icon_inner_diff))/2) solid transparent;
            border-bottom: calc(var(--icon_size) - var(--icon_inner_diff)) solid white;
            height: 0; 
            left: calc(-(var(--icon_inner_diff) + 1));
            position: absolute;
            top: calc(var(--icon_inner_diff)/2 + 1);
            width: 0;
        }

        &.shaded:after {
            content: '';
            border-left: calc(var(--icon_size) - var(--icon_inner_diff))/2 solid transparent;
            border-right: calc(var(--icon_size) - var(--icon_inner_diff))/2 solid transparent;
            height: 0; 
            left: -(var(--icon_inner_diff) + 1);
            position: absolute;
            top: (var(--icon_inner_diff)/2) + 1;
            width: 0;
        }
    }
`

export default class Card extends React.Component {
    render() {
        return (
            <CardContainer>
                <div
                    className={`inner ${this.props.conf.color} ${this.props.conf.clicked ? 'clicked' : ''} ${this.props.conf.visual}`}
                    onClick={this.props.onClick}>
                    {
                        Array.from(Array(this.props.conf.count).keys()).map((i, k) => {
                            return <div className={`icon ${this.props.conf.fill} ${this.props.conf.shape}`} key={k}></div>
                        })
                    }
                </div>
            </CardContainer>
        )
    }
}
