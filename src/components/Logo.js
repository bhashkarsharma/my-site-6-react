import React from 'react'
import styled from 'styled-components'

const LogoBox = styled.div`
text-align: center;
.bg {
    background: #333;
    border-radius: 50%;
    color: white;
    display: inline-block;
    padding: 30px;
    transition: all 0.5s;

    &:hover {
        transform: rotate(180deg);
    }
}
.logo {
    backface-visibility: visible;
    height: 50px;
    position: relative;
    width: 50px;

    .letter {
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        width: 50%;

        div {
            border: 3px solid;
            box-sizing: border-box;
            height: 25%;
            &:nth-child(1) {
                border-bottom-width: 0;
                border-top-right-radius: 100%;
            }
            &:nth-child(2) {
                border-bottom-right-radius: 100%;
                border-bottom-width: 0;
                border-top-width: 0;
            }
            &:nth-child(3) {
                border-bottom-width: 0;
                border-left-width: 0;
                border-top-right-radius: 100%;
            }
            &:nth-child(4) {
                border-bottom-right-radius: 100%;
                border-top-width: 0;
            }
        }

        &:last-child {
            transform: scale(-1, -1);
        }
    }
}
`

export default ({path, exact, ...props}) => (
    <LogoBox>
        <div className="bg">
            <div className="logo">
                <div className="letter"><div/><div/><div/><div/></div>
                <div className="letter"><div/><div/><div/><div/></div>
            </div>
        </div>
    </LogoBox>
)
