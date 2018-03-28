import Helmet from 'react-helmet'
import LabPage from '../../components/LabPage'
import React from 'react'
import Title from '../../components/Title'

export default class Particles extends React.Component {
    constructor() {
        super()
        this.canvas = null
        this.state = { particles: [], count: 50, speed: 1.5, size: 5, maxdist: 150 }
        this.updateSize = this.updateSize.bind(this)
    }

    componentDidMount() {
        this.updateSize()
        window.addEventListener('resize', this.updateSize)
        this.generateParticles()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize)
    }

    updateSize() {
        this.canvas.width = this.canvas.parentElement.clientWidth
        this.canvas.height = window.innerHeight
        requestAnimationFrame(() => { this.draw() })
    }

    getRand(min, max) {
        if (max === undefined) {
            max = min
            min = 0
        }
        return min + Math.floor(Math.random() * (max - min))
    }

    generateParticles() {
        const particles = []
        const dist = this.state.size * 2
        for (let i = 0; i < this.state.count; i++) {
            particles.push({
                x: this.getRand(dist, this.canvas.width - dist),
                y: this.getRand(dist, this.canvas.height - dist),
                dx: this.posOrNeg() * Math.random() * this.state.speed,
                dy: this.posOrNeg() * Math.random() * this.state.speed
            })
        }
        this.setState({ particles })
    }

    posOrNeg() {
        return this.getRand(2) * 2 - 1
    }

    drawParticle(ctx, p) {
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, this.state.size, 0, Math.PI * 2)
        ctx.fill()
    }

    moveParticle(p) {
        p.x += p.dx
        p.y += p.dy
        if (this.checkCollision(p.x, this.canvas.width)) {
            p.dx *= -1
        }
        if (this.checkCollision(p.y, this.canvas.height)) {
            p.dy *= -1
        }
    }

    checkCollision(x, max) {
        const size = this.state.size
        return (x >= max - size / 2 || x - size / 2 <= 0)
    }

    distParticles(a, b) {
        return Math.hypot(b.x - a.x, b.y - a.y)
    }

    drawConnection(ctx, width, a, b) {
        ctx.strokeStyle = 'rgb(255,255,255)'
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
    }

    drawConnections(ctx) {
        const count = this.state.count
        const maxdist = this.state.maxdist
        const particles = this.state.particles
        for (let i = 0; i < count - 1; i++) {
            const p1 = particles[i]
            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j]
                const dist = this.distParticles(p1, p2)
                if (dist <= maxdist) {
                    const width = 2 * (1 - dist / maxdist)
                    this.drawConnection(ctx, width, p1, p2)
                }
            }
        }
    }

    draw() {
        const ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.state.particles.forEach(i => this.drawParticle(ctx, i))
        this.drawConnections(ctx)
        this.state.particles.forEach(i => this.moveParticle(i))
        requestAnimationFrame(() => { this.draw() })
    }

    render() {
        return (
            <LabPage>
                <Title>Particles</Title>
                <canvas
                    ref={can => { if (can !== null) this.canvas = can }}
                    style={{ border: '2px solid', background: 'black' }}>
                </canvas>
                <Helmet title="Particles" />
            </LabPage>
        )
    }
}
