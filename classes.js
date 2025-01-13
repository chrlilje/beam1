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
    constructor(initdata){
        this.x = initdata.x1;
        this.y = initdata.y1;
        this.h = initdata.h;


        // We want to convert to an angle and a length
        let beamLength = dist(initdata.x1, initdata.y1, initdata.x2, initdata.y2);
        this.w = beamLength;



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