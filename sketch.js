let input, button;
let key='6c08c80972c6478e88d92033191101'; // signup https://www.apixu.com/signup.aspx
let wind_speed;
let wind_dir;
let img;

let xpos=3;
let ypos=100;

let xforward=0;
let yforward=0;

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
       push();

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
       }

//tint(255, 50);
//image(img, 0, 0, img.width/2, img.height/2);
    //pop();
     pop();

   }
