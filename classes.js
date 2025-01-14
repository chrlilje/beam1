/**
 * This is the Beam-class constructing a beam
 * 
 * @class
 */
class Beam {
    /**
     * 
     * @param {initdata.x} x - the x-coordinate of the beams starting location
     * @param {initdata.origin} origin - An object containint .x .y for origin of the beam 
     */
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

  /**
   * This BeamsAB class define a beam going from point a to b
   */
class BeamAB {
  /**
   * 
   * @param {initdata.x1 } initdata - start x 
   * @param {initdata.y1 } initdata - start y
   * @param {initdata.x2 } initdata - end x
   * @param {initdata.y2 } initdata - end y
   */
    constructor(initdata){
        this.x1 = initdata.x1;
        this.y1 = initdata.y1;
        this.x2 = initdata.x2;
        this.y2 = initdata.y2;

        this.w = initdata.w;
        this.color = initdata.color;
        this.origin = initdata.origin;
    }

    draw(){
        push();
        // First move to the origin
        translate(this.origin.x, this.origin.y);
        strokeWeight(this.w);
        // Then move to the actual position
        line(this.x1, this.y1, this.x2, this.y2);
        pop();
    }
}

class BeamOO {
  constructor(initdata){
    this.o1 = initdata.origin1;
    this.o2 = initdata.origin2;
    this.o3 = initdata.origin3;

    this.w = initdata.w;
    this.color = initdata.color;
    this.fixedLength = initdata.length;
  }

  draw(){
    push();
    // First move to the origin
    strokeWeight(this.w);
    stroke(this.color);
    // Calculate the direction vector
    let dx = this.o2.x - this.o1.x;
    let dy = this.o2.y - this.o1.y;
    // Calculate the length of the line
    let length = dist(this.o1.x, this.o1.y, this.o2.x, this.o2.y);
    // Normalize the direction vector and extend it by the fixed length
    let extendX = dx / length * this.fixedLength;
    let extendY = dy / length * this.fixedLength;
    // Calculate the third point
    this.o3.x = this.o1.x + extendX;
    this.o3.y = this.o1.y + extendY;

    // Draw the lines
    line(this.o1.x, this.o1.y, this.o2.x, this.o2.y);
    line(this.o2.x, this.o2.y, this.o3.x, this.o3.y);

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