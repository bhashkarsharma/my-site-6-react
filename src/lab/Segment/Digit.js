import React from 'react'
import styled from 'styled-components'

const Dig = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 16vw;
    margin: 2vw 1vw;
    position: relative;
    width: 9vw;

    .node {
        position: absolute;

        .edge {
            background: #444;
            border: 1px solid #555;
            border-radius: 1vw;
            box-shadow: 1px 1px 1px #DDD;
            height: 4.75vw;
            position: absolute;
            transition-duration: 0.5s;
            transform-origin: 0.75vw 0.75vw;
            width: 1.5vw;

            &.mask {
                background: #DDD;
                border: 1px solid #555;
                box-shadow: 1px 1px 1px #DDD;
                z-index: 2;
            }
        }

        .knob {
            background: #444;
            border: 1px solid #555;
            border-radius: 1vw;
            box-shadow: 1px 1px 1px #DDD;
            height: 1.5vw;
            position: absolute;
            width: 1.5vw;
            z-index: 3;

            .inner {
                background: #444;
                border: 1px solid #555;
                border-radius: 1vw;
                height: 0.5vw;
                left: 0.45vw;
                position: absolute;
                top: 0.45vw;
                width: 0.5vw;
            }
        }

        &:nth-child(1) {
            left: 0;
            top: 0;

            .edge.mask {

                &:nth-child(3) {
                    transform: rotateZ(90deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(180deg);
                }
            }
        }
        
        &:nth-child(2) {
            left: 5vw;
            top: 0;

            .edge.mask {
                
                &:nth-child(3) {
                    transform: rotateZ(270deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(180deg);
                }
            }
        }
        
        &:nth-child(3) {
            left: 0;
            top: 5vw;

            .edge.mask {
                
                &:nth-child(3) {
                    transform: rotateZ(90deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(90deg);
                }
            }
        }
        
        &:nth-child(4) {
            left: 5vw;
            top: 5vw;

            .edge.mask {
                
                &:nth-child(3) {
                    transform: rotateZ(270deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(270deg);
                }
            }
        }
        
        &:nth-child(5) {
            left: 0;
            top: 10vw;

            .edge.mask {
                
                &:nth-child(3) {
                    transform: rotateZ(0deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(90deg);
                }
            }
        }
        
        &:nth-child(6) {
            left: 5vw;
            top: 10vw;

            .edge.mask {
                
                &:nth-child(3) {
                    transform: rotateZ(0deg);
                }

                &:nth-child(4) {
                    transform: rotateZ(270deg);
                }
            }
        }
    }
`

export default class Digit extends React.Component {
    constructor(props) {
        super(props)
        this.pattern = {
            0: [4, 2, 0, 2, 4, 2, 0, 6, 4, 6, 6, 0],
            1: [4, 2, 0, 1, 5, 2, 0, 6, 0, 2, 6, 0],
            2: [4, 2, 0, 2, 2, 2, 1, 6, 5, 6, 6, 0],
            3: [4, 2, 1, 2, 5, 6, 1, 6, 5, 0, 6, 0],
            4: [4, 2, 1, 0, 5, 6, 0, 6, 2, 0, 6, 0],
            5: [4, 2, 2, 6, 4, 6, 0, 2, 2, 0, 6, 2],
            6: [4, 2, 1, 6, 5, 6, 0, 2, 4, 6, 6, 2],
            7: [4, 2, 1, 2, 5, 0, 6, 6, 2, 0, 6, 0],
            8: [0, 6, 0, 2, 6, 0, 0, 6, 2, 6, 6, 0],
            9: [0, 6, 0, 2, 6, 2, 1, 2, 2, 5, 6, 0]
        }
    }

    render() {
        return (
            <Dig>
            {
                [0, 1, 2, 3, 4, 5].map((i, k) => {
                    const trans1 = {
                        transform: `rotateZ(${this.pattern[this.props.val][2*i] * 45}deg)`
                    };
                    const trans2 = {
                        transform: `rotateZ(${this.pattern[this.props.val][2*i + 1] * 45}deg)`
                    };
                    return <div key={k} className="node">
                        <div className="edge" style={trans1}></div>
                        <div className="edge" style={trans2}></div>
                        <div className="edge mask"></div>
                        <div className="edge mask"></div>
                        <div className="knob">
                            <div className="inner"></div>
                        </div>
                    </div>
                })
            }
            </Dig>
        )
    }
}
