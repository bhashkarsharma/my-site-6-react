import Helmet from 'react-helmet'
import Helvetica from './Helvetica/Helvetica'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import React from 'react'
import Segment from './Segment/Segment'
import styled from 'styled-components'

export const labRoutes = [
    {
        title: 'Helvetica',
        path: 'helvetica',
        component: Helvetica
    },
    {
        title: 'Segment',
        path: 'segment',
        component: Segment
    }
]

const LinkBox = styled.div`
    margin: 2vw 0;
`

const Title = styled.div`
  text-transform: capitalize;
`

export default class Lab extends React.Component {
    render() {
        return <Page>
            <h1>Lab</h1>
            {labRoutes.map((r, i) => (
                <LinkBox>
                    <Link key={i} to={`${r.path}`}><Title>{r.title}</Title></Link>
                </LinkBox>
            ))}
            <Helmet title='Lab' />
        </Page>
    }
}