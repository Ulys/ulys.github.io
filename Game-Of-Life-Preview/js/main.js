(function main() {
    console.log("main ...");

    var container = document.getElementById("container"),
        buttons = document.getElementById("buttons"),
        view = new ViewModule(container, buttons),
        field = new FieldModule(),
        controller = new GameOfLifeModule(field, view),
        animationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    window.requestAnimationFrame = animationFrame;

    controller.initGame();
})();