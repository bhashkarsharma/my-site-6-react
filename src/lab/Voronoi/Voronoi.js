import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'

export default class Voronoi extends React.Component {
    constructor() {
        super()
        this.canvas = null
        this.count = 0
        this.state = {
            cells: 10,
            hyp: 0,
            nx: [],
            ny: [],
            nc: []
        }
        this.updateSize = this.updateSize.bind(this)
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
        const cells = this.state.cells
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
        const hyp = this.getHyp(imgx - 1, imgy - 1)
        this.setState({ hyp, nx, ny, nc }, () => {console.log('saved')})
        const step = imgx/cells/40
        console.log({ hyp, nx, ny, nc, step, cells })
        for (let y = 0; y < imgy; y += step) {
            for (let x = 0; x < imgx; x += step) {
                const j = this.getColorIndexOld(x, y, hyp, cells, nx, ny)
                ctx.fillStyle = nc[j]
                const s = step + 1
                ctx.fillRect(x, y, s, s)
            }
        }
        ctx.fillStyle = 'black'
        for (let i = 0; i < cells; i++) {
            ctx.beginPath()
            ctx.arc(nx[i], ny[i], 4, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.font = '16px bold sans-serif'
        ctx.fillText(`${new Date() - date}ms`, 10, 20)
        console.log('filled')
    }

    getColorIndexOld(x, y, hyp, cells, nx, ny) {
        let dmin = hyp
        let j = -1
        for (let i = 0; i < cells; i++) {
            const d = this.getHyp(nx[i] - x, ny[i] - y)
            if (d < dmin) {
                dmin = d
                j = i
            }
        }

        // console.log(j)
        return j
    }

    getColorIndex(x, y) {
        const hyp = this.state.hyp
        const cells = this.state.cells
        const nx = this.state.nx
        const ny = this.state.ny
        // console.log({ hyp, nx, ny, cells })
        let dmin = hyp
        let j = -1
        for (let i = 0; i < cells; i++) {
            const d = this.getHyp(nx[i] - x, ny[i] - y)
            if (d < dmin) {
                dmin = d
                j = i
            }
        }

        // console.log(j)
        return j
    }

    binSearch(a, min, max) {
        if (a[min] === a[max]) return [min, max]
        const mid = min + Math.floor((max - min) / 2)
        if (a[min] === a[mid]) {
            return this.binSearch(a, mid, max)
        } else if (a[mid] === a[max]) {
            return this.binSearch(a, min, mid)
        } else {
            return [this.binSearch(a, mid, max), this.binSearch(a, min, mid)]
        }
    }

    getColorMapForRow() {

    }

    render() {
        return (
            <LabPage>
                <Title>Voronoi</Title>
                <canvas ref={can => { if (can !== null) this.canvas = can }}></canvas>
                <Helmet title='Voronoi' />
            </LabPage>
        )
    }
}
