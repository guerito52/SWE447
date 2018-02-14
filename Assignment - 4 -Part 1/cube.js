
var cube = undefined;
var gl = undefined;
var angle = 0;

function init() {
  var canvas = document.getElementById( "webgl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );

  if ( !gl ) {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.0, 0.8, 0.3, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Cube();
  
  document.getElementById("xButton").onclick = function(){
	  console.log("Get the HELL out now!");
  }
  document.getElementById("slider").onchange = function(){
	  console.log("That's not nice");
	  //speed = 100 - event.srcElement.value;
  }

  render();
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 1.0; // degrees

  cube.MV = rotate( angle, [-1.4, 0.8, 0] );

  cube.render();

  requestAnimationFrame( render ); // schedule another call to render()
}

window.onload = init;