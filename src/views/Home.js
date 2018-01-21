import Helmet from 'react-helmet'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'
import styled from 'styled-components'

const Tools = styled.div`
  text-align: center;
  div {
    display: inline-block;
    font-size: 8vmin;
    margin: 2vmin;
  }
`

export default () => (
  <Page>
    <p>Welcome to my website. I like to write, click, draw, and read when I'm not sleeping.</p>
    <Title>Tools</Title>
    <Tools>
        <div><i className="fab fa-angular"></i></div>
        <div><i className="fab fa-aws"></i></div>
        <div><i className="fab fa-gulp"></i></div>
        <div><i className="fab fa-css3-alt"></i></div>
        <div><i className="fab fa-html5"></i></div>
        <div><i className="fab fa-js"></i></div>
        <div><i className="fab fa-node"></i></div>
        <div><i className="fab fa-python"></i></div>
        <div><i className="fab fa-react"></i></div>
        <div><i className="fab fa-sass"></i></div>
    </Tools>
    <Helmet title='Home' />
  </Page>
)
