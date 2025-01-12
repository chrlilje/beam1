let beam1;
let f1;
let f2;
let f3;

function setup() {
  createCanvas(600, 600);
  let initdata = { x: 0, y: 0, w: 300, h: 20, color: "blue" };
  beam1 = new Beam(initdata);
  angleMode(DEGREES);

  let initf1 = { x: 150, y: 0, w: 4, length: 100, color: "green",angle:0 };

  f1 = new ForceArrow(initf1);

  let initf2 = { x: 0, y: 20, w: 4, length: 100, color: "orange",angle:0 };
  f2 = new ForceArrow(initf2);

  let initf3 = { x: 200, y: 20, w: 4, length: 100, color: "red",angle:0 };
  f3 = new ForceArrow(initf3);
}

function draw() {
  background(220);

  // Do the math
  f2.length = f1.length * (f3.x - f1.x) / (f2.x-f3.x);
  f3.length = -f1.length - f2.length;

  translate(200,300)

  f1.draw();
  f2.draw();
  f3.draw();
  beam1.draw();

}

class Beam {
  constructor(initdata) {
    this.x = initdata.x;
    this.y = initdata.y;
    this.w = initdata.w;
    this.h = initdata.h;
    this.color = initdata.color;
  }
  draw() {
    push();
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

  }
  draw() {
    // Draw a triangle
    push();
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.angle);
    // Rotate another 180 if negative l
    if(this.length <0 ){
      rotate(180);
    }
    triangle(0, 0, 10, -10, -10, -10);

    rect(-this.w / 2, -10, this.w, -abs(this.length));
    pop();
  }
}