import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'
import styled from 'styled-components'

const VoronoiContainer = styled.canvas`
border: 1px solid;
`

export default class Voronoi extends React.Component {
    constructor() {
        super()
        this.canvas = null
        this.count = 0
    }
    
    componentDidMount() {
        this.updateSize()
        window.addEventListener('resize', this.updateSize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize.bind(this))
    }

    updateSize() {
        this.canvas.width = 40 //window.innerWidth
        this.canvas.height = 40 //window.innerHeight
        this.draw()
    }

    getRand(range) {
        return Math.floor(Math.random() * range)
    }

    getHyp(x, y) {
        this.count++
        return Math.hypot(x, y)
    }

    draw() {
        console.log(this.canvas)
        const date = new Date()
        const ctx = this.canvas.getContext('2d')
        const cells = 2
        const imgx = this.canvas.width
        const imgy = this.canvas.height
        const nx = []
        const ny = []
        const nr = []
        const ng = []
        const nb = []
        for (let i=0; i<cells; i++) {
            nx.push(this.getRand(imgx))
            ny.push(this.getRand(imgy))
            nr.push(this.getRand(256))
            ng.push(this.getRand(256))
            nb.push(this.getRand(256))
        }
        console.log(nx, ny)
        const hyp = this.getHyp(imgx - 1, imgy - 1)
        for (let y=0; y<imgy; y++) {
            for (let x=0; x<imgx; x++) {
                let dmin = hyp
                let j = -1
                for (let i=0; i<cells; i++) {
                    const d = this.getHyp(nx[i] - x, ny[i] - y)
                    console.log(nx[i] - x, ny[i] - y, Math.floor(d))
                    if (d < dmin) {
                        dmin = d
                        j = i
                    }
                }
                ctx.fillStyle = `rgb(${nr[j]},${ng[j]},${nb[j]})`
                ctx.fillRect(x, y, 1, 1)
            }
        }
        ctx.fillStyle = 'black'
        for (let i=0; i<cells; i++) {
            ctx.beginPath()
            ctx.arc(nx[i], ny[i], 4, 0, Math.PI*2)
            ctx.fill()
        }
        console.log(new Date() - date, this.count)
    }

    render() {
        return (
            <LabPage>
                <Title>Voronoi</Title>
                <canvas ref={can => { this.canvas = can }}></canvas>
                <Helmet title='Voronoi' />
            </LabPage>
        )
    }
}
