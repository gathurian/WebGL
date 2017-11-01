function texturedCube(gl, X, Y, Z) {

    var lennaTxt = {
        textureObj: {}
    };

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
        };
        image.src = "lena512.png";
    }

    function defineVertices(gl) {
        loadTexture();

        var vertices = [
            0, 0, 0,
            0, 0, 1,    //bottom
            1, 0, 1,
            1, 0, 0,

            0, 1, 0,
            0, 1, 1,    //top
            1, 1, 1,
            1, 1, 0,

            0, 0, 1,
            1, 0, 1,    //front
            1, 1, 1,
            0, 1, 1,

            0, 0, 0,
            1, 0, 0,    //back
            1, 1, 0,
            0, 1, 0,

            0, 0, 0,
            0, 0, 1,    //left
            0, 1, 1,
            0, 1, 0,

            1, 0, 1,
            1, 0, 0,    //right
            1, 1, 0,
            1, 1, 1
        ];

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return vertexBuffer;
    }

    function defineColors(gl) {
        var color = [
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0
        ]; //every color = 0 0 0, will override other colors in shader
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
        return colorBuffer;
    }

    function defineTexture(gl) {
        var textureCoordinates = [
            // Front face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,       //Front
            0.0, 1.0,

            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,       //Back
            0.0, 0.0,

            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,       //Top
            1.0, 1.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,       //Bottom
            1.0, 0.0,

            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,       //Right
            0.0, 0.0,

            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,       //Left
            0.0, 1.0
        ];
        var textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        return textureBuffer;
    }

    function defineEdges(gl) {
        var vertexIndices = [
            0, 1, 2,
            0, 2, 3,        //Top

            4, 5, 6,
            4, 6, 7,        //Left

            8, 9, 10,
            8, 10, 11,      //Right

            12, 13, 14,
            12, 14, 15,     //Front

            16, 17, 18,
            16, 18, 19,     //Back

            20, 21, 22,
            20, 22, 23      //Bottom
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferColors: defineColors(gl),
        bufferTexture: defineTexture(gl),
        bufferEdges: defineEdges(gl),
        draw: function (gl, aVertexPositionId, aVertexColorId, aTextureCoord) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(
                aVertexPositionId,
                3,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(
                aVertexColorId,
                3,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray(aVertexColorId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTexture);
            gl.vertexAttribPointer(
                aTextureCoord,
                2,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray(aTextureCoord);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            matrixStuff(X, Y, Z);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
            gl.uniform1i(ctx.shaderProgram.uSampler2DId, 0);

            gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        }
    }
}