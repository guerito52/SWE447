function Square(gl, vertexShaderId, fragmentShaderId) {
	var vertShdr = vertexShaderId || "Square-vertex-shader";
	var fragShdr = fragmentShaderId || "Square-fragment-shader";

	this.program = initShaders(gl, vertShdr, fragShdr);

	if ( this.program < 0 ) {
    		alert( "Error: Square shader pipeline failed to compile.\n\n" + "\tvertex shader id:  \t" + vertShdr + "\n" + "\tfragment shader id:\t" + fragShdr + "\n" );
		return; 
	}

	this.positions = {
		values : new Float32Array([
		    	// Front face
		    0.0, 0.0, // Vertex 0
		    1.0, 0.0, // Vertex 1
		    1.0, 1.0, // Vertex 2
		    0.0, 1.0  // Vertex 3
			
		]),
		numComponents : 2 // 3 components for each
		// position (2D coords)
	};
	this.colors = {
		values : new Float32Array([
		    	1.0, 0.0, 0.0, 
		    	1.0, 0.0, 0.0,
		    	1.0, 0.0, 0.0,
		    	1.0, 0.0, 0.0
		]),
		numComponents : 3 
	};
    	this.indices = {
    		values : new Uint16Array([ 
			0, 1, 2,
			2, 1, 3,
			2, 3, 4,
			4, 3, 5,
			4, 5, 6,
			5, 7, 6,
			7, 0, 6,
			7, 1, 0,
			3, 1, 7,
			5, 3, 7,
			6, 0, 2,
			6, 2, 4 
		])
    	};
	this.indices.count = this.indices.values.length;
	
	// positions
	
	this.positions.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    	this.indices.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    	gl.enableVertexAttribArray( this.positions.attributeLoc );

    	MVLoc = gl.getUniformLocation( this.program, "MV" );

    	this.MV = undefined;

    	this.render = function () {
        	gl.useProgram( this.program );

        	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
 
        	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        	gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        	// Draw the cube's base
        	gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    	}
};

