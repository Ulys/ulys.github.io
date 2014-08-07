/**
 * @fileoverview View module
 * @author anton_razumovskyi@epam.com
 */

/**
 * @module View module
 */
var ViewModule = (function() {

    /**
     * @constructor
     * @param {HTMLElement} container
     * @param {HTMLElement} buttons
     */
    function View(container, buttons) {
        console.log("View constructor ...");

        this.container = container;
        this.buttons = buttons;
        this.colNumber = _countNumberOfColumns(container);
        this.rowNumber = _countNumberOfRows();
        this.cells = null;
        this.gameRun = false;
        this.pause = false;
        this.curTime = 0;
        this.prevTime = 0;
    }

    /**
     * @const frequency of field refresh while game is run
     */
    View.GAME_SPEED = 250;

    /**
     * @const {String} CSS class of dead cell
     */
    View.deadCell = "dead";

    /**
     * @const {String} CSS class of alive cell
     */
    View.aliveCell = "alive";

    /**
     * @function create field
     */
    View.prototype.drawField = function() {
        console.log("view draw field ...");

        var i, j, cell, row, rowNum, colNum,
            field = document.createDocumentFragment();

        for (i = 0, rowNum = this.rowNumber; i < rowNum; i++) {
            row = document.createElement("div");
            row.className = "row";

            for (j = 0, colNum = this.colNumber; j < colNum; j++) {

                cell = document.createElement("div");
                cell.className = "dead";
                row.appendChild(cell);
            }

            field.appendChild(row);
        }

        this.container.appendChild(field);
        this._saveCells();
    }
    /**
     * Get cells from container
     * @function
     * @private
     */
    View.prototype._saveCells = function() {
        console.log("View save cells ...");

        var i, j, row, rowNum, colNum, cell,
            allRows = this.container.children,
            cellsArray = [];

        for (i = 0, rowNum = allRows.length; i < rowNum; i++) {

            cellsArray[i] = [];
            row = allRows[i].children;

            for (j = 0, colNum = row.length; j < colNum; j++) {

                cell = row[j];
                cellsArray[i].push(cell);
            }
        }

        this.cells = cellsArray;
    }

    /**
     * @function count number of cell in row respectively to the screen size
     * @return {Number} number of cells in a row
     */
    function _countNumberOfColumns(container) {
        var CELL_WIDTH = 20, //px standart cell width
            HORIZONTAL_MARGINS = 100, //px horizontal margins
            contWidth = container.clientWidth;

        return Math.floor((contWidth - HORIZONTAL_MARGINS) / CELL_WIDTH);
    }

    /**
     * @function count number of cell in column respectively to the screen size
     * @return {Number} number of cells in a row
     */
    function _countNumberOfRows() {
        var CELL_WIDTH = 20, //px standart cell width
            HEADER_HEIGHT = 100, //px header height
            VERTICAL_MARGINS = 100, //px vertical margins
            winHeight = window.innerHeight;

        return Math.floor((winHeight - HEADER_HEIGHT - VERTICAL_MARGINS) / CELL_WIDTH);
    }

    /**
     * Update view
     * @function
     * @param {Array[HTMLElements]} aliveCells
     */
    View.prototype.updateField = function(aliveCells) {
        console.log("View update field ...");
        this.clearField();
        this._drawAliveCells(aliveCells);
    }

    /**
     * Paint all cells to dead state
     * @function
     */
    View.prototype.clearField = function() {
        console.log("View clear field ...");
        this.cells.forEach(function(row) {

            row.forEach(function(el) {
                el.className = View.deadCell;
            });
        });
    }

    /**
     * @function
     * @private
     * @param {Array[HTMLElements]} aliveCells
     */
    View.prototype._drawAliveCells = function(aliveCells) {
        console.log("View draw alive cells ...");
        aliveCells.forEach(function(el) {
            el.className = View.aliveCell;
        });
    }

    return View;
})();