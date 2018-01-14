import Helmet from 'react-helmet'
import Page from '../components/Page'
import React from 'react'

export default () => (
    <Page>
      <h1>Colophon</h1>
      <p>This website is powered using modern web technology.</p>
      <p>The underlying tools include:</p>
      <ul>
          <li>Create-React-App</li>
          <li>Styled-Components</li>
          <li>React-Snapshot</li>
          <li>Markdown</li>
          <li>S3 and Cloudfront</li>
          <li>Github</li>
          <li>Travis-CI</li>
      </ul>
          ...and more
      <Helmet title='Colophon' />
    </Page>
  )
  