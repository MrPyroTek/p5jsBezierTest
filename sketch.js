let nombrecarrer = 6;
let tc = window.innerWidth/nombrecarrer;
let matrice = Array.from(Array(nombrecarrer), () => new Array(nombrecarrer));
let force = 0.01;
let i = 0;


function test(){window.location.reload();}



function rdm(x){
  return random(x*tc,x*tc+tc)
}

function rdmc(x,y){
  return random(200,((x*y)*235)/(nombrecarrer*nombrecarrer))
}

function generate(){
  for (let i = 0; i < nombrecarrer; i++) {
    for (let j = 0; j < nombrecarrer; j++) {
      curx = i*tc;
      cury = j*tc;
      matrice[i][j] = [
        createVector(curx, cury+random(0,tc)),
        createVector(rdm(i), rdm(j)),
        createVector(rdm(i), rdm(j)),
        createVector(curx, cury+random(0,tc)),
        createVector(rdm(i), rdm(j)),
        createVector(rdm(i), rdm(j)),
        [rdmc(i,j), rdmc(i,j), rdmc(i,j)],
        [rdmc(i,j), rdmc(i,j), rdmc(i,j)],
      ]
    }
  }
}

function regen(){
  for (let i = 0; i < nombrecarrer; i++) {
    for (let j = 0; j < nombrecarrer; j++) {
      curx = i*tc;
      cury = j*tc;
      matrice[i][j] = [
        matrice[i][j][0],
        matrice[i][j][1],
        matrice[i][j][2],
        createVector(curx, cury+random(0,tc)),
        createVector(rdm(i), rdm(j)),
        createVector(rdm(i), rdm(j)),
        matrice[i][j][6],
        [rdmc(i,j), rdmc(i,j), rdmc(i,j)],
      ]
    }
  }
}

function regenrdm(){
  var i = parseInt(random(0,nombrecarrer));
  var j = parseInt(random(0,nombrecarrer));
      curx = i*tc;
      cury = j*tc;
      matrice[i][j] = [
        matrice[i][j][0],
        matrice[i][j][1],
        matrice[i][j][2],
        createVector(curx, cury+random(0,tc)),
        createVector(rdm(i), rdm(j)),
        createVector(rdm(i), rdm(j)),
        matrice[i][j][6],
        [rdmc(i,j), rdmc(i,j), rdmc(i,j)],
      ]
}

function setup() {
  createCanvas(tc*nombrecarrer, tc*nombrecarrer);
  generate();
  drawlines();
}

function draw() {
  regenrdm();
  for (let i = 0; i < nombrecarrer; i++) {
    for (let j = 0; j < nombrecarrer; j++) {

      noFill();
      strokeWeight(5);
      stroke(matrice[i][j][6][0]+random(-5,5),matrice[i][j][6][1]+random(-5,5),matrice[i][j][6][2]+random(-5,5));
      if(i+1>=nombrecarrer) {
        bezier(matrice[i][j][0].x+2,matrice[i][j][0].y,
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i][j][0].x+tc-2,matrice[0][j][0].y);
      } else {
        bezier(matrice[i][j][0].x+2,matrice[i][j][0].y,
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i+1][j][0].x-2,matrice[i+1][j][0].y);
      }

      matrice[i][j][0].x = lerp(matrice[i][j][0].x,matrice[i][j][3].x,force);
      matrice[i][j][0].y = lerp(matrice[i][j][0].y,matrice[i][j][3].y,force);

      matrice[i][j][1].x = lerp(matrice[i][j][1].x,matrice[i][j][4].x,force);
      matrice[i][j][1].y = lerp(matrice[i][j][1].y,matrice[i][j][4].y,force);

      matrice[i][j][2].x = lerp(matrice[i][j][2].x,matrice[i][j][5].x,force);
      matrice[i][j][2].y = lerp(matrice[i][j][2].y,matrice[i][j][5].y,force);

      matrice[i][j][6][0] = lerp(matrice[i][j][6][0],matrice[i][j][7][0],force)
      matrice[i][j][6][1] = lerp(matrice[i][j][6][1],matrice[i][j][7][1],force)
      matrice[i][j][6][2] = lerp(matrice[i][j][6][2],matrice[i][j][7][2],force)
    }
  }
}

function drawlines() {
  for (let i = 0; i < nombrecarrer; i++) {
    for (let j = 0; j < nombrecarrer; j++) {
      noStroke();
      fill(matrice[i][j][6][0],matrice[i][j][6][1],matrice[i][j][6][2]);
      square(i*tc, j*tc, tc);
      //fill(255,0,0);
      //ellipse(matrice[i][j][0].x,matrice[i][j][0].y, 10,10);

      //fill(0,255,0);
      //ellipse(matrice[i][j][1].x,matrice[i][j][1].y, 5,5);
      //ellipse(matrice[i][j][2].x,matrice[i][j][2].y, 5,5);
//
      //if(i+1>=nombrecarrer) {
      //  line(matrice[i][j][0].x,matrice[i][j][0].y,
      //    matrice[i][j][0].x+tc,matrice[0][j][0].y);
      //} else {
      //  line(matrice[i][j][0].x,matrice[i][j][0].y,
      //    matrice[i+1][j][0].x,matrice[i+1][j][0].y);
      //}


      //bezier(matrice[i][j][0].x,matrice[i][j][0].y,
      //  matrice[i][j][1].y, matrice[i][j][1].y,
      //  matrice[i][j][2].y, matrice[i][j][2].y,
      //  matrice[i+1][j][0].x,matrice[i+1][j][0].y,);
    }
  }
}
