let numDots = 10;
let dots, nextDots, dotCounters, dotMoves, lineColors;
let radius;

function setup() {
  createCanvas(600, 600);
  dots = [];
  nextDots = [];
  dotCounters = [];
  dotMoves = [];
  lineColors = [];
  for (let i = 0; i < numDots; i++) {
    d = setRandomDot();
    nd = setRandomDot();
    dc = setCount();
    dots[i] = d;
    nextDots[i] = nd;
    dotCounters[i] = dc;
    dotMoves[i] = setDotMoves(d, nd, dc);
    lineColors[i] = setLineColor();
  }
  radius = min(width, height) / 2;
}

function draw() {
  background(255);
  moveDotsInCount(dots, nextDots, dotMoves, dotCounters);
  drawLines(dots, radius / 2);
}

function setRandomDot() {
  return [random(PI), random(TWO_PI)];
}

function setCount() {
  return random(60, 120);
}

function setDotMoves(dot, nextDot, count) {
  let deltaPhi = nextDot[0] - dot[0];
  let deltaTheta = nextDot[1] - dot[1];
  if (deltaTheta > PI) {
    deltaTheta -= TWO_PI;
  }
  if (deltaTheta < -PI) {
    deltaTheta += TWO_PI;
  }

  return [deltaPhi / count, deltaTheta / count];
}

function setLineColor() {
  let cThreshold = 10;
  let r = random(cThreshold, 10);
  let g = random(cThreshold, 10);
  let b = random(cThreshold, 10);
  let rBright = r + g + b;
  let brignt = 200;
  r = (r * brignt) / rBright;
  g = (g * brignt) / rBright;
  b = (b * brignt) / rBright;
  return color(r, g, b);
}

function moveDot(dot, move) {
  let phi = dot[0] + move[0];
  let theta = dot[1] + move[1];
  return [phi, theta];
}

function moveDotsInCount(ds, nds, mvs, cnts) {
  for (let i = 0; i < cnts.length; i++) {
    if (cnts[i] <= 0) {
      let d = nds[i];
      let nd = setRandomDot();
      let cnt = setCount();
      ds[i] = d;
      nds[i] = nd;
      cnts[i] = cnt;
      mvs[i] = setDotMoves(d, nd, cnt);
    }
    cnts[i] -= 1;
    ds[i] = moveDot(ds[i], mvs[i]);
  }
}

function drawLines(dots, r) {
  for (let i in dots) {
    let lc = lineColors[i];
    let dot = dots[i];
    fill(red(lc), green(lc), blue(lc), 150);
    noStroke();
    let phi = dot[0];
    let theta = dot[1];
    let phiA = PI / 2 - (phi - PI / 2);
    let thetaA = theta + PI;
    let x = width / 2 + r * sin(phi) * cos(theta);
    let y = height / 2 - r * sin(phi) * sin(theta);
    let xA = width / 2 + r * sin(phiA) * cos(thetaA);
    let yA = height / 2 - r * sin(phiA) * sin(thetaA);
    let cr = 8 + 2 * cos(phi);
    let crA = 8 + 2 * cos(phiA);
    circle(x, y, cr);
    circle(xA, yA, crA);
    stroke(red(lc), green(lc), blue(lc), 150);
    line(x, y, xA, yA);
  }
}
