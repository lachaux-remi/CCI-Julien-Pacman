class Pacman {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.direction = null
        this.render()
    }

    render() {
        this.element?.classList.remove('pacman', 'pacman-down', 'pacman-right', 'pacman-up', 'pacman-left')
        const element = this.game.grid.caseInBoard(this.x, this.y).element
        element.classList.add('pacman', `pacman-${this.direction}`)
        this.element = element

        this.eat()
    }

    move() {

        this.render()
    }

    eat() {
        if (this.element.classList.contains('bonbon')) {
            this.element.classList.remove('bonbon')
            this.game.bonbon--
            this.game.updateScore(10)
        }
    }
}