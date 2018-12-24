var player = null;
var foods = [];
var zoom = 1;
var playerMass = 64;
var foodMass = 1;

function randomPickColor () {
  var rgbR = parseInt(random(0, 255));
  var rgbG = parseInt(random(0, 255));
  var rgbB = parseInt(random(0, 255));
  return 'rgb(' + rgbR + ', ' + rgbG + ',' + rgbB + ')';
}

function drawGrid () {
  var length = height/18;
  var currentX = -width;
  var currentY = -height;
  stroke(200);
  while(currentY < height) {
    var currentX = -width;
    while(currentX < width) {
      line(currentX, currentY, currentX, height);
      line(currentX, currentY, width, currentY);
      currentX += length;
    }
    currentY += length;
  }
  noStroke();
}

function setup () {
  createCanvas(1200, 1200);
  player = new Circle(0, 0, playerMass, randomPickColor());
  for (var i = 0; i < 100; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    foods[i] = new Circle(x, y, 16, randomPickColor());
  }
}

function draw() {
  background(255);

  translate(width/2, height/2);
  var newzoom = playerMass / player.radius;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-player.pos.x, -player.pos.y);

  drawGrid();

  for (var i = 0; i < foods.length; i++) {
    var food = foods[i];
    food.show();
    if (player.eats(food)) {
      foods.splice(i, foodMass);
    }
  }

  player.show();
  player.update();
}