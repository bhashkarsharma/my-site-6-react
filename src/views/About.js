import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'
import styled from 'styled-components'

const Icons = styled.div`
  font-family: "FontAwesome";
  font-size: 2rem;
  margin: 5vmin 0;
  text-align: center;

  a {
    margin: 0 0.5rem;
    padding: 0.25rem;
    text-decoration: none;

    &:hover {
      background: none;
    }
    
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
    <Title>About</Title>
    <p>I am passionate about the web and great user experiences.</p>
    <p>I spend a lot of time behind the keyboard. Sometimes writing for humans, mostly for computers.</p>
    <p>The excitement of learning new things is the reason I get out of bed in the morning.</p>
    <p>You can find my <a href="/resume/">resume</a> here.</p>
    <p>Read about <Link to='/colophon/'>what went into making this site</Link>.</p>
    <Icons>
      <a href="https://twitter.com/bhashkarsharma">
        <i className="fa fa-twitter"></i>
      </a>
      <a href="https://linkedin.com/in/bhashkarsharma">
        <i className="fa fa-linkedin"></i>
      </a>
      <a href="https://github.com/bhashkarsharma">
        <i className="fa fa-github"></i>
      </a>
      <a href="https://instagram.com/bhashkarsharma">
        <i className="fa fa-instagram"></i>
      </a>
      <a href="http://www.google.com/recaptcha/mailhide/d?k=01SDx7taNN6zHr16t_7ptUow==&c=9O4_ghKVlCH-WzZa1rp7YEyR4f9inkxWAIK9q55KjYs=">
        <i className="fa fa-at"></i>
      </a>
    </Icons>
    <Helmet title='About' />
  </Page>
)
