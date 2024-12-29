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
        this.drawSnake();
        this.handleMovement();
    }

    getQueue() {        
        return this._snakeBody[this._snakeBody.length-1]
    }

    moveSnake(dx, dy) {
        if (this.canMove(this._snakeBody[0].x + dx, this._snakeBody[0].y + dy)) {
            
            const hasObj = this.hasObject(this._snakeBody[0].x + dx, this._snakeBody[0].y + dy)
            console.log(hasObj);
            if (!hasObj) this.ereaseQueue();
            
            this._snakeBody[0].x += dx;
            this._snakeBody[0].y += dy;

            this.updateSnakeBody();
            this.drawSnake();

            if (hasObj) this._board.addObject()
        }
    }

    handleMovement() {
        document.addEventListener(("keyup"), (event) => {
            this._prevHead = { ...this._snakeBody[0] };
            const x = this._snakeBody[0]["x"]
            const y = this._snakeBody[0]["y"]
            
            switch (event.key) {
                case "ArrowUp":
                    this.moveSnake(0,-1)
                    break;
                case "ArrowDown":
                    this.moveSnake(0,1)
                    break;
                case "ArrowLeft":
                    this.moveSnake(-1,0)
                    break;
                case "ArrowRight":
                    this.moveSnake(1,0)
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
}