export class Game {

    constructor(board) {
        this._board = board;
        this._isPlaying = false;
        this._board.addObject();

        this.handleClickToPlay();
    }

    handleClickToPlay() {
        const btn = document.getElementById("play-btn")
        const game = document.getElementById("game-board")

        btn.addEventListener("click", () => {
            game.style.opacity = 1;
            btn.style.visibility = "hidden"
            this._isPlaying = true
            this._board._snake.handleMovement();
        })
    }
}