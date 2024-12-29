export class Snake {

    constructor(board) {
        this._memoryKey = "ArrowRight"
        this._snakeBody = [
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 2 },
        ];
        this._prevHead = { x: 2, y: 2 };

        this._board = board;
        this._boardList = board.getBoard();

        this.drawSnake();
    }

    getQueue() {        
        return this._snakeBody[this._snakeBody.length-1]
    }

    moveSnake(dx, dy) {

        if (!this.canMove(this._snakeBody[0].x + dx, this._snakeBody[0].y + dy)) {
            this.gameOver();
            return;
        }

        this._prevHead = { ...this._snakeBody[0] };

        const hasObj = this.hasObject(this._snakeBody[0].x + dx, this._snakeBody[0].y + dy)
        if (!hasObj) this.ereaseQueue();
        
        this._snakeBody[0].x += dx;
        this._snakeBody[0].y += dy;

        this.updateSnakeBody();
        this.drawSnake();

        if (hasObj) this._board.addObject()
    }

    autoMove() {
        const interval = setInterval(() => {
            if (!this._board._game._isPlaying) {
                clearInterval(interval);
                return;
            }

            switch (this._memoryKey) {
                case "ArrowUp":
                    this.moveSnake(0, -1);
                    break;
                case "ArrowDown":
                    this.moveSnake(0, 1);
                    break;
                case "ArrowLeft":
                    this.moveSnake(-1, 0);
                    break;
                case "ArrowRight":
                    this.moveSnake(1, 0);
                    break;
            }
        }, 150)
    }

    handleMovement() {        
        if (this._board._game._isPlaying) {
            document.addEventListener(("keyup"), (event) => {
            const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
            if (validKeys.includes(event.key)) {
                if (
                    (event.key === "ArrowUp" && this._memoryKey === "ArrowDown") ||
                    (event.key === "ArrowDown" && this._memoryKey === "ArrowUp") ||
                    (event.key === "ArrowLeft" && this._memoryKey === "ArrowRight") ||
                    (event.key === "ArrowRight" && this._memoryKey === "ArrowLeft")
                ) return;
                this._memoryKey = event.key;
            }
            })
        }
    }

    updateSnakeBody() {
        for (let i = this._snakeBody.length-1; i > 0; i--) {
            this._snakeBody[i] = this._snakeBody[i-1]
        }

        this._snakeBody[1] = this._prevHead        
    }

    drawSnake() {
        for (let i = 0; i < this._snakeBody.length; i++) {
            const el = this._snakeBody[i]
            this._boardList[el["y"]][el["x"]] = 1
            const elementCase = document.getElementById(`caseX${el["x"]}Y${el["y"]}`)
            elementCase.style.backgroundColor = "black"
        }
    }

    ereaseQueue() {
        const queue = this.getQueue()        
        this._board.drawEmptyCase(queue["x"],queue["y"])
        this._boardList[queue["y"]][queue["x"]] = 0
    }

    canMove(x,y) {
        return x>=0 && x<=this._board._nbTileX-1 && y>=0 && y<=this._board._nbTileY-1 && this._boardList[y][x]!==1
    }

    hasObject(x,y) {
        if (this._boardList[y][x] !== 2) return false
        
        this._snakeBody.push({...this._boardList[y][x]})
        return true
    }

    gameOver() {
        const title = document.getElementById("title");
        const gameBoard = document.getElementById("game-board");
        const playBtn = document.getElementById("play-btn");

        title.textContent = "Game over !";
        gameBoard.style.opacity = 0.5;
        playBtn.style.visibility = "visible";
        playBtn.textContent = "replay";

        this._board._game._isPlaying = false;
        this._board.reset();
        this.reset();
    }

    reset() {
        this._memoryKey = "ArrowRight"
        this._snakeBody = [
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 2 },
        ];
        this._prevHead = { x: 2, y: 2 };
        this._boardList = this._board.getBoard();

        this.drawSnake();
    }
}