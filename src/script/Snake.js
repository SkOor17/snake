import { Board } from "./Board.js";

export class Snake {

    constructor(board) {
        this._snakeBody = [
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 2 },
        ];
        this._nextLast = { x: 2, y: 2 }; 
        this._prevHead = { x: 2, y: 2 };

        this._board = board;
        this._boardList = board.getBoard();

        this._boardList[this._snakeBody[0]["y"]][this._snakeBody[0]["x"]] = 1;
        this._boardList[this._snakeBody[1]["y"]][this._snakeBody[1]["x"]] = 1;
        this._boardList[this._snakeBody[2]["y"]][this._snakeBody[2]["x"]] = 1;
        this.deplacer();
    }

    getQueue() {        
        return this._snakeBody[this._snakeBody.length-1]
    }

    deplacer() {
        document.addEventListener(("keyup"), (event) => {
            this._prevHead = { ...this._snakeBody[0] };
            
            switch (event.key) {
                case "ArrowUp":
                    if (this.canMove(this._snakeBody[0]["x"], this._snakeBody[0]["y"]-1)) {
                        this._snakeBody[0]["y"] -= 1 
                        this.ereaseQueue()
                        this.updateSnakeBody();
                        this.drawSnake();
                    }
                    break;
                case "ArrowDown":
                    if (this.canMove(this._snakeBody[0]["x"], this._snakeBody[0]["y"]+1)) {
                        this._snakeBody[0]["y"] += 1 
                        this.ereaseQueue()
                        this.updateSnakeBody();
                        this.drawSnake();
                    }
                    break;
                case "ArrowLeft":
                    if (this.canMove(this._snakeBody[0]["x"]-1, this._snakeBody[0]["y"])) {
                        this._snakeBody[0]["x"] -= 1 
                        this.ereaseQueue()
                        this.updateSnakeBody();
                        this.drawSnake();
                    }
                    break;
                case "ArrowRight":
                    if (this.canMove(this._snakeBody[0]["x"]+1, this._snakeBody[0]["y"])) {
                        this._snakeBody[0]["x"] += 1 
                        this.ereaseQueue()
                        this.updateSnakeBody();
                        this.drawSnake();
                    }
                    break;
            }
        })
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
        console.log(this._boardList);
        
    }

    ereaseQueue() {
        const queue = this.getQueue()        
        this._board.drawEmptyCase(queue["x"],queue["y"])
        this._boardList[queue["y"]][queue["x"]] = 0
    }

    canMove(x,y) {
        return x>=0 && x<=19 && y>=0 && y<=19
    }
}