export class Board {

    constructor(nbTileX, nbTileY) {
        this._nbTileX = nbTileX;
        this._nbTileY = nbTileY;

        // 0: case vide, 1: serpent, 2: objet
        this._boardList = [];

        for (let i = 0; i < nbTileY; i++) {
            const row = [];
            for (let j = 0; j < nbTileX; j++) {
                row.push(0);
            }
            this._boardList.push(row);
        }
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

                // case vide
                if (this._boardList[y][x]===0) {
                    const color = (x+y)%2==0 ? "bg-green-400" : "bg-green-500";
                    node.classList = `${color}`;
                }

                row.appendChild(node);
            }
        }

    }
}