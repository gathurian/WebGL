function CubeTextured(gl, X, Y, Z) {

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

    function defineVertices(gl){
        loadTexture();

        var vertices = [
            // Front
            -1.0, -1.0, +1.0,
            +1.0, -1.0, +1.0,
            +1.0, +1.0, +1.0,
            -1.0, +1.0, +1.0,

            // Back
            -1.0, -1.0, -1.0,
            -1.0, +1.0, -1.0,
            +1.0, +1.0, -1.0,
            +1.0, -1.0, -1.0,

            // Top
            -1.0, +1.0, -1.0,
            -1.0, +1.0, +1.0,
            +1.0, +1.0, +1.0,
            +1.0, +1.0, -1.0,

            // Bottom
            -1.0, -1.0, -1.0,
            +1.0, -1.0, -1.0,
            +1.0, -1.0, +1.0,
            -1.0, -1.0, +1.0,

            // Right
            +1.0, -1.0, -1.0,
            +1.0, +1.0, -1.0,
            +1.0, +1.0, +1.0,
            +1.0, -1.0, +1.0,

            // Left
            -1.0, -1.0, -1.0,
            -1.0, -1.0, +1.0,
            -1.0, +1.0, +1.0,
            -1.0, +1.0, -1.0
        ];

        var color = [
            // Top
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            // Left
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            // Right
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            // Front
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            // Back
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            // Bottom
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0
        ]; //every color = 0 0 0, will override other colors in shader

        var textureCoordinates = [
            // Front face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // Back face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Top face
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

            // Bottom face
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            // Right face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Left face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        return [vertexBuffer, colorBuffer, textureBuffer];
    }

    function defineEdges(gl) {
        var vertexIndices = [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            4, 5, 6,
            4, 6, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            12, 13, 14,
            12, 14, 15,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            20, 21, 22,
            20, 22, 23
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl)[0],
        bufferColors: defineVertices(gl)[1],
        bufferTexture: defineVertices(gl)[2],
        bufferEdges: defineEdges(gl),
        draw: function (gl, aVertexPositionId, aVertexColorId, aTextureCoord) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTexture);
            gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aTextureCoord);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            var view = mat4.create();
            var matrix = mat4.create();
            var cameraPos = [0, 0, -2];
            var center = [0, 0, 0];
            var up = [0, 1, 0];

            mat4.lookAt(view, cameraPos, center, up);

            var projectionMatrix = mat4.create();

            mat4.ortho(projectionMatrix, -2, 2, -2, 2, -10, 10);

            mat4.translate(matrix, matrix, [X, Y, Z]);
            mat4.rotate(matrix, matrix, i, [1, 1, 1]);
            mat4.scale(matrix, matrix, [0.5, 0.5, 0.5]);

            gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMatrix);
            gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, matrix);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
            gl.uniform1i(ctx.shaderProgram.uSampler2DId, 0);

            i = i + 0.01;

            gl.drawElements(gl.TRIANGLES, 36 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}