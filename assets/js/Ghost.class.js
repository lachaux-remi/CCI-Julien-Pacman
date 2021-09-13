class Ghost {
    constructor(game, name, x, y) {
        this.game = game
        this.name = name
        this.x = x
        this.y = y
        this.direction = null
        this.render()
    }

    render() {
        this.element?.classList.remove('ghost', `ghost-${this.name}`)
        const element = this.game.grid.caseInBoard(this.x, this.y).element
        element.classList.add('ghost', `ghost-${this.name}`)
        this.element = element
    }

    move() {
        this.eat()

        switch (Math.floor(Math.random() * 4)) {
            case 0:
                if (this.game.grid.caseInBoard(this.x + 1, this.y)?.typeCase) this.x++
                else this.move()
                break
            case 1:
                if (this.game.grid.caseInBoard(this.x, this.y + 1)?.typeCase) this.y++
                else this.move()
                break
            case 2:
                if (this.game.grid.caseInBoard(this.x - 1, this.y)?.typeCase) this.x--
                else this.move()
                break
            case 3:
                if (this.game.grid.caseInBoard(this.x, this.y - 1)?.typeCase) this.y--
                else this.move()
                break
        }

        this.render()
        this.eat()
    }

    eat() {
        if (this.element.classList.contains('pacman')) {
            this.game.scoreElement.innerHTML = "Vous avez perdu !"
            this.game.stop()
        }
    }
}