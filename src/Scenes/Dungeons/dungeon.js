// TODO: Plan ideas for dungeon

class Dungeon{
    constructor(main, element){
        this.main = main;
        this.element = element

        // Will be set later
        // 0: Stuck
        // 1: Can Travel
        // 2: Can't travel unless you travel through a node
        // 3: Completed
        // s

        this.tiles = [
            [2, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 1]
        ];

        this.startingTile = this.tiles[0][0];
    }

    renderTiles(){
        const tileColorMap = {
            0 : "#030303",
            1 : "#404040",
            2 : "#123021"
        }

        // For later const tileAssetMap = {}

        const tileContainer = document.createElement("div");
        tileContainer.classList.add("tile-container");

        for(let i = 0; i<this.tiles.length; i++){
            const tileRow = document.createElement("div");
            tileRow.classList.add(`tile-row`);

            for(let j = 0; j<this.tiles[i].length; j++){
                // Create Tile
                const tile = document.createElement("div");
                tile.style.width = "40px";
                tile.style.height = "40px";

                tile.style.backgroundColor = tileColorMap[ this.tiles[i][j] ];

                tileRow.append(tile);
                console.log(`Tile: ${tileColorMap[ this.tiles[i][j] ]}`)
            }

            tileContainer.append(tileRow);
        }

        this.element.append(tileContainer);

    }

    init(){
        this.element.innerHTML = "In the dungeon";
        this.renderTiles();
    }
}

export default Dungeon;