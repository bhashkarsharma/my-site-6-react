import { Link, Route } from 'react-router-dom'

import React from 'react'
import styled from 'styled-components'

const NavLink = styled.div`
  a {
    transition: color 0.2s, border-bottom-color 0.2s;
    color: ${props => props.active ? 'deepskyblue' : '#666'};
    text-decoration: none;

    &:hover, &:active, &:focus {
      background: none;
      color: ${props => props.active ? 'deepskyblue' : '#222'};
    }
    
    &:before, &:after {
      display: none;
    }
  }
`

export default ({path, exact, ...props}) => (
  <Route path={path} exact={exact} children={({match}) => (
    <NavLink active={match}>
      <Link to={path}>{props.title}</Link>
    </NavLink>
  )} />
)
