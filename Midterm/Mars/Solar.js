var canvas;
var gl;
 

var Planets = {
	//Sun : undefined,
	//Mercury : undefined,
	//Venus : undefined,
	//Earth : undefined,
	//Moon : undefined,
	Mars : undefined,
	//Jupiter : undefined,
	//Saturn : undefined,
	//Uranus : undefined,
	//Neptune : undefined,
	//Pluto : undefined
};

var V;  

var P;  
var near = 10;      
var far = 160;     

var time = 0.0;      
                     
var timeDelta = 0.5; 

var orbitScalar = 50.0;

var orbitShift = 6000;	

var sunPos = new Float32Array([0.0, 0.0, 0.0]);
var ambient = new Float32Array([0.3, 0.3, 0.3]);

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
	canvas = document.getElementById("webgl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL initialization failed"); }

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);


	for (var name in Planets ) {

		
		var planet = Planets[name] = new Sphere();


		planet.uniforms = { 
			color : gl.getUniformLocation(planet.program, "color"),
			MV : gl.getUniformLocation(planet.program, "MV"),
			P : gl.getUniformLocation(planet.program, "P"),
			
		};
	}

	resize();

	window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {		
	
	time = performance.now() * 0.001 + orbitShift;

	var ms = new MatrixStack();

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	
	
	V = translate(0.0, 0.0, 0.0);
	ms.load(V);
	
	

	var name, planet, data;

	

	name = "Mars";
  planet = Planets[name];
  data = SolarSystem[name];
  
  

  planet.PointMode = false;

 
  ms.push();

  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
	
	
		
	window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function renderPlanet(planetName, ms){
	var name = planetName;
	var planet = Planets[name];
	var data = SolarSystem[name];
	
	planet.PointMode = false;
	
	ms.push();
	ms.rotate(time * orbitScalar / data.year, [0.0, 1.0, 0.0]);
	ms.translate(data.distance, 0, 0);
	ms.scale(data.radius);
	gl.useProgram(planet.program);
	gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
	gl.uniform4fv(planet.uniforms.color, flatten(data.color));
	planet.render();
	ms.pop();
}

function resize() {
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;

	gl.viewport(0, 0, w, h);

	var fovy = 60; // degrees
	var aspect = w / h;

	P = perspective(fovy, aspect, near, far);
	
	
	P = mult(P, lookAt([0.0, 0.3*(near + far), 0.3*(near + far)], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]));
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;