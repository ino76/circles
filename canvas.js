let canvas = document.querySelector("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')


let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 70
let minRadius = 10
let distance = 100
let circleArray  = []

let colorArray = [
    '#EBF4F7',
    '#E00B27',
    '#1A2A40',
    '#2474A6',
    '#F2A30F',
]

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x
    mouse.y = e.y
})


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})


function Circle(x, y, dx, dy, width, radius) {
    this.x = x
    this.y = y
    this.width = width
    this.radius = radius
    this.dx = dx
    this.dy = dy

    this.color = colorArray[Math.floor(Math.random() * 5)]

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, true)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function() {

        this.x += this.dx
        this.y += this.dy

        if (this.x > innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx
        }
        
        if (this.y > innerHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy
        }


        if(mouse.x - this.x < distance && mouse.x - this.x > -distance
        && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if(this.radius < maxRadius) {
                this.radius += 5
            }
        } else {
            if(this.radius > minRadius) {
                this.radius -= 5
            }
        }


        this.draw()
    }
}



function init() {

    circleArray  = []

    for (let i = 0; i < 800; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        let width = 0
        let radius = Math.random() * 5 + 3;
        
        if (x < radius) {
            x = radius
        } else if (x > innerWidth - radius) {
            x = innerWidth - radius
        }
    
        if (y < radius) {
            y = radius
        } else if (y > innerHeight - radius) {
            y = innerHeight - radius
        }
    
        circleArray.push(new Circle(x, y, dx, dy, width, radius))
    }
}



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    circleArray.forEach(x => x.update())
}

init()
animate()