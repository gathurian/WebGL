//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    aColorId: -1
};

var rectangleObject1 = {
    buffer: -1
};

var TLR = (document.getElementById("TLR"))/255;

var TLG = (document.getElementById("TLG"))/255;

var TLB = (document.getElementById("TLB"))/255;

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    console.log("Startup started")
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();
    gl.clearColor(0.75,0.75,0.75,1);
    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If morre objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";
    rectangleObject1.buffer = gl.createBuffer();

    if(TLG === 0.0 || TLG == null){
        TLG = 1.0
    }

    var verticesRectangle1 = [
        //Pos X, Y      Farbe R, G, B
        0.5,-0.5,       1.0, 0.0, 1.0,
        -0.5,-0.5,      1.0, 1.0, 1.0,
        -0.5,0.5,       0.0, 1.0, 0.0,
        0.5,0.5,        0.0, 0.0, 0.0
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject1.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesRectangle1), gl.STATIC_DRAW);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);
    // add drawing routines here
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject1.buffer);
    gl.vertexAttribPointer(
        ctx.aVertexPositionId,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        ctx.aColorId,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2* Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aColorId);

    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    console.log(TLR + ", "  + TLG + ", " + TLB)
    return false;
}
