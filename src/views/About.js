import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import React from 'react'
import styled from 'styled-components'

const Icons = styled.div`
  font-family: "FontAwesome";
  font-size: 10vmin;
  margin: 5vmin 0;
  text-align: center;

  a {
    margin: 0 1vmin;
    padding: 0.5vmin;
    text-decoration: none;
    &:before, &:after {
      display: none;
    }

    .fa-at:hover {
      color: #8e8e8e;
    }
    .fa-github:hover {
      color: #55a532;
    }
    .fa-instagram:hover {
      color: #d047d1;
    }
    .fa-linkedin:hover {
      color: #007bb6;
    }
    .fa-twitter:hover {
      color: #55acee;
    }
  }
`

export default () => (
  <Page>
    <h1>About</h1>
    <p>I am passionate about an open web and great user experiences.</p>
    <p>I love books; and attempt to write at times. I enjoy sharing my learnings on <a href="http://quora.com/Bhashkar-Sharma">Quora</a>, among other places.</p>
    <p>The excitement of learning new things is the reason I get out of bed in the morning.</p>
    <p>You can find my <a href="http://static.bhashkar.me/Resume_Jan2017.pdf">resume</a> here.</p>
    <Icons>
      <a href="https://twitter.com/bhashkarsharma">
          <i className="fab fa-twitter"></i>
      </a>
      <a href="https://linkedin.com/in/bhashkarsharma">
          <i className="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/bhashkarsharma">
          <i className="fab fa-github"></i>
      </a>
      <a href="https://instagram.com/bhashkarsharma">
          <i className="fab fa-instagram"></i>
      </a>
      <a href="http://www.google.com/recaptcha/mailhide/d?k=01SDx7taNN6zHr16t_7ptUow==&c=9O4_ghKVlCH-WzZa1rp7YEyR4f9inkxWAIK9q55KjYs=">
          <i className="fas fa-at"></i>
      </a>
    </Icons>
    <p>Read about <Link to='/colophon'>how this site was made</Link>.</p>
    <Helmet title='About' />
  </Page>
)
