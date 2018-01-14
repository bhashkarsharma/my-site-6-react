import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Posts from '../posts'
import React from 'react'
import styled from 'styled-components'

const Title = styled.span`
  margin-right: 2vmin;
  text-transform: capitalize;
`

const Meta = styled.span`
  color: #999;
  font-size: 0.6em;
`

export default class Blog extends React.Component {
  render() {
    return (
      <Page>
        <h1>Blog</h1>
        <Helmet title='Blog' />
        {Posts.map((p,i) => {
          return <div key={i}>
            <Link to={`/blog/${p.path}`}><Title>{p.title}</Title></Link>
            <Meta>{p.date}</Meta>
          </div>
        })}
      </Page>
    )
  }
}