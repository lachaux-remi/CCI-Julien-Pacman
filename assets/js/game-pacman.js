class GamePacman {
    constructor(element) {
        this.gameElement = document.querySelector(element)
        this.init()
    }

    init() {
        this.bonbon = 0
        this.scoreElement = this.createElement('div', 'pacman-score')
        this.score = 0
        this.grid = new Grid(this)
        this.pacman = new Pacman(this, 1, 2)
        this.ghosts = [
            new Ghost(this, 'clyde', 9, 9),
            new Ghost(this, 'inky', 10, 8),
            new Ghost(this, 'pinky', 10, 10),
            new Ghost(this, 'blinky', 11, 9),
        ]
        this.render()
        setInterval(() => {
            this.pacman.move()
            this.ghosts.forEach(ghost => ghost.move())
            this.render()
        }, 500)
    }

    render() {
        this.gameElement.append(this.scoreElement)
        this.gameElement.append(this.grid.boardElement)
        this.updateScore(0)
    }

    updateScore(score) {
        this.score += score
        this.scoreElement.innerHTML = this.score
    }

    createElement(tagName, ...tokens) {
        const element = document.createElement(tagName)
        tokens.forEach(token => element.classList.add(token))
        return element
    }
}