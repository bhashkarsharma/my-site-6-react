import * as matter from 'gray-matter'

import Helmet from 'react-helmet'
import Markdown from 'react-remarkable'
import Meta from '../components/Meta'
import Page from '../components/Page'
import Posts from '../posts'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Title from '../components/Title'

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { post: { data: { date: '' }, content: '' }, redirect: false }
    }

    componentDidMount() {
        const md = this.fetchPost(this.props.match.params[0])
        md.then(i => {
            if (i && i.status === 200) {
                return i.text()
            }
        }).then(data => {
            this.setState({ post: matter(data) })
        }).catch(err => {
            this.setState({ redirect: true })
        })
    }
    
    fetchPost(url) {
        const filtered = Posts.filter(p => p.path === url)
        if (filtered.length > 0) {
            return fetch('/posts/' + filtered[0].path.split('/').join('-') + '.md')
        } else {
            return new Promise(i => { i(null) })
        }
    }

    render() {
        const options = { html: true }
        return (
        <Page>
            <Title>{this.state.post.data.title}</Title>
            {this.state.post.data.categories &&
                <Meta> Published in <strong>{this.state.post.data.categories}</strong></Meta>}
            <Meta> on {this.state.post.data.date.substring(0, 10)}</Meta>
            <Markdown source={this.state.post.content} options={options} />
            <Helmet title={this.state.post.data.title} />
            {this.state.redirect && <Redirect to='/404' />}
        </Page>
        )
    }
}
