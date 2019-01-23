let input, button;
let key='6c08c80972c6478e88d92033191101'; // signup https://www.apixu.com/signup.aspx
let wind_speed=0;
let wind_dir=0;
let img;

let xpos=3;
let ypos=100;

let xforward=0;
let yforward=0;

let allepfeile=[];//Array fuer alle pfeile

let abstandpfeile=100; //kannst du frei setzen

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    img = loadImage("assets/arrow.svg");  // Load the image

    let url = 'https://api.apixu.com/v1/current.json?key='+key+'&q=Zurich';
    //https://api.apixu.com/v1/forecast.json?key=6c08c80972c6478e88d92033191101&q=Zürich&days=1'
    input = createInput();//https://p5js.org/examples/dom-input-and-button.html
    input.position(20, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(reloadJson);


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
    wind_dir=weather.current.wind_degree;

    yforward = .3 * wind_speed * sin(90-wind_dir);
    xforward = .3 * wind_speed * cos(90-wind_dir);

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
    background(255);
    textSize(20);

    text("Windgeschwindigkeit "+wind_speed, 100,300);
    text("Windrichtung "+wind_dir, 100,350);

    drawWindDir();
    drawWindSpeed();
}




function drawWindDir(){
    push();
    //translate(width/2, height/2);

    rotate(wind_dir);
    pop();
}



function drawWindSpeed(){
   /* push();

    xpos=xpos+xforward;
    ypos=ypos-yforward;


    if(xpos>width){
        xpos=0;
    }
    if(xpos<0){
        xpos=width;
    }


    // analog noch height und y machen!
    if(ypos>height){
        ypos=0;
    }
    if(ypos<0){
        ypos=height;
    }


    translate(xpos, ypos);

    rotate(wind_dir);


    for (let x = -2000 ; x <= 2000 ; x=x+100)
    {
        for (let y = -2000 ; y <= 2000 ; y=y+100)
        {
            //tint(255, 80);
            image(img, x, y, img.width/2, img.height/2);
        }
    }*/

    /*hier gehst du jetzt neu durch dein Array allepfeile durch
    somit kannst du jeden pfeil individuell platzieren und die position abfragen
     */
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
        rotate(wind_dir);
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
        if(pfeil.x>windowWidth+2*abstandpfeile){
            pfeil.x=minX-abstandpfeile;
        }
        if(pfeil.x<abstandpfeile*-1){
            pfeil.x=maxX+abstandpfeile;
        }

        if(pfeil.y>height+2*abstandpfeile){
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
