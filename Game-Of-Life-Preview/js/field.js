/**
 * @fileoverview Field class
 * @author anton_razumovskyi@epam.com
 */

/**
 *@module Field
 */

var FieldModule = (function() {

    /**
     * @constructor Field class
     */
    function Field() {
        console.log("Field ...");

        this.cells = null;
    }
    /**
     * @function Set cells array
     * @param {Array[HTMLElment]} container
     */
    Field.prototype.setCells = function(cells) {
        console.log("Field set cells ...");

        this.cells = cells;
        console.dir(this.cells);
    }

    /**
     * @function run one life cicle (aka generation)
     * @return {Array[HTMLElement]}
     */
    Field.prototype.runGeneration = function() {
        console.log("Field run generation ...");

        var willAlive = [], // Cells which will be alive in next generation
            that = this;

        this.cells.forEach(function(row, rowNum) {

            var temp = willAlive.concat(row.filter(function(element, colNum) {

                var aliveNeighbors = Field._checkNeighborhood(colNum, rowNum, that.cells);

                return Field._checkRules(element.className, aliveNeighbors);
            }));
            willAlive = temp;
            console.log(willAlive);
        });

        return willAlive;
    }

    /**
     * Checking neighborhood
     * @function
     * @param {Number} col Cell column number
     * @param {NUmber} row Cell row number
     * @param {Array[HTMLElement]} cells Array of cells on the field
     * @return {Number} number of alive neighbors
     */
    Field._checkNeighborhood = function(col, row, cells) {
        // console.log("Field check neighbors ...");

        var i, j,
            curCol = col - 1, // curCol, curY - coordiantes of left up
            curRow = row - 1, // neightboor, from it starts checking
            size = 3, // size of neiborhood square
            aliveNeighbors = 0;

        for (i = 0; i < size; i++, curRow++) {

            for (j = 0; j < size; j++, curCol++) {

                if (cells[curRow] && cells[curRow][curCol] &&
                    !(curRow === row && curCol === col)) {

                    cells[curRow][curCol].className === "alive" && aliveNeighbors++;
                }
            }

            curCol = col - 1;
        }

        return aliveNeighbors;
    }

    /**
     * Number of cell neighbors to change state from dead to alive
     * @const {Number}
     */
    Field.bornNumber = 3;

    /**
     * Min number of neighbors of cell to still be alive
     * @const {Number}
     */
    Field.minNeighborsToLive = 2;

    /**
     * Max number of neighbors of cell to still be alive
     * @const {Number}
     */
    Field.maxNeighborsToLive = 3;

    /**
     * Check rules
     * @function
     * @param {Boolean} curState Current state of cell
     *					true - alive
     *					false - dead
     * @param {Number} neighbors Number of alive neighbors
     * @return {Boolean}
     *				true - cell will be alive in next generation
     *				false - cell will be dead in next generation
     */
    Field._checkRules = function(curState, neighbors) {
        // console.log("Field check rules ...");
        if (curState === "alive") {

            return Field.minNeighborsToLive === neighbors ||
                neighbors === Field.maxNeighborsToLive;
        }

        return neighbors === Field.bornNumber;
    }

    return Field;
})();