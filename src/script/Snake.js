import { Board } from "./Board.js";

export class Snake {

    constructor(board) {
        this._snakeBody = [
            { x: 2, y: 2 },
            { x: 1, y: 2 },
        ];
        this._nextLast = { x: 2, y: 2 }; 
        this._prevHead = { x: 2, y: 2 };

        this._board = board;
        this._boardList = board.getBoard();

        this._boardList[this._snakeBody[0]["y"]][this._snakeBody[0]["x"]] = 1;
        this._boardList[this._snakeBody[1]["y"]][this._snakeBody[1]["x"]] = 1;
        this.deplacer();
    }

    getQueue() {        
        return this._snakeBody[this._snakeBody.length-1]
    }

    updateSnakeBody() {
        console.log(this._prevHead);
        this._snakeBody[1] = this._prevHead
        this._prevHead = this._snakeBody[0]
        console.log(this._prevHead);
        

        for (let i = 2; i < this._snakeBody.length; i++) {
            this._snakeBody[i] = this._snakeBody[i-1]
        }
    }

    deplacer() {
        document.addEventListener(("keyup"), (event) => {
            this._prevHead = { ...this._snakeBody[0] };
            
            switch (event.key) {
                case "ArrowUp":
                    this._snakeBody[0]["y"] -= 1 
                    break;
                case "ArrowDown":
                    this._snakeBody[0]["y"] += 1 
                    break;
                case "ArrowLeft":
                    this._snakeBody[0]["x"] -= 1 
                    break;
                case "ArrowRight":
                    this._snakeBody[0]["x"] += 1 
                    break;
            
                default:
                    break;
            }

            this.ereaseQueue()
            this.updateSnakeBody();
            this.drawSnake();
        })
    }

    drawSnake() {
        for (let i = 0; i < this._snakeBody.length; i++) {
            const el = this._snakeBody[i]
            const elementCase = document.getElementById(`caseX${el["x"]}Y${el["y"]}`)
            elementCase.style.backgroundColor = "black"
        }
    }

    ereaseQueue() {
        const queue = this.getQueue()
        this._board.drawEmptyCase(queue["x"],queue["y"])
    }
}