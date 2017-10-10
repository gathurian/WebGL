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
    uSampler: -1,
    aVertexCoordId: -1,
    uModelViewMatrixId: -1
};

var rectangleObject = {
    buffer: -1
};

var lennaTxt = {
    textureObj: {},
    buffer: -1
}

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    loadTexture();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();
    gl.clearColor(0,1,0,0.1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    ctx.aVertexPostitionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uSampler = gl.getUniformLocation(ctx.shaderProgram, "uSampler");
    ctx.aVertexCoordId = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");
    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    var vertices = [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5];

    var textureCoord = [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0];

    rectangleObject.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    lennaTxt.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lennaTxt.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);

}

function initMatrix(value) {
    var modelViewMatrix = mat4.create();
    mat4.fromRotation(modelViewMatrix, value, [value, value, value]);

    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMatrix);
}

function initTexture(image, textureObject) {
    gl.bindTexture(gl.TEXTURE_2D, textureObject);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function loadTexture () {
    var image = new Image ();
    lennaTxt.textureObj = gl.createTexture();
    image.onload = function() {
        initTexture(image, lennaTxt.textureObj);
        draw ();
    };
    image.src = "lena512.png";
}

/**
 * Draw the scene.
 */
function draw() {
    console.log("Drawing");

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer(ctx.aVertexPostitionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPostitionId);

    gl.bindBuffer(gl.ARRAY_BUFFER, lennaTxt.buffer);
    gl.vertexAttribPointer(ctx.aVertexCoordId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexCoordId);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
    gl.uniform1i(ctx.uSampler, 0);

    i = (Math.sin(i) + 1) * (0.1);

    initMatrix(i);

    window.requestAnimationFrame(draw);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}