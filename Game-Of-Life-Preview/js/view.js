/**
 * @fileoverview View module
 * @author anton_razumovskyi@epam.com
 */

/**
 * @module View module
 */
var ViewModule = (function() {
    "use strict";

    /**
     * @constructor
     * @param {HTMLElement} container
     * @param {HTMLElement} buttons
     */
    function View(container, buttons) {
        console.log("View constructor ...");

        this.container = container;
        this.buttons = buttons;
        this.colNumber = countNumberOfColumns(container);
        this.rowNumber = countNumberOfRows();
        this.cells = null;
        this.gameRun = false;
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
     * @const Width of cell
     */
    View.CELL_WIDTH = 30;

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
    };

    /**
     * Get cells from container
     * @function
     * @private
     */
    View.prototype._saveCells = function() {

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
    };

    /**
     * @function count number of cell in row respectively to the screen size
     * @return {Number} number of cells in a row
     */
    function countNumberOfColumns(container) {

        var cellWidth,
            pixelRatio = window.devicePixelRatio,
            horizontalMatrgins = 100 * pixelRatio, //px horizontal margins
            contWidth = container.clientWidth;

            cellWidth = pixelRatio * View.CELL_WIDTH;

            /**
             * Math.floor() to prevent decimal
             */
        return Math.floor((contWidth - horizontalMatrgins) / cellWidth);
    }

    /**
     * @function count number of cell in column respectively to the screen size
     * @return {Number} number of cells in a row
     */
    function countNumberOfRows() {

        var cellWidth,
            winHeight = window.innerHeight,
            pixelRatio = window.devicePixelRatio,
            headerHeight = 100 * pixelRatio, //px header height
            verticalMargins = 100 * pixelRatio; //px vertical margins

            cellWidth = pixelRatio * View.CELL_WIDTH;

             /**
             * Math.floor() to prevent decimal
             */
        return Math.floor((winHeight - headerHeight -
                        verticalMargins) / cellWidth);
    }

    /**
     * Update view
     * @function
     * @param {Array[HTMLElements]} aliveCells
     */
    View.prototype.updateField = function(aliveCells) {

        this.clearField();
        this._drawAliveCells(aliveCells);
    };

    /**
     * Paint all cells to dead state
     * @function
     */
    View.prototype.clearField = function() {

        this.cells.forEach(function(row) {

            row.forEach(function(el) {

                el.className = View.deadCell;
            });
        });
    };

    /**
     * @function
     * @private
     * @param {Array[HTMLElements]} aliveCells
     */
    View.prototype._drawAliveCells = function(aliveCells) {

        aliveCells.forEach(function(el) {

            el.className = View.aliveCell;
        });
    };

    return View;
})();