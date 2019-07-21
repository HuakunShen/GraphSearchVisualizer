import * as constant from "./constants.js";
import {Cell} from "./search.js";
export function button_click() {
    // game_active = true;
    console.log("clicked");
}
export function setup_ui() {
    $("button")[0].onclick = button_click;
}


export function clearColorOnBoard(color) {

}