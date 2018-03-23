import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'

const COLORS = ['#FFB300', '#803E75', '#FF6800', '#A6BDD7', '#C10020', '#CEA262', '#817066',
'#007D34', '#F6768E', '#00538A', '#FF7A5C', '#53377A', '#FF8E00', '#B32851', '#FFFFFF',
'#F4C800', '#7F180D', '#93AA00', '#593315', '#F13A13', '#232C16', '#0000FF', '#000000',
'#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#FF8080', '#808080', '#800000', '#FF8000']

export default class Voronoi extends React.Component {
    constructor() {
        super()
        this.canvas = null
        this.count = 0
        this.state = { cells: 4, stats: '' }
        this.updateSize = this.updateSize.bind(this)
        this.setCells = this.setCells.bind(this)
    }

    componentDidMount() {
        this.updateSize()
        window.addEventListener('resize', this.updateSize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize.bind(this))
    }

    setCells(event) {
        this.setState({ cells: event.target.value })
        this.count = 0
        this.draw()
    }

    updateSize() {
        this.canvas.width = this.canvas.parentElement.clientWidth
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
        this.count = 0
        const date = new Date()
        const ctx = this.canvas.getContext('2d')
        const cells = this.state.cells
        const imgx = this.canvas.width
        const imgy = this.canvas.height
        const nx = []
        const ny = []
        const nc = []
        for (let i = 0; i < cells; i++) {
            nx.push(10 + this.getRand(imgx - 10))
            ny.push(10 + this.getRand(imgy - 10))
            nc.push(COLORS[i % COLORS.length])
        }
        ctx.clearRect(0, 0, imgx, imgy)
        const hyp = this.getHyp(imgx - 1, imgy - 1)
        for (let y = 0; y < imgy; y++) {
            let d = {}
            this.getColorMapForRow(y, hyp, cells, nx, ny, 0, imgx, d)
            Object.keys(d).forEach(i => {
                const [start, end] = d[i]
                ctx.strokeStyle = nc[i]
                ctx.beginPath()
                ctx.moveTo(start, y)
                ctx.lineTo(end, y)
                ctx.stroke()
            })
        }
        ctx.fillStyle = 'rgba(0,0,0,0.50)'
        for (let i = 0; i < cells; i++) {
            ctx.beginPath()
            ctx.arc(nx[i], ny[i], 4, 0, Math.PI * 2)
            ctx.fill()
        }
        this.setState({ stats: `${new Date() - date} ms - ${this.count} ops` })
    }

    getColorKey(x, y, hyp, cells, nx, ny) {
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

    setVal(d, key, min, max) {
        let a, b
        if (d[key]) {
            [a, b] = d[key]
        } else {
            a = Number.MAX_SAFE_INTEGER
            b = -1
        }
        d[key] = [Math.min(min, a), Math.max(max, b)]
    }

    getColorMapForRow(y, hyp, cells, nx, ny, min, max, d) {
        const a = this.getColorKey(min, y, hyp, cells, nx, ny)
        const c = this.getColorKey(max, y, hyp, cells, nx, ny)
        if (a === c) {
            this.setVal(d, a, min, max)
            return
        }
        if (max - min <= 1) {
            this.setVal(d, a, min, min)
            this.setVal(d, c, max, max)
            return
        }
        const mid = min + Math.floor((max - min) / 2)
        const b = this.getColorKey(mid, y, hyp, cells, nx, ny)
        if (a === b) {
            this.setVal(d, a, min, mid)
            this.getColorMapForRow(y, hyp, cells, nx, ny, mid, max, d)
        } else if (b === c) {
            this.setVal(d, c, mid, max)
            this.getColorMapForRow(y, hyp, cells, nx, ny, min, mid, d)
        } else {
            this.getColorMapForRow(y, hyp, cells, nx, ny, mid, max, d)
            this.getColorMapForRow(y, hyp, cells, nx, ny, min, mid, d)
        }
    }

    render() {
        return (
            <LabPage>
                <Title>Voronoi</Title>
                <canvas ref={can => { if (can !== null) this.canvas = can }}></canvas>
                <div>
                    <input type="range"
                        min="1" 
                        max="20" 
                        step="1" 
                        value={this.state.cells}
                        onChange={this.setCells} /> {this.state.cells}
                </div>
                <div>{this.state.stats}</div>
                <Helmet title='Voronoi' />
            </LabPage>
        )
    }
}

