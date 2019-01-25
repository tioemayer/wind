let input, button;
let key='6c08c80972c6478e88d92033191101'; // signup https://www.apixu.com/signup.aspx
let wind_speed=0;
let windDir=0;
let town;
let land;
let himmelsrichtung=0;
let temp_c=[];
let img;

let xpos=3;
let ypos=100;

let xforward=0;
let yforward=0;

let allepfeile=[];//Array fuer alle pfeile

let abstandpfeile=120; //kannst du frei setzen

let fontBold;
function preload() {
  fontBold = loadFont('assets/Barlow-ExtraBold.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    img = loadImage("assets/arrow.svg");  // Load the image

    let url = 'https://api.apixu.com/v1/current.json?key='+key+'&q=Zurich';
    //https://api.apixu.com/v1/forecast.json?key=6c08c80972c6478e88d92033191101&q=Zürich&days=1'
    input = createInput();//https://p5js.org/examples/dom-input-and-button.html
    input.position(100, 110);

    button = createButton('submit');
    button.position(input.x + input.width, 110);
    button.mousePressed(reloadJson);

    textFont(fontBold);
    text('Font Style Bold', 10, 70);

    xpos=width/2;
    ypos=height/2;

    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}


function reloadJson(){
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=1';
    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
    wind_speed=weather.current.wind_kph;
    windDir=weather.current.wind_degree;
    temp_c=weather.current.temp_c;
    town=weather.location.name;
    land=weather.location.country;
    himmelsrichtung=weather.current.wind_dir;

    yforward = .4 * wind_speed * sin(90-windDir);
    xforward = .4 * wind_speed * cos(90-windDir);

    allepfeile=[];
    //hier füllst du dein array allepfeile mit den objekten, die haben dann alle eine eigene position
    //das ist der Vorteil. Denn die kannst du dann individuell verändern und abfragen
    //https://stackoverflow.com/questions/1290131/how-to-create-an-array-of-object-literals-in-a-loop
    for(let x = 0 ; x < width+abstandpfeile ; x+=abstandpfeile){

        for(let y = 0 ; y < height+abstandpfeile ; y+=abstandpfeile) {

            allepfeile.push({
                x: x,
                y: y
            });
        }
    }

}



function draw () {
  colorMode(RGB, 100, 170, 255);
  drawTempColor();
  textAlign(LEFT);

  textSize(20);
  text('Type any city:', 100, 80);

  textSize(35);
  text(town+", "+land, 100, 300);

  rectMode(CENTER);
  textSize(150);
  text(+wind_speed+" km/h", 100,400);
  text(+windDir+"° "+himmelsrichtung, 100,560);
  fill(190, 100, 190);

    drawWindDir();
    drawWindSpeed();
}


function drawTempColor(){
    let from = color(0, 0, 192);
    let to = color(214, 0, 0);

    let step = map(temp_c,-10,30,0,1);
    let daycolor=lerpColor(from, to, step);
    background(daycolor);
}



function drawWindDir(){
    push();
    //translate(width/2, height/2);

    rotate(windDir);
    pop();
}



function drawWindSpeed(){

    let minX=width ;
    let minY=height;
    let maxX=0;
    let maxY=0;

   for(let p=0;p<allepfeile.length;p++){
        let pfeil = allepfeile[p];
        pfeil.x=pfeil.x+xforward;
        pfeil.y=pfeil.y-yforward;



        push();
        translate(pfeil.x, pfeil.y);
        rotate(windDir);
        image(img, 0, 0, img.width/2, img.height/2);
        pop();

        /* hier merkst du dir die kleinste x position der pfeile und die grösste
        * das brauchst du später um die pfeile, die aus dem sichtbaren bereich verschwinden, schön
        * wieder in die reihe zu setzen */

        if(pfeil.x < minX){
            minX=pfeil.x;
        }
        if(pfeil.x > maxX){
           maxX=pfeil.x;
        }
       if(pfeil.y < minY){
           minY=pfeil.y;
       }
       if(pfeil.y > maxY){
           maxY=pfeil.y;
       }
    }



    /* hier gehst du nochmals durch alle pfeile durch
    * kontrollierst die positionen und setzt sie allenfalls neu falls sie ausserhalb
    *des sichtbaren bereichs sind */
    for(let p=0;p<allepfeile.length;p++){
        let pfeil = allepfeile[p];
        if(pfeil.x>windowWidth+1*abstandpfeile){
            pfeil.x=minX-abstandpfeile;
        }
        if(pfeil.x<abstandpfeile*-1){
            pfeil.x=maxX+abstandpfeile;
        }

        if(pfeil.y>height+1*abstandpfeile){
            pfeil.y=minY-abstandpfeile;
        }
        if(pfeil.y<abstandpfeile*-1){
            pfeil.y=maxY+abstandpfeile;
        }
    }

//tint(255, 50);
//image(img, 0, 0, img.width/2, img.height/2);
    //pop();
    //pop();

}
