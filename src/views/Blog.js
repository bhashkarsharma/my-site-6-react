import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Linkbox from'../components/Linkbox'
import Meta from '../components/Meta'
import Page from '../components/Page'
import Posts from '../posts'
import React from 'react'
import styled from 'styled-components'

const LinkTitle = styled.span`
  margin-right: 2vmin;
  text-transform: capitalize;
`

export default class Blog extends React.Component {
  render() {
    return (
      <Page>
        <h1>Blog</h1>
        <Helmet title='Blog' />
        {Posts.map((p,i) => {
          return <Linkbox key={i}>
            <Link to={`/blog/${p.path}`}><LinkTitle>{p.title}</LinkTitle></Link>
            <Meta>{p.date.substring(0, 4)}</Meta>
            {p.categories && <Meta> / {p.categories}</Meta>}
          </Linkbox>
        })}
      </Page>
    )
  }
}
