import React from 'react'
import styled from 'styled-components'

// Code from rectangleworld(dot)com
class CanvasApp {
    constructor(canvas, width, height) {
        this.context = canvas.getContext('2d')
        this.displayWidth = width
        this.displayHeight = height
        this.onTimer = this.onTimer.bind(this)
        this.init = this.init.bind(this)

        this.init()
    }

    init() {
        this.numCircles = 12
        this.maxMaxRad = 250
        this.minMaxRad = 250
        this.minRadFactor = 0
        this.iterations = 11
        this.numPoints = Math.pow(2, this.iterations) + 1
        this.drawsPerFrame = 5
        this.fullTurn = Math.PI * 2 * this.numPoints / (1 + this.numPoints)
        this.minX = -this.maxMaxRad
        this.maxX = this.displayWidth + this.maxMaxRad
        this.minY = this.displayHeight / 2 - 50
        this.maxY = this.displayHeight / 2 + 50
        this.twistAmount = Math.PI
        this.stepsPerSegment = Math.floor(200 / this.numCircles)
        this.maxColorValue = 80
        this.lineAlpha = 0.01

        this.startGenerate()
    }

    startGenerate() {
        this.drawCount = 0
        this.context.setTransform(1, 0, 0, 1, 0, 0)
        this.context.clearRect(0, 0, this.displayWidth, this.displayHeight)
        this.setCircles()
        this.colorArray = this.setColorList(this.iterations)
        this.lineNumber = 0
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = setInterval(this.onTimer, 1000 / 60)
    }

    setColorList(iter) {
        //This function sets an array of colors which vary between three random choices. The variation
        //is set according to a fractal subdivision function.
        let r0, g0, b0
        let r1, g1, b1
        let r2, g2, b2
        let param
        let colorArray
        let i, len

        let redFactor = 1
        let blueFactor = 0.7
        let greenFactor = 1

        r0 = redFactor * Math.random() * this.maxColorValue
        //I like to balance reds with some green, so I'm making sure green is at least 20 percent of the red.
        g0 = 0.2 * r0 + greenFactor * Math.random() * (this.maxColorValue - 0.2 * r0)
        b0 = blueFactor * Math.random() * this.maxColorValue

        r2 = redFactor * Math.random() * this.maxColorValue
        g2 = 0.2 * r2 + greenFactor * Math.random() * (this.maxColorValue - 0.2 * r2)
        b2 = blueFactor * Math.random() * this.maxColorValue

        //middle color will be darkened average of other two
        r1 = 0.2 * (r0 + r2)
        g1 = 0.2 * (g0 + g2)
        b1 = 0.2 * (b0 + b2)

        let a = this.lineAlpha

        let colorParamArray = this.setLinePoints(iter)
        colorArray = []

        len = colorParamArray.length

        for (i = 0; i < len; i++) {
            let r, g, b
            param = colorParamArray[i]

            if (param < 0.5) {
                r = Math.floor(r0 + 2 * param * (r1 - r0))
                g = Math.floor(g0 + 2 * param * (g1 - g0))
                b = Math.floor(b0 + 2 * param * (b1 - b0))
            } else {
                r = Math.floor(r1 + 2 * (param - 0.5) * (r2 - r1))
                g = Math.floor(g1 + 2 * (param - 0.5) * (g2 - g1))
                b = Math.floor(b1 + 2 * (param - 0.5) * (b2 - b1))
            }

            let newColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
            colorArray.push(newColor)
        }
        return colorArray
    }

    setCircles() {
        this.circles = []

        for (let i = 0; i < this.numCircles; i++) {
            this.maxR = this.minMaxRad + Math.random() * (this.maxMaxRad - this.minMaxRad)
            this.minR = this.minRadFactor * this.maxR

            let newCircle = {
                centerX: this.minX + i / (this.numCircles - 1) * (this.maxX - this.minX),
                centerY: this.minY + i / (this.numCircles - 1) * (this.maxY - this.minY),
                maxRad: this.maxR,
                minRad: this.minR,
                phase: i / (this.numCircles - 1) * this.twistAmount,
                //phase: Math.random()*Math.PI*2,
                pointArray: this.setLinePoints(this.iterations)
            }
            this.circles.push(newCircle)
        }
    }

    onTimer() {
        let i
        let theta
        let numCircles = this.circles.length
        let linParam
        let cosParam
        let centerX, centerY
        let xSqueeze = 0.75
        let x0, y0
        let rad, rad0, rad1
        let phase, phase0, phase1

        for (let k = 0; k < this.drawsPerFrame; k++) {

            theta = -this.lineNumber / (this.numPoints - 1) * this.fullTurn
            this.context.globalCompositeOperation = 'lighter'
            this.context.lineJoin = 'miter'
            this.context.strokeStyle = this.colorArray[this.lineNumber]
            this.context.lineWidth = this.lineWidth
            this.context.beginPath()

            //move to first point
            centerX = this.circles[0].centerX
            centerY = this.circles[0].centerY
            rad = this.circles[0].minRad + this.circles[0].pointArray[this.lineNumber] * (this.circles[0].maxRad - this.circles[0].minRad)
            phase = this.circles[0].phase
            x0 = centerX + xSqueeze * rad * Math.cos(theta + phase)
            y0 = centerY + rad * Math.sin(theta + phase)
            this.context.moveTo(x0, y0)

            for (i = 0; i < numCircles - 1; i++) {
                //draw between i and i+1 circle
                rad0 = this.circles[i].minRad + this.circles[i].pointArray[this.lineNumber] * (this.circles[i].maxRad - this.circles[i].minRad)
                rad1 = this.circles[i + 1].minRad + this.circles[i + 1].pointArray[this.lineNumber] * (this.circles[i + 1].maxRad - this.circles[i + 1].minRad)
                phase0 = this.circles[i].phase
                phase1 = this.circles[i + 1].phase

                for (let j = 0; j < this.stepsPerSegment; j++) {
                    linParam = j / (this.stepsPerSegment - 1)
                    cosParam = 0.5 - 0.5 * Math.cos(linParam * Math.PI)

                    //interpolate center
                    centerX = this.circles[i].centerX + linParam * (this.circles[i + 1].centerX - this.circles[i].centerX)
                    centerY = this.circles[i].centerY + linParam * (this.circles[i + 1].centerY - this.circles[i].centerY)

                    //interpolate radius
                    rad = rad0 + cosParam * (rad1 - rad0)

                    //interpolate phase
                    phase = phase0 + cosParam * (phase1 - phase0)

                    x0 = centerX + xSqueeze * rad * Math.cos(theta + phase)
                    y0 = centerY + rad * Math.sin(theta + phase)
                    this.context.lineTo(x0, y0)
                }
            }

            this.context.stroke()

            this.lineNumber++
	    if (this.lineNumber > this.numPoints - 1) {
	        clearInterval(this.timer)
	        this.timer = null
	        break
	    }
        }
    }

    //Here is the function that defines a noisy (but not wildly varying) data set which we will use to draw the curves.
    //We first define the points in a linked list, but then store the values in an array.
    setLinePoints(iterations) {
        let pointList = {}
        let pointArray = []
        pointList.first = {
            x: 0,
            y: 1
        }
        let lastPoint = {
            x: 1,
            y: 1
        }
        let minY = 1
        let maxY = 1
        let point
        let nextPoint
        let dx, newX, newY

        pointList.first.next = lastPoint
        for (let i = 0; i < iterations; i++) {
            point = pointList.first
            while (point.next != null) {
                nextPoint = point.next

                dx = nextPoint.x - point.x
                newX = 0.5 * (point.x + nextPoint.x)
                newY = 0.5 * (point.y + nextPoint.y)
                newY += dx * (Math.random() * 2 - 1)

                let newPoint = {
                    x: newX,
                    y: newY
                }
		
                //min, max
                if (newY < minY) {
                    minY = newY
                } else if (newY > maxY) {
                    maxY = newY
                }
                //put between points
                newPoint.next = nextPoint
                point.next = newPoint
                point = nextPoint
            }
        }

        //normalize to values between 0 and 1
        //Also store y values in array here.
        if (maxY !== minY) {
            let normalizeRate = 1 / (maxY - minY)
            point = pointList.first
            while (point != null) {
                point.y = normalizeRate * (point.y - minY)
                pointArray.push(point.y)
                point = point.next
            }
        }
        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
        else {
            point = pointList.first
            while (point != null) {
                point.y = 1
                pointArray.push(point.y)
                point = point.next
            }
        }
        return pointArray;
    }
}

const BgBox = styled.div`
    height: 100%;
    position: fixed;
    width: 100%;
    z-index: -1;
    canvas {
        mask-image: -webkit-gradient(linear, left top, right top,
            color-stop(0.00,  rgba(0,0,0,1)),
            color-stop(0.25,  rgba(0,0,0,0)),
            color-stop(0.75,  rgba(0,0,0,0)),
            color-stop(1.00,  rgba(0,0,0,1)));
    }
    @media (max-width: 480px) {
        canvas {
            -webkit-mask-image: none;
            opacity: 0.25;
        }
    }
`

export default class Bg extends React.Component {

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

    draw() {
        new CanvasApp(this.canvas, this.canvas.width, this.canvas.height)
    }

    render() {
        return (
	    <BgBox>
                <canvas ref={can => { this.canvas = can }}></canvas>
	    </BgBox>
        )
    }
};
