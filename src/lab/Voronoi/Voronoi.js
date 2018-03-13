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
        const nc = []
        for (let i = 0; i < cells; i++) {
            nx.push(this.getRand(imgx))
            ny.push(this.getRand(imgy))
            nc.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
        }
        const step = 10
        const hyp = this.getHyp(imgx - 1, imgy - 1)
        for (let y = 0; y < imgy; y += step) {
            for (let x = 0; x < imgx; x += step) {
                const j = this.getColorIndex(cells, x, y, nx, ny, hyp)
                ctx.fillStyle = nc[j]
                const s = 8
                ctx.fillRect(x, y, s, s)
            }
        }
        ctx.fillStyle = 'black'
        for (let i = 0; i < cells; i++) {
            ctx.beginPath()
            ctx.arc(nx[i], ny[i], 4, 0, Math.PI * 2)
            ctx.fill()
        }
        console.log(new Date() - date, this.count)
    }

    getColorIndex(cells, x, y, nx, ny, hyp) {
        let dmin = hyp
        let j = -1
        for (let i = 0; i < cells; i++) {
            const d = this.getHyp(nx[i] - x, ny[i] - y)
            if (d < dmin) {
                dmin = d
                j = i
            }
        }
        return j
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
