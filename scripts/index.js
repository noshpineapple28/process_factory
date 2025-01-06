let selectedItem = 0;
let items = ["rect", "ellipse", "tri"];

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(42);
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

function mouseWheel(event) {
  if (event.delta > 0) {
    selectedItem = selectedItem - 1 < 0 ? items.length - 1 : --selectedItem;
  } else {
    selectedItem = selectedItem + 1 >= items.length ? 0 : ++selectedItem;
  }
}
