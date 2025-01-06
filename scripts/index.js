/* GLOBAL VARS */
let selectedItem = 0; // controleld by mouse move
const items = ["rect", "ellipse", "tri"]; // items to select
const itemSize = 15; // the size of one item
const pos = { x: 0, y: 0 };
// obj literals for now
/**
 * type: any string in items
 * x: x
 * y: y
 */
const placed = [];

/* HELPER METHODS */

/**
 * given an item, renders it
 * @param {Item Object Literal} item
 */
function renderItem(item) {
  switch (item.type) {
    case "rect":
      rect(item.x, item.y, itemSize, itemSize);
      break;
    case "ellipse":
      ellipse(item.x, item.y, itemSize, itemSize);
      break;
    case "tri":
      triangle(
        item.x,
        item.y + itemSize,
        item.x + itemSize,
        item.y + itemSize,
        item.x + itemSize / 2,
        item.y
      );
      break;
  }
}

/**
 * renders the UI bar
 */
function uiBar() {
  // calc the size of one ui square
  const numItems = items.length;
  const cellSize = itemSize * 2;
  const uiSize = cellSize * numItems;
  const uiStartPos = width / 2 - uiSize / 2;
  // render it
  for (let i = 0; i < numItems; i++) {
    // temporary style changes
    push();

    /* STYLE CHAGES */
    // default to light stroke weight
    strokeWeight(1);
    fill(20, 100);
    stroke(20);
    // thicken it on selected item
    if (i === selectedItem) {
      fill(20, 200);
      strokeWeight(2);
    }
    /* END STYLE CHAGES */

    // brnd
    rect(uiStartPos + i * cellSize, height - cellSize, cellSize, cellSize);
    // clear temp style changes
    pop();

    // render the item
    renderItem({
      type: items[i],
      x: uiStartPos + i * cellSize + cellSize / 4,
      y: height - cellSize + cellSize / 4,
    });
  }
}

/**
 * if a movement key is pressed, moves the camera position
 * if shift is pressed, double the movement speed
 * @returns none
 */
function moveCamera() {
  if (!keyIsPressed) return;

  const speed = 5;
  let modifier = 1;
  if (keyIsDown(SHIFT)) modifier = 2;

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) pos.y += speed * modifier;
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) pos.x += speed * modifier;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) pos.y -= speed * modifier;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) pos.x -= speed * modifier;
}

/* MAIN METHODS */

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
  // sets circles and ellipses to start being drawn from the top left corner
  ellipseMode(CORNER);
}

/**
 * main program loop
 */
function draw() {
  push();
  // check to see if we can move the camera
  moveCamera();
  translate(pos.x, pos.y);
  background(150);

  // draw the placed items
  for (const item of placed) {
    renderItem(item);
  }
  pop();

  // basic case statement
  renderItem({
    type: items[selectedItem],
    x: mouseX,
    y: mouseY,
  });

  // ui rendered last ofc
  uiBar();
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

/**
 * the moment the mouse is pressed, add the selected item. powered by
 *    p5 mousepressed event handler
 *
 * mousepressed used over mouseclicked as mouse clicked fires AFTER
 *    the mouse is released. mousereleased also not used for same reason
 * @returns none
 */
function mousePressed() {
  // do something else if right clicked
  if (mouseButton === "right") return;

  // add the selected item
  placed.push({
    type: items[selectedItem],
    x: mouseX - pos.x,
    y: mouseY - pos.y,
  });
}

/**
 * p5 keyPressed event handler handles key inputs
 *
 * c clears the screen, backspace removes the last iem
 */
function keyPressed() {
  // if c is pressed, removes all items
  if (key === "c" && placed.length) placed.splice(0, placed.length);
  // key var doesn't hold non char/num keys so use keyCode
  if (keyCode === BACKSPACE && placed.length)
    placed.splice(placed.length - 1, 1);
}
