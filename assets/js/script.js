Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
}

// Pacman code
const pacmanDiv = document.querySelector('#pacman')
const gameCaseDefault = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
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
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
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
            {name: 'clyde', position: {x: 9, y: 9}},
            {name: 'inky', position: {x: 10, y: 8}},
            {name: 'pinky', position: {x: 10, y: 10}},
            {name: 'blinky', position: {x: 11, y: 9}},
        ],
        bonbon: 0,
        points: 0
    }

    // Generate scoreboard
    const scoreboardDiv = document.createElement('div')
    scoreboardDiv.classList.add('pacman-scoreboard')
    const lifeDiv = document.createElement('div')
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
                if (typeCase === 2) {
                    caseDiv.classList.add('bonbon')
                    game.bonbon++
                }
            }

            game.board[x][y] = {typeCase, element: caseDiv}
            gameDiv.append(caseDiv)
        })
    })
    pacmanDiv.append(gameDiv)

    game.interval = setInterval(run, 250)

    function run() {
        if (game.bonbon === 0) {
            clearInterval(game.interval)
            alert("Vous avez gagner !")
        }

        if (game.pacman.direction != null) {
            const position = game.pacman.position
            let gridCase
            switch (game.pacman.direction) {
                case "down":
                    gridCase = game.board[position.x + 1]
                    if (gridCase === undefined) position.x = 0
                    else if (gridCase[position.y]?.typeCase) position.x++
                    break
                case "right":
                    gridCase = game.board[position.x][position.y + 1]
                    if (gridCase === undefined) position.y = 0
                    else if (gridCase?.typeCase) position.y++
                    break
                case "up":
                    gridCase = game.board[position.x - 1]
                    if (gridCase === undefined) position.x = game.board.length - 1
                    else if (gridCase[position.y]?.typeCase) position.x--
                    break
                case "left":
                    gridCase = game.board[position.x][position.y - 1]
                    if (gridCase === undefined) position.y = game.board[position.x].length - 1
                    else if (gridCase?.typeCase) position.y--
                    break
            }
            pacmanRender()

            if (game.pacman.element.classList.contains('ghost')) {
                game.pacman.direction = null
                clearInterval(game.interval)
                alert("Vous avez perdu !")
            }

            // GHOST Move
            game.ghosts.forEach(ghost => ghostMove(ghost.position))
            ghostRender()

            if (game.pacman.element.classList.contains('ghost')) {
                game.pacman.direction = null
                clearInterval(game.interval)
                alert("Vous avez perdu !")
            }
        }
    }

    function ghostMove(position) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                if (game.board[position.x + 1][position.y].typeCase) position.x++
                else ghostMove(position)
                break
            case 1:
                if (game.board[position.x][position.y + 1]?.typeCase) position.y++
                else ghostMove(position)
                break
            case 2:
                if (game.board[position.x - 1][position.y]?.typeCase) position.x--
                else ghostMove(position)
                break
            case 3:
                if (game.board[position.x][position.y - 1]?.typeCase) position.y--
                else ghostMove(position)
                break
        }
    }

    function pacmanRender() {
        game.pacman.element?.classList.remove('pacman', 'pacman-down', 'pacman-right', 'pacman-up', 'pacman-left')
        const element = game.board[game.pacman.position.x][game.pacman.position.y].element
        element.classList.add('pacman', `pacman-${game.pacman.direction}`)

        if (element.classList.contains('mega-bonbon')) {
            element.classList.remove('mega-bonbon')
            game.dazzled = 10
            game.bonbon--
            points(50)
        } else if (element.classList.contains('bonbon')) {
            element.classList.remove('bonbon')
            game.bonbon--
            points(10)
        }

        game.pacman.element = element
    }

    pacmanRender()

    function ghostRender() {
        game.ghosts.forEach(ghost => {
            ghost.element?.classList.remove('ghost', `ghost-${ghost.name}`)
            const element = game.board[ghost.position.x][ghost.position.y].element

            element.classList.add('ghost', `ghost-${ghost.name}`)

            ghost.element = element
        })
    }

    ghostRender()

    function points(amount) {
        game.points += amount
        pointsDiv.innerHTML = game.points
    }

    document.addEventListener('keyup', event => {
        switch (event.key) {
            case "ArrowDown":
            case "s":
                game.pacman.direction = "down" // x++
                break
            case "ArrowRight":
            case "d":
                game.pacman.direction = "right" // y++
                break
            case "ArrowUp":
            case "z":
                game.pacman.direction = "up" // x--
                break
            case "ArrowLeft":
            case "q":
                game.pacman.direction = "left" // y--
                break
        }
    })
}

start()