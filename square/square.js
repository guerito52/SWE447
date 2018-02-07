var square = null;
var gl = null;
var angle = 0;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	

    	if ( !gl ) {
        	alert("Unable to setup WebGL");
        	return;
    	}

    	gl.clearColor(  0.8, 0.8, 0.8, 1.0 );
	gl.enable( gl.DEPTH_TEST );
	
   	square = new Square(gl);
	
   	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
    	angle += 2.0;
	square.MV = rotate ( angle, [1,1,0]);
	square.render();
	
	requestAnimationFrame( render );
	
}

window.onload = init;
