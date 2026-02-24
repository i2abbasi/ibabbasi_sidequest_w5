let player = { x: 300, y: 300, s: 1.5 };
let cam = { x: 0, y: 0 };

const WORLD_W = 2400;
const WORLD_H = 1600;

const VIEW_W = 800;
const VIEW_H = 480;

let orbs = [];

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  noStroke();

  // place quiet glowing orbs around the world
  for (let i = 0; i < 12; i++) {
    orbs.push({
      x: random(200, WORLD_W - 200),
      y: random(200, WORLD_H - 200),
      r: random(15, 25),
      found: false,
    });
  }
}

function draw() {
  // --- movement ---
  const dx =
    (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
    (keyIsDown(LEFT_ARROW) || keyIsDown(65));

  const dy =
    (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
    (keyIsDown(UP_ARROW) || keyIsDown(87));

  const len = max(1, abs(dx) + abs(dy));

  player.x += (dx / len) * player.s;
  player.y += (dy / len) * player.s;

  // --- smooth camera easing (makes it meditative) ---
  cam.x = lerp(cam.x, player.x - width / 2, 0.05);
  cam.y = lerp(cam.y, player.y - height / 2, 0.05);

  // --- background ---
  background(15, 20, 30);

  push();
  translate(-cam.x, -cam.y);

  // subtle world background
  fill(25, 30, 45);
  rect(0, 0, WORLD_W, WORLD_H);

  // floating particles
  for (let i = 0; i < 60; i++) {
    fill(100, 120, 180, 40);
    ellipse(
      (i * 300) % WORLD_W,
      (i * 200) % WORLD_H,
      4 + sin(frameCount * 0.01 + i) * 2,
    );
  }

  // glowing orbs (discoverable symbols)
  for (let orb of orbs) {
    let d = dist(player.x, player.y, orb.x, orb.y);

    if (d < 40) {
      orb.found = true;
    }

    if (!orb.found) {
      fill(120, 160, 255, 120);
      ellipse(orb.x, orb.y, orb.r + sin(frameCount * 0.05) * 4);
    } else {
      fill(80, 100, 180, 60);
      ellipse(orb.x, orb.y, orb.r);
    }
  }

  // player
  fill(180, 220, 255);
  ellipse(player.x, player.y, 20);

  pop();

  // HUD
  fill(200);
  text("Week 5 — Reflective Camera Experience", 12, 20);
  text("Move slowly. Discover the glowing memories.", 12, 40);
}
