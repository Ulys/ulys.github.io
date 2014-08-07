/**
 * @fileoverview GameLogicModule (controller)
 * @author anton_razumovskyi@epam.com
 */

/**
 * @module GameOfLifeModule
 */
var GameOfLifeModule = (function() {

    /**
     * GameOfLife constructor
     * @constructor
     * @param {Field} model
     * @param {View} view
     */
    function GameOfLife(model, view) {
        console.log("Game Of Life constructor ...");
        this.model = model;
        this.view = view;
    }

    /**
     * Create game
     * @function
     */
    GameOfLife.prototype.initGame = function() {
        console.log("Game Of Life init game ...");

        this.view.drawField();
        this.model.setCells(this.view.cells);
        this.bindEvents();
    }

    /**
     * Add event listeners to cells and buttons
     * @function
     */
    GameOfLife.prototype.bindEvents = function() {

        var that = this;
        this.view.container.addEventListener("click", onFieldClickHandler);
        this.view.buttons.addEventListener("click", onButtonClickHandler);
        /**
         * Handle click event
         * @function
         */
        function onFieldClickHandler(ev) {
            console.log("on click handler");

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
             * @function
             * @param {HTMLElement} source Button state
             */
            function changeStartButton(source) {
                console.log("view change start button ...");
                if (that.view.gameRun) {
                	source.innerHTML = "Stop";
                } else {
                	source.innerHTML = "Start";
                }
            }
        }

        /**
         * Update state of game continuesly while game running
         * @function
         */
        function updateGame() {
            if (that.view.gameRun) {
                requestAnimationFrame(updateGame)
            }

            that.view.curTime = new Date().getTime();

            if ((that.view.curTime - that.view.prevTime) > ViewModule.GAME_SPEED && !that.view.pause) {

                var newGeneration = that.model.runGeneration();
                that.view.updateField(newGeneration);

                that.view.prevTime = that.view.curTime;
            }
        }


    }

    return GameOfLife;
})();