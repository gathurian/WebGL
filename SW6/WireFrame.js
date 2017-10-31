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

var colorBuffer = {
    buffer: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    console.log("Startup started")
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();
    gl.clearColor(1,0,0,0.5);

}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uViewMatrix");

}

/**
 * Setup the buffers to use. If morre objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
   wiredCube = new WireFrameCube(gl);
}

var i = 0;

/**
 * Draw the scene.
 */
function draw() {
    wiredCube.draw(gl, ctx.aVertexPositionId, ctx.aVertexPositionId);
}
