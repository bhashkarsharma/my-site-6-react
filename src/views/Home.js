import Bg from '../components/Bg'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import React from 'react'
import Title from '../components/Title'

export default () => (
  <Page>
    <Title>Welcome</Title>
    <Bg />
    <Helmet title='Home' />
  </Page>
)
