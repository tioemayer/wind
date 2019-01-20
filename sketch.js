let input, button;
let key='6c08c80972c6478e88d92033191101'; // signup https://www.apixu.com/signup.aspx
let wind_speed;
let wind_dir;
let img;

// let xpos=3;
// let ypos=1;
// let xforward=3;
// let yforward=3;


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

  console.log();
}



  function draw () {
      background(255);
      textSize(20);

    //	var d = map(sec, 59, 0, 0, width);


      // Displays the image at its actual size at point (0,0)
      //image(img, 0, 0);
      // Displays the image at point (0, height/2) at half size
      //image(img, 0, height/2, img.width/2, img.height/2);


      text("Windgeschwindigkeit "+wind_speed, 100,300);
      text("Windrichtung "+wind_dir, 100,350);
      // Führ den Loop solange aus, solange x kleiner als die Breite
      // des Ausgabe-Fenster ist

      drawWindDir();
      // drawCircle();
      // drawWindSpeed();
  }




  function drawWindDir(){
    translate(width/2, height/2);


if ((wind_dir>0) && (wind_dir<90)) {
  rotate(45);
}


if ((wind_dir>90) && (wind_dir<180)) {
  rotate(135);
}


if ((wind_dir>180) && (wind_dir<270)) {
  rotate(225);
}

if ((wind_dir>270) && (wind_dir<360)) {
  rotate(315);
}

    image(img, 0, 0, img.width/2, img.height/2);
  }



  // function drawWindSpeed(){
  //   translate(width/2, height/2);
  //
  //   xpos+=xforward;
  //   ypos+=yforward;
  //
  //   if (wind_speed == 6){
  //       rotate(45);
  //   }
  //
  //
  //
  //   image(img, 0, 0, img.width/2, img.height/2);
  //
  // }
  //
  //
  // function drawCircle() {
  //   image(img,xpos, ypos, img.width/2, img.height/2);
  //
  //   xpos+=xforward;
  //   ypos+=yforward;
  //
  //   if(xpos > width){
  //     xpos=0;
  //   }
  //   if(ypos > height){
  //         ypos=0;
  //   }
  //
  // }
