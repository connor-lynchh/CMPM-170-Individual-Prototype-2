title = "GO UP";

description = `
[Press] Jump
`;

characters = [];

options = {
  theme: "dark",
  isPlayingBgm: true,
  isReplayEnabled: true,
};

let player, v;
let floors;
let jumpWay;
let jumpPower;
let floorAppDist;
let scr;
let collideTogle=true;

function update() {
  if (!ticks) {
    player = vec(50, 50);
    v = vec();
    floors = [vec(50, 70)];
    jumpWay = jumpPower = floorAppDist = 1;
  }
  player.add(v);
  v.y += input.isPressed ? 0.05 : 0.1;
  //score += scr = (player.y < 30 ? (30 - player.y) * 0.1 : 0) + difficulty * 0.1;
  scr = (player.y < 30 ? (30 - player.y) * 0.1 : 0) + difficulty * 0.1;
  if ((floorAppDist -= scr) < 0) {
    floorAppDist = rnd(99);     // controls how often a new floor appears, smaller parameter->more flrs
    floors.push(vec(rnd(50,99), rnd(-9,30)));   // Randomly place a new floor in the upper right
  }
  player.y += scr;
  //
  //  Provides movement to the floors coming down
  color("blue");
  box(52,97,99,7);
  floors = floors.filter((f) => {
    f.y += scr;
    f.x += -scr*.5;
    box(f, 33, 7);
    return f.y < 99;
  });
  // place a red box behind green player box to detect collisions with floors
  // changing the box color to transparent will hide the collison box.  This is
  // an aethetic taste
  color("red");
  for (;;) {
    if (!box(player, 1, 7).isColliding.rect.blue) {
      break;
    }
    if (collideTogle){
        if (player.y>89){
            score--;
            }
        else {
            score++;
            collideTogle=false;
            } 
        
        //collideTogle=false;
    }
    player.y--;
    v.set();
    jumpPower = 1;
  }
  color("green");
  box(player, 7, 7);
  if (input.isJustPressed) {
    play("jump");
    collideTogle=true;
    v.x = jumpWay *= 0;
    v.y = -3 * jumpPower;
    jumpPower *= 0.7;
  }
  if (player.y > 99 || score<0) {
    play("explosion");
    score=0;
    end("GAME OVER");
  }
}
addEventListener("load", onLoad);
