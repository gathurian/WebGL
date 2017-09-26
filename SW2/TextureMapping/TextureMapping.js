//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

var lennaTxt = {
    textureObj: {}
};

function startup() {
    console.log("Startup started")
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    loadTexture();
    draw();

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
function loadTexture(){
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

//create the texture coordinates for the object
var textureCoor = [
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0
];
rectangleObject1.tex
