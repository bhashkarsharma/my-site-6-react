import Helmet from 'react-helmet'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'

export default () => (
    <Page>
      <Title>Colophon</Title>
      <p>This website is powered using modern web technology.</p>
      <p>The underlying tools and principles include:</p>
      <ul>
          <li>Minimalist design</li>
          <li>Progressive WebApp</li>
          <li>React</li>
          <li>React-Snapshot</li>
          <li>Styled-Components</li>
          <li>Markdown</li>
          <li>S3 and Cloudfront</li>
          <li>Github</li>
          <li>Travis-CI</li>
      </ul>
          <p>...and more.</p>
          <p>Minimum external resources are loaded, to keep the site snappy and performant.</p>
      <Helmet title='Colophon' />
    </Page>
  )
  