let beam1;
let f1;
let f2;
let f3;

let origin1 = {
  x: 200,
  y: 300
}

let mouseIsDragging = false;

function setup() {
  createCanvas(600, 600);
  let initdata = { x: 0, y: 0, w: 300, h: 20, color: "blue", origin: origin1 };
  beam1 = new Beam(initdata);
  angleMode(DEGREES);

  let initf1 = { x: 150, y: 0, w: 4, length: 100, color: "green", angle: 0, origin: origin1 };

  f1 = new ForceArrow(initf1);

  let initf2 = { x: 0, y: 20, w: 4, length: 100, color: "orange", angle: 0, origin: origin1 };
  f2 = new ForceArrow(initf2);

  let initf3 = { x: 200, y: 20, w: 4, length: 100, color: "red", angle: 0, origin: origin1 };
  f3 = new ForceArrow(initf3);
}

function draw() {
  background(220);

  // Do the math
  f2.length = f1.length * (f3.x - f1.x) / (f2.x - f3.x);
  f3.length = -f1.length - f2.length;

  beam1.draw();
  cursor(ARROW); // Set the cursor to an arrow. 
  f1.draw();
  f2.draw();
  f3.draw();

}

class Beam {
  constructor(initdata) {
    this.x = initdata.x;
    this.y = initdata.y;
    this.w = initdata.w;
    this.h = initdata.h;
    this.color = initdata.color;
    this.origin = initdata.origin;
  }
  draw() {
    push();
    // First move to the origin
    translate(this.origin.x, this.origin.y);
    // Then move to the actual position
    translate(this.x, this.y);

    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}


class ForceArrow {
  constructor(initdata) {
    this.x = initdata.x;
    this.y = initdata.y;
    this.w = initdata.w;
    this.length = initdata.length;
    this.color = initdata.color;
    this.angle = initdata.angle;
    this.origin = initdata.origin;
    this.isBeingDragged = false;
  }
  draw() {
    // Draw a triangle
    push();
    fill(this.color);
    // First move to the origin
    translate(this.origin.x, this.origin.y);
    // Then move to the actual position
    translate(this.x, this.y);
    rotate(this.angle);
    // Rotate another 180 if negative l
    if (this.length < 0) {
      rotate(180);
    }
    triangle(0, 0, 10, -10, -10, -10);

    rect(-this.w / 2, -10, this.w, -abs(this.length));
    pop();

    // Drag-behaviour. 
    // Change to hand if over
    if (dist(mouseX, mouseY, this.origin.x + this.x, this.origin.y + this.y) < 20) {
      cursor(HAND);
    } else {
      //cursor(ARROW);
    }

    // If nothing is being dragged by the mouse
    if (mouseIsDragging == false && mouseIsPressed) {
      line(mouseX, mouseY, this.origin.x + this.x, this.origin.y + this.y);
      // and the mouse is pressed
      // check if mouse is "close enough" to this arrow (compensate for global pos)
      if (dist(mouseX, mouseY, this.origin.x + this.x, this.origin.y + this.y) < 20) {
        mouseIsDragging = true;
        // set the property of this arrow to "being dragged"
        this.isBeingDragged = true;

      }
    }

    // If this.isBeingDragged == true
    if(this.isBeingDragged){
      this.x = mouseX-this.origin.x;
    }
    // Update the x-value of this to the x-value of the mouse (compensate for global position)

    // if the mouse is released (or up) 
    if(mouseIsPressed == false && this.isBeingDragged){
      this.isBeingDragged = false;
      mouseIsDragging = false;

    }

  }
}