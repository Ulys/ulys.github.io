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
        console.log("Field constructor ...");

        this.cells = null;
    }
    /**
     * @function Set cells array
     * @param {Array[HTMLElment]} container
     */
    Field.prototype.setCells = function(cells) {
        console.log("Field set cells ...");

        this.cells = cells;
    }

    /**
     * @function run one life cicle (aka generation)
     * @return {Array[HTMLElement]}
     */
    Field.prototype.runGeneration = function() {

        var temp,
        	willAlive = [], // Cells which will be alive in next generation
            that = this;

        this.cells.forEach(function(row, rowNum) {

            temp = willAlive.concat(row.filter(function(element, colNum) {

                var aliveNeighbors = Field._checkNeighborhood(colNum, rowNum, that.cells);

                return Field._checkRules(element.className, aliveNeighbors);
            }));

            willAlive = temp;
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

        var i, j,
            curCol = col - 1, // curCol, curY - coordiantes of left up
            curRow = row - 1, // neightboor, from it starts checking
            size = 3, // size of neiborhood square
            aliveNeighbors = 0;

        for (i = 0; i < size; i++, curRow++) {

            for (j = 0; j < size; j++, curCol++) {

                if (cells[curRow] && cells[curRow][curCol] &&
                    !(curRow === row && curCol === col)) {

                    cells[curRow][curCol].className === ViewModule.aliveCell && aliveNeighbors++;
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

        if (curState === "alive") {

            return Field.minNeighborsToLive === neighbors ||
                neighbors === Field.maxNeighborsToLive;
        }

        return neighbors === Field.bornNumber;
    }

    /**
     * Mark cells for template on game field
     * @function
     * @param {Array[Numbers]} template
     * @return {Array[HTMLElement]} Cells which will be alive
     */
    Field.prototype.markTemplate = function (template) {

    	var i, j, rowNum, colNum,
    		aliveCells = [],
    		startCoord = this._positionTemplate(template),
    		row = startCoord.row,
    		col = startCoord.col;
    	console.log("rowNum " + row, "colNum " + col);
    	for (i = 0, rowNum = template.length; i < rowNum; i++) {

    		for (j = 0, colNum = template[0].length; j < colNum; j++) {

    			if (this.cells[row + i][col + j] && template[i][j]) {

    				aliveCells.push(this.cells[row + i][col + j]);
    				// this.cells[row + i][col + j].className = ViewModule.aliveCell;
    			}
    		}
    	}

    	return aliveCells
    }

    /**
     * Count position for template
     * @private
     * @function
     * @param {Array[Integer]} template
     * @return
     * 	@typedef {
	 *		row: {Integer},		Row number where template start
	 *		col: {Integer}		Col number where template start
     * }
     */
     Field.prototype._positionTemplate = function (template) {

     	var startCol = 0,
     		startRow = 0,
     		templateHeight = template.length,
     		templateWidth = template[0].length,
     		fieldHeight = this.cells.length,
     		fieldWidth = this.cells[0].length;

     	/**
     	 * If template less then field put it to center else
     	 * else start from left up coner
     	 */
     	if (templateHeight < fieldHeight && templateWidth < fieldWidth) {

     		startCol = Math.floor((fieldWidth - templateWidth) / 2);
     		startRow = Math.floor((fieldHeight - templateHeight) / 2);
     	}

     	return {
     		col: startCol,
     		row: startRow
     	}
    }
    return Field;

})();