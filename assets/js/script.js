Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
}

// Pacman code
const pacmanDiv = document.querySelector('#pacman')
const gameCaseDefault = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 3, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function start() {
    const game = {
        board: gameCaseDefault.clone(),
        pacman: {
            position: {x: 1, y: 2},
            direction: null
        },
        ghosts: [
            {death: false, position: {x: 10, y: 9}},
            {death: false, position: {x: 10, y: 9}},
            {death: false, position: {x: 10, y: 9}},
            {death: false, position: {x: 10, y: 9}},
        ],
        points: 0
    }

    // Generate scoreboard
    const scoreboardDiv = document.createElement('div')
    scoreboardDiv.classList.add('pacman-scoreboard')
    const lifeDiv = document.createElement('div')
    lifeDiv.innerHTML = "1 UP"
    const pointsDiv = document.createElement('div')
    pointsDiv.innerHTML = game.points
    scoreboardDiv.append(lifeDiv, pointsDiv)
    pacmanDiv.append(scoreboardDiv)

    // Generate game
    const gameDiv = document.createElement('div')
    gameDiv.classList.add('pacman-game')
    game.board.forEach((cols, x) => {
        cols.forEach((typeCase, y) => {
            const caseDiv = document.createElement('div')
            caseDiv.setAttribute('x', x)
            caseDiv.setAttribute('y', y)

            if (typeCase === 0) caseDiv.classList.add('wall')
            else {
                caseDiv.classList.add('floor')
                if (typeCase === 2) caseDiv.classList.add('bonbon')
                else if (typeCase === 3) caseDiv.classList.add('mega-bonbon')
            }

            game.board[x][y] = {typeCase, element: caseDiv}
            gameDiv.append(caseDiv)
        })
    })
    console.log(game.board)
    pacmanDiv.append(gameDiv)

    function pacmanMove() {
        if (game.pacman.direction != null) {
            const position = game.pacman.position
            switch (game.pacman.direction) {
                case "down":
                    if (game.board[position.x + 1][position.y].typeCase) {
                        position.x++
                    }
                    break
                case "right":
                    if (game.board[position.x][position.y + 1]?.typeCase) {
                        position.y++
                    }
                    break
                case "up":
                    if (game.board[position.x - 1][position.y]?.typeCase) {
                        position.x--
                    }
                    break
                case "left":
                    if (game.board[position.x][position.y - 1]?.typeCase) {
                        position.y--
                    }
                    break
            }
        }
        pacmanMoveRender()
    }

    function pacmanMoveRender() {
        game.pacman.element?.classList.remove('pacman', 'pacman-down', 'pacman-right', 'pacman-up', 'pacman-left')

        const element = game.board[game.pacman.position.x][game.pacman.position.y].element
        element.classList.add('pacman', `pacman-${game.pacman.direction}`)

        if (element.classList.contains('mega-bonbon')) {
            element.classList.remove('mega-bonbon')
            points(50)
        } else if (element.classList.contains('bonbon')) {
            element.classList.remove('bonbon')
            points(10)
        }

        game.pacman.element = element
    }

    function points(amount) {
        game.points += amount
        pointsDiv.innerHTML = game.points
    }

    setInterval(pacmanMove, 500)


    document.addEventListener('keyup', event => {
        switch (event.key) {
            case "ArrowDown":
                game.pacman.direction = "down" // x++
                break
            case "ArrowRight":
                game.pacman.direction = "right" // y++
                break
            case "ArrowUp":
                game.pacman.direction = "up" // x--
                break
            case "ArrowLeft":
                game.pacman.direction = "left" // y--
                break
        }
    })

    console.log(game)
}

start()