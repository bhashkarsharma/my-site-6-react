import './App.css'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import About from './views/About'
// import Bg from './components/Bg'
import Blog from './views/Blog'
import Colophon from './views/Colophon'
import Helment from 'react-helmet'
import Home from './views/Home'
import Lab from './lab'
import Logo from './components/Logo'
import Nav from './components/Nav'
import NavLink from './components/NavLink'
import NoMatch from './views/NoMatch'
import Post from './views/Post'
import React from 'react'
import Resume from './views/Resume'
import Wrapper from './components/Wrapper'
import { labRoutes } from './lab'

const baseRoutes = [
  {
    title: '🏠 Home',
    path: '/',
    component: Home,
    exact: true
  },
  {
    title: '📃 Blog',
    path: '/blog/',
    component: Blog,
    exact: true
  },
  {
    title: '🔬 Lab',
    path: '/lab/',
    component: Lab,
    exact: true
  },
  {
    title: 'ℹ️ About',
    path: '/about/',
    component: About,
    exact: true
  },
  {
    path: '/blog/*/',
    component: Post
  },
  {
    path: '/colophon/',
    component: Colophon,
    exact: true
  },
  {
    path: '/resume/',
    component: Resume,
    exact: true
  }
]
labRoutes.forEach(i => i.path = `/lab/${i.path}/`)
const routes = [...baseRoutes, ...labRoutes]

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Bg/> */}
          <Wrapper>
            <Helment titleTemplate={`%s - Bhashkar Sharma`} />
            <Logo />
            <Nav>
              {routes.filter((i, e) => e < 4).map((route, i) => (
                <NavLink key={i} {...route} />
              ))}
            </Nav>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
              <Route component={NoMatch} />
            </Switch>
          </Wrapper>
        </div>
      </Router>
    )
  }
}
