const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0

const brickRowCount = 9
const brickColumnCount = 5

//Ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

//Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

//Paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 8,
    dx: 0
}

//Brick props
const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

//Create bricks
const bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = { x, y, ...brickInfo }
    }
}

//Draw bricks on canvas
function drawBricks() {
    bricks.forEach((column) => {
        column.forEach((brick) => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.width, brick.height)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

//Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.fillStyle = "#0095dd"
    ctx.fill()
    ctx.closePath()
}

//Draw score on canvas
function drawScore() {
    ctx.font = "20px Arial"
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

//Control
function movePaddle() {
    paddle.x += paddle.dx

    //Wall detection
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width
    }

    if (paddle.x < 0) {
        [paddle.x = 0]
    }
}

//Move ball on canvas
function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    //Wall collision (x)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    //Paddle collision
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.width &&
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed
    }

    //Bricks collision
    bricks.forEach((column) => {
        column.forEach((brick) => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.width &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.height
                ) {
                    ball.dy *= -1
                    brick.visible = false

                    increaseScore()
                }
            }
        })
    })

    //Lose
    if (ball.y + ball.size > canvas.height) {
        showAllBricks()
        score = 0
    }
}

//Increase score
function increaseScore() {
    score++

    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks()
    }
}

//Show all bricks
function showAllBricks() {
    bricks.forEach((column) => {
        column.forEach((brick) => brick.visible = true)
    })
}

//Draw everything
function draw() {
    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

//Update frames
function update() {
    movePaddle()
    moveBall()

    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //Draw everything
    draw()

    requestAnimationFrame(update)
}

update()

//Key
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' ||
        e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0
    }
}

//Event listener
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

//Rules and btn
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})