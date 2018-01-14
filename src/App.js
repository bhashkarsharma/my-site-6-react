import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import About from './views/About'
import Blog from './views/Blog'
import Helment from 'react-helmet'
import Home from './views/Home'
import Lab from './lab'
import Nav from './components/Nav'
import NavLink from './components/NavLink'
import NoMatch from './views/NoMatch'
import Post from './views/Post'
import React from 'react'
import Title from './components/Title'
import Wrapper from './components/Wrapper'
import { labRoutes } from './lab'

const titles = [
  '𐌁𐌔',
  '𐐒𐐠',
  '𝓑𝓢',
  '𝔅𝔖',
  '𝔹𝕊',
  '𝕭𝕾',
  '𝖡𝖲'
]

const baseRoutes = [
  {
    title: '🏠 Home',
    path: '/',
    component: Home,
    exact: true
  },
  {
    title: '📃 Blog',
    path: '/blog',
    component: Blog,
    exact: true
  },
  {
    title: '🔬 Lab',
    path: '/lab',
    component: Lab,
    exact: true
  },
  {
    title: 'ℹ️ About',
    path: '/about',
    component: About
  },
  {
    path: '/blog/:postUrl',
    component: Post
  }
]
labRoutes.forEach(i => i.path = `/lab/${i.path}`)
const routes = [...baseRoutes, ...labRoutes]

class App extends React.Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Helment titleTemplate={`%s - Bhashkar Sharma`} />
          <div>[ ⚠️ Site Under Construction 🚧 ]</div>
          <Title>{titles[Math.floor(Math.random() * titles.length)]}</Title>
          <Nav>
            {routes.filter((i,e) => e < 4).map((route, i) => (
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
      </Router>
    )
  }
}

export default App
