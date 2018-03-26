import Digilog from './Digilog/Digilog'
import Helmet from 'react-helmet'
import Helvetica from './Helvetica/Helvetica'
import { Link } from 'react-router-dom'
import Linkbox from '../components/Linkbox'
import Page from '../components/Page'
import Particles from './Particles/Particles'
import React from 'react'
import Segment from './Segment/Segment'
import SetGame from './Set/SetGame'
import Title from '../components/Title'
import Voronoi from './Voronoi/Voronoi'
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
    },
    {
        title: 'Digilog',
        path: 'digilog',
        component: Digilog
    },
    {
        title: 'Set',
        path: 'set',
        component: SetGame
    },
    {
        title: 'Voronoi',
        path: 'voronoi',
        component: Voronoi
    },
    {
        title: 'Particles',
        path: 'particles',
        component: Particles
    }
]

const LinkTitle = styled.span`
  margin-right: 0.5rem;
  text-transform: capitalize;
`

export default class Lab extends React.Component {
    render() {
        return <Page style={{textAlign: 'center'}}>
            <Title>Lab</Title>
            {labRoutes.map((r, i) => (
                <Linkbox key={i}>
                    <Link to={`${r.path}`}><LinkTitle>{r.title}</LinkTitle></Link>
                </Linkbox>
            ))}
            <Helmet title='Lab' />
        </Page>
    }
}
