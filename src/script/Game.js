export class Game {

    constructor(board) {
        this._board = board;
        this._isPlaying = false;
        this._board.addObject();

        const btn = document.getElementById("play-btn");
        this.startGame(btn);
    }

    startGame(btn) {
        const game = document.getElementById("game-board");
        const title = document.getElementById("title")

        btn.addEventListener("click", () => {
            game.style.opacity = 1;
            btn.style.visibility = "hidden";
            title.textContent = "Snake game";
            this._isPlaying = true;

            this._board._snake.autoMove();
            this._board._snake.handleMovement();
        })
    }
}