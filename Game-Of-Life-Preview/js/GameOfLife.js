/**
 * @fileoverview GameLogicModule (controller)
 * @author anton_razumovskyi@epam.com
 */

/**
 * @module GameOfLifeModule
 */
var GameOfLifeModule = (function() {
    "use strict";
    /**
     * GameOfLife constructor
     * @constructor
     * @param {Field} model
     * @param {View} view
     */
    function GameOfLife(model, view) {

        this.model = model;
        this.view = view;
    }

    /**
     * Create game
     * @function
     */
    GameOfLife.prototype.initGame = function() {

        this.view.drawField();
        this.model.setCells(this.view.cells);
        this.bindEvents();
    };

    /**
     * Add event listeners to cells and buttons
     * @function
     */
    GameOfLife.prototype.bindEvents = function() {

        /**
         * Handle click event
         * @function
         */
        function onFieldClickHandler(ev) {

            var source = ev.srcElement;

            if (source.parentNode.className === "row" && !that.view.gameRun) {

                gameCellClick(source);
            }

            /**
             * Invoke when game field cell click
             * @function
             * @param source source of click
             */
            function gameCellClick(source) {

                if (ViewModule.aliveCell === source.className) {

                    source.className = ViewModule.deadCell;
                } else {

                    source.className = ViewModule.aliveCell;
                }
            }
        }

        /**
         * Inovke when button clicked
         * @function
         * @param source of click
         */
        function onButtonClickHandler(ev) {

            var source = ev.srcElement;

            if (source.id === "startButton") {

                startButtonClick(source);

            } else if (source.id === "clearButton") {

                clearButtonClick();

            } else if (source.id === "lifeButton") {

                oneLifeButton();

            }else if (source.id in Templates) {

                templateButtonClick(source);
            }

            /**
             * Invoke when start button click
             * @function
             * @param {HTMLElement} source of click
             */
            function startButtonClick(source) {

                that.view.gameRun = !that.view.gameRun;
                requestAnimationFrame(updateGame);
                changeStartButton(source);
            }

            /**
             * Clear field
             * @function
             */
            function clearButtonClick() {

            	that.view.clearField();
            }

            /**
             * Run only one generation
             * @function
             */
            function oneLifeButton() {

            	var newGeneration;

            	if (that.view.gameRun) {

            		that.view.gameRun = false;
            		changeStartButton();
            	}

            	newGeneration = that.model.runGeneration();
            	that.view.updateField(newGeneration);
            }
            /**
             * Change start button to stop button
             * @function
             * @param {HTMLElement} source Button state
             */
            function changeStartButton() {

            	var startButton = that.view.buttons.querySelector("#startButton");

                if (that.view.gameRun) {

                	startButton.innerHTML = "Stop";
                } else {

                	startButton.innerHTML = "Start";
                }
            }

            /**
             * Draw template on the field
             * @function
             */
            function templateButtonClick(source) {

            	var template = Templates[source.id],
            		aliveCells = that.model.markTemplate(template);

            	that.view.gameRun = false;
            	that.view.clearField();
            	that.view.updateField(aliveCells);
            }

            /**
	         * Update state of game continuesly while game running
	         * @function
	         */
	        function updateGame() {
	            if (that.view.gameRun) {
	                requestAnimationFrame(updateGame);
	            }

	            that.view.curTime = new Date().getTime();

	            if ((that.view.curTime - that.view.prevTime) > ViewModule.GAME_SPEED) {

	                var newGeneration = that.model.runGeneration();

	                // if newGeneration empty stop animation
	                if (!newGeneration.length) {

	                	that.view.gameRun = false;
	                	changeStartButton();
	                }

	                that.view.updateField(newGeneration);

	                that.view.prevTime = that.view.curTime;
	            }
	        }
        }

        var that = this;

        this.view.container.addEventListener("click", onFieldClickHandler);
        this.view.buttons.addEventListener("click", onButtonClickHandler);

    };

    return GameOfLife;
})();