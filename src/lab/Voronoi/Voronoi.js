import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'

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
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
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
        const date = new Date()
        const ctx = this.canvas.getContext('2d')
        const cells = 10
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
        const step = 10
        const hyp = this.getHyp(imgx - 1, imgy - 1)
        for (let y=0; y<imgy; y+=step) {
            for (let x=0; x<imgx; x+=step) {
                let dmin = hyp
                let j = -1
                for (let i=0; i<cells; i++) {
                    const d = this.getHyp(nx[i] - x, ny[i] - y)
                    if (d < dmin) {
                        dmin = d
                        j = i
                    }
                }
                ctx.fillStyle = `rgb(${nr[j]},${ng[j]},${nb[j]})`
                const s = 10
                ctx.fillRect(x, y, s, s)
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
