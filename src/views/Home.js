import Helmet from 'react-helmet'
// import { Link } from 'react-router-dom'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'
import styled from 'styled-components'

const Tools = styled.div`
  text-align: center;
  div {
    display: inline-block;
    font-size: 1.2em;
    margin-bottom: 1vw;
    margin-left: 1vw;

    &:after {
      content: "\f111";
      font-family: "FontAwesome";
      font-size: 0.3em;
      margin-left: 1vw;
      vertical-align: top;
    }

    &:last-child:after {
      content: none;
    }
  }
`

export default () => (
  <Page>
    {/* <p>Welcome to my website. I like to<span> </span>
      <Link to="/blog">write</Link><span>, </span>
      <Link to="/click">click</Link><span>, </span>
      <Link to="/draw">draw</Link><span>, </span>
      and <Link to="/reading">read</Link> when I'm not sleeping.</p> */}
      <p>Welcome to my website. I like to write, click, draw, and read when I'm not sleeping.</p>
    <Title>Tools</Title>
    <Tools>
        <div>Angular</div>
        <div>AWS</div>
        <div>Gulp</div>
        <div>CSS3</div>
        <div>HTML5</div>
        <div>JS</div>
        <div>Node</div>
        <div>Python</div>
        <div>React</div>
        <div>Sass</div>
    </Tools>
    <Helmet title='Home' />
  </Page>
)
