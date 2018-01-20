import Helmet from 'react-helmet'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'

export default () => (
  <Page>
    <Title>Not Found!</Title>
    <Helmet title='404' />
  </Page>
)
