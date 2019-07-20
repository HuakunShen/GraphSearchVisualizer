import {button_click} from "/graph_search_v2/helper_functions.js";
let game_active = false;
//
// function setup() {
//     thisisMain();
//
//     createCanvas(400, 400);
//     game_active = false;
//     // console.log("setup")
// }
//
// function draw() {
//     // console.log("Asd")
//     background(220);
//     if (game_active) {
//         console.log("clicked");
//         background(0);
//     }
//
//     game_active = false;
//
// }
//


setup();
setInterval(function () {
    draw();

}, 33);

function setup() {
    $("button")[0].onclick = button_click;
}

function draw() {
    if (game_active) {
        console.log("hi");
        game_active = false;
    }

}