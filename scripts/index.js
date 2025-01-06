/* GLOBAL VARS */
let selectedItem = 0; // controleld by mouse move
let items = ["rect", "ellipse", "tri"]; // items to select

/* METHODS */

/**
 * loads any necessary media before setup ever runs
 * 
 * normally media loading is async, this prevents app from 
 *    running until all data is loaded
 */
function preload() {}

/**
 * prelude to draw
 */
function setup() {
  createCanvas(500, 500);
}

/**
 * main program loop
 */
function draw() {
  background(42);

  // basic case statement
  switch (items[selectedItem]) {
    case "rect":
      rect(mouseX, mouseY, 10, 10);
      break;
    case "ellipse":
      ellipse(mouseX, mouseY, 10, 10);
      break;
    case "tri":
      triangle(
        mouseX,
        mouseY,
        mouseX + 20,
        mouseY - 20,
        mouseX + 20,
        mouseY + 20
      );
      break;
  }
}

/**
 * p5 event handler for mousewheel movements
 *
 * handles the cycling of selected items
 *
 * @param {MouseEvent} event holds info on the mouse event
 */
function mouseWheel(event) {
  // handle scroll down
  if (event.delta > 0) {
    selectedItem = selectedItem - 1 < 0 ? items.length - 1 : --selectedItem;
    // handle scroll up
  } else {
    selectedItem = selectedItem + 1 >= items.length ? 0 : ++selectedItem;
  }
}
