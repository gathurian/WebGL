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

    var verticesRectangle1 = [
        //Pos X, Y      Farbe R, G, B
        0.5,-0.5,       1.0, 0.5, 1.0,
        -0.5,-0.5,      0.73, 0.22, 0.0,
        -0.5,0.5,       1.0, 0.0, 0.538,
        0.5,0.5,         0.77, 1.0, 0.11
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
        ctx.aVertexPositionId,              //Welche ID soll verwendet werden
        2,                                  //Wie viele Werte sollen ausgelesen werden (2, da "x" und "y")
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (2* Position + 3* RGB-Wert = 5)
        0                                   //Wie viele Werte sollen am Anfang jeweils übersprungen werden?
    );

    gl.vertexAttribPointer(
        ctx.aColorId,                       //Welche ID soll verwendet werden
        3,                                  //Wie viele Werte sollen ausgelesen werden (3, da R G B)
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (2* Position + 3* RGB-Wert = 5)
        2* Float32Array.BYTES_PER_ELEMENT   //Wie viele Werte sollen am Anfang jeweils übersprungen werden (2, da immer zuerst "x" und "y" kommen)
    );

    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aColorId);

    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    return false;
}
