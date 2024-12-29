import { Snake } from "./Snake.js";

export class Board {

    constructor(nbTileX, nbTileY) {
        this._nbTileX = nbTileX;
        this._nbTileY = nbTileY;
        this.drawBoard();

        // 0: case vide, 1: serpent, 2: objet
        this._boardList = [];
        for (let i = 0; i < nbTileY; i++) {
            const row = [];
            for (let j = 0; j < nbTileX; j++) {
                row.push(0);
            }
            this._boardList.push(row);
        }

        this._snake = new Snake(this);
    }

    getBoard() {
        return this._boardList
    }

    drawBoard() {
        const gameBoard = document.getElementById("game-board")
        
        const widthBoard = gameBoard.offsetWidth;
        const heightBoard = gameBoard.offsetHeight;
        
        const widthCase = widthBoard/this._nbTileX;
        const heightCase = heightBoard/this._nbTileY;
        
        for (let y = 0; y < this._nbTileY; y++) {
            const row = document.createElement("div");
            row.classList = `w-full flex`;
            row.style.height = `${heightCase}px`;
            gameBoard.appendChild(row);

            for (let x = 0; x < this._nbTileX; x++) {
                const node = document.createElement("div");
                node.style.height = `${heightCase}px`;
                node.style.width = `${widthCase}px`;
                node.id = `caseX${x}Y${y}`
                row.appendChild(node);
                this.drawEmptyCase(x,y)
            }
        }
    }

    drawEmptyCase(x,y) {
        const node = document.getElementById(`caseX${x}Y${y}`)
        const color = (x+y)%2==0 ? "#4ade80" : "#22c55e";
        node.style.backgroundColor = `${color}`;
    }

    addObject() {
        let x = getRandomInt(0,this._nbTileX-1)
        let y = getRandomInt(0,this._nbTileX-1)

        while (this._boardList[y][x]===1) {
            x = getRandomInt(0,this._nbTileX-1)
            y = getRandomInt(0,this._nbTileX-1)
        }

        this._boardList[y][x] = 2
        this.drawObject(x,y)
    }

    drawObject(x,y) {
        const node = document.getElementById(`caseX${x}Y${y}`)
        node.style.backgroundColor = "red"
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}