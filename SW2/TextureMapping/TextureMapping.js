///
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
    gl.clearColor(0.75, 0.75, 0.75, 1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If morre objects are needed this should be split in a file per object.
 */
function setUpBuffers() {
    "use strict";
//create the texture coordinates for the object
    var textureCoor = [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    rectangleObject1.textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject1.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoor), gl.STATIC_DRAW);
}


/**Initialize a texture from an image
 *@param image the loaded image
 *@param textureObject WebGL Texture Object
 */
function initTexture(image, textureObject) {
    //create a new texture
    gl.bindTexture(gl.TEXTURE_2D, textureObject);

    //set parameters for the texture
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
    );
    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );
    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_NEAREST
    );

    //turn texture off again
    gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
 *Load an image as a texture.
 */
function loadTexture() {
    var image = new Image();
    //create a texture object
    lennaTxt.textureObj = gl.createTexture();
    image.onload = function () {
        initTexture(image, lennaTxt.textureObj);
        //assure that there is a redraw after the texture-loading
        draw();
    };
    image.src = "lenna512.png";
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject1.buffer);
    gl.vertexAttribPointer(
        ctx.aVertexPositionId,              //Welche ID soll verwendet werden
        2,                                  //Wie viele Werte sollen ausgelesen werden (2, da "x" und "y")
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (2* Position + 3* RGB-Wert = 5)
        0                                   //Wie viele Werte sollen am Anfang jeweils übersprungen werden?
    );

    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
    gl.uniform1i(shaderProgram.uSampler2DId, 0);

    return false;
}


