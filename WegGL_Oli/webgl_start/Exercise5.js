//
// Computer Graphics
//
// WebGL Exercises
//
// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

var i = 0;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPostitionId: -1,
    aVertexColorId: -1,
    uSampler: -1,
    aVertexCoordId: -1,
    uModelViewMatrixId: -1,
    uProjectionMatrixId: -1,
    textureCube : -1,
    cube : -1,
    aTextureCoord: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
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
    gl.clearColor(0, 0, 1, 0.2);

    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.enable(gl.CULL_FACE);

    ctx.textureCube = new CubeTextured(gl, 1, 0, 0);
    ctx.cube = new Cube(gl, -1, 0, 0);


}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    ctx.aVertexPostitionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.uSampler = gl.getUniformLocation(ctx.shaderProgram, "uSampler");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.aTextureCoord = gl.getAttribLocation(ctx.shaderProgram, "aTextureCoord");
}

/**
 * Draw the scene.
 */
function draw() {
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    ctx.textureCube.draw(gl, ctx.aVertexPostitionId, ctx.aVertexColorId, ctx.aTextureCoord);
    ctx.cube.draw(gl, ctx.aVertexPostitionId, ctx.aVertexColorId);

    window.requestAnimationFrame(draw);

}

