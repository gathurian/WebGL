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

var vertexBuffer = {
    buffer: -1
};

var edgeBuffer = {
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
    gl.clearColor(1,0,0,0.5);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");

}

/**
 * Setup the buffers to use. If morre objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";


    var vertices = [
        //Pos X, Y, Z
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 1, 0,

        0, 0, 1,
        1, 0, 1,
        1, 1, 1,
        0, 1, 1,
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexIndices = [
    0, 1,
    0, 3,
    0, 4,
    1, 2,
    1, 5,
    2, 3,
    2, 6,
    3, 7,
    4, 5,
    4, 7,
    5, 6,
    6, 7,
    ];
    edgeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);



}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    var modelview = mat4.create();
    mat4.lookAt(modelview, [-1, 0, 0], [0.5, 0.5, 0.5], [0, 0, 1]); //von woher wird geschaut?
    //                     Kamera-Ort   Zentrum         Wo ist oben?

    var projectionview = mat4.create();
    mat4.ortho(projectionview, -2, 2, -2, 2, -2, 10);

    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelview);
    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionview);

    // add drawing routines here
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(
        ctx.aVertexPositionId,              //Welche ID soll verwendet werden
        3,                                  //Wie viele Werte sollen ausgelesen werden (2, da "x" und "y")
        gl.FLOAT,
        false,
        0 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (2* Position + 3* RGB-Wert = 5)
        0                                   //Wie viele Werte sollen am Anfang jeweils übersprungen werden?
    );

    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);

}
