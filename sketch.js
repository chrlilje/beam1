//import { ForceArrow } from "./classes.js";
//import { Beam } from "./classes.js";

let f1;
let f2;
let f3;

let origin1 = {
  x: 200,
  y: 300
}
let beams = [];
let arrow = [];

let mouseIsDragging = false;

function setup() {
  createCanvas(600, 600);
  let initdata = { x: 0, y: 0, w: 300, h: 20, color: "maroon", origin: origin1 };
  let newBeamToAdd = new Beam(initdata);
  beams.push(newBeamToAdd);

  newBeamToAdd = new Beam(initdata);
  newBeamToAdd.y = 20;
  newBeamToAdd.color = "yellow"

  beams.push(newBeamToAdd);

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

  for(let beam of beams){
    beam.draw();
  }
  cursor(ARROW); // Set the cursor to an arrow. 
  f1.draw();
  f2.draw();
  f3.draw();

}
