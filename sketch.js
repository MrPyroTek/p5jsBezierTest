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
        [100,100,100]
      ]
      matrice[i][j][8] = [matrice[i][j][6][0],matrice[i][j][6][1],matrice[i][j][6][2]]
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
        [100,100,100]
        
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
        matrice[i][j][8]
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





      //dessine le gradient en dessous de la courbe

      beginShape();
      noStroke();
      if(j+1<nombrecarrer){
      fillGradient('linear', {
        from : [i*tc+(tc/2),j*tc+(tc/2)],   // x, y : Coordinates
        to : [i*tc+(tc/2),j*tc+tc], // x, y : Coordinates
        steps : [
            color(matrice[i][j][6][0],matrice[i][j][6][1],matrice[i][j][6][2]),
            color(matrice[i][j+1][8][0],matrice[i][j+1][8][1],matrice[i][j+1][8][2])
            //color(255)
          ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
    });} else {
      fill(100)
    }


      vertex(matrice[i][j][0].x+2,matrice[i][j][0].y,);
      if(i+1>=nombrecarrer) {
        bezierVertex(
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i][j][0].x+tc,matrice[0][j][0].y);
          vertex(matrice[i][j][0].x+tc+1,matrice[0][j][0].y);
          vertex(i*tc+tc,j*tc+tc)
          vertex(i*tc,j*tc+tc);
      } else {
        bezierVertex(
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i+1][j][0].x+1,matrice[i+1][j][0].y);
          vertex(i*tc+tc,j*tc+tc);
          vertex(i*tc,j*tc+tc);
      }
      endShape();


      //dessine la courbe
      noFill();
      strokeWeight(5);
      stroke(matrice[i][j][6][0]+random(-5,5),matrice[i][j][6][1]+random(-5,5),matrice[i][j][6][2]+random(-5,5));
      if(i+1>=nombrecarrer) {
        bezier(matrice[i][j][0].x+2,matrice[i][j][0].y,
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i][j][0].x+tc-2,matrice[0][j][0].y);
          vertex(matrice[i][j][0].x+tc+1,matrice[0][j][0].y);
          vertex(i*tc+tc,j*tc+tc)
          vertex(i*tc,j*tc+tc);
      } else {
        bezier(matrice[i][j][0].x+2,matrice[i][j][0].y,
          matrice[i][j][1].x, matrice[i][j][1].y,
          matrice[i][j][2].x, matrice[i][j][2].y,
          matrice[i+1][j][0].x+1,matrice[i+1][j][0].y);
          vertex(i*tc+tc,j*tc+tc);
          vertex(i*tc,j*tc+tc);
      }

      fill(255)







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
      square(i*tc, j*tc, tc+2);
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
