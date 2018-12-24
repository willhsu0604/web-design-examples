function Circle (x, y, radius, color) {
  this.pos = createVector(x, y);
  this.radius = radius;
  this.vector = createVector(0,0);

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.radius + other.radius) {
      var sum = PI * this.radius * this.radius + PI * other.radius * other.radius;
      this.radius = sqrt(sum / PI);
      return true;
    } else {
      return false;
    }
  }

  this.update = function () {
    var newVector = createVector(mouseX-width/2, mouseY-height/2);
    newVector.setMag(3);
    this.vector.lerp(newVector, 0.2);
    this.pos.add(this.vector);
  }

  this.show = function () {
    fill(color);
    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    noFill();
  }

}