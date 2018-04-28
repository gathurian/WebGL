function Cube(gl, X, Y, Z) {

    var color;

    function defineVertices(gl){
        var vertices = [
            // Top
            -1.0, +1.0, -1.0,
            -1.0, +1.0, +1.0,
            +1.0, +1.0, +1.0,
            +1.0, +1.0, -1.0,

            // Left
            -1.0, +1.0, +1.0,
            -1.0, -1.0, +1.0,
            -1.0, -1.0, -1.0,
            -1.0, +1.0, -1.0,

            // Right
            +1.0, +1.0, +1.0,
            +1.0, -1.0, +1.0,
            +1.0, -1.0, -1.0,
            +1.0, +1.0, -1.0,

            // Front
            +1.0, +1.0, +1.0,
            +1.0, -1.0, +1.0,
            -1.0, -1.0, +1.0,
            -1.0, +1.0, +1.0,

            // Back
            +1.0, +1.0, -1.0,
            +1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, +1.0, -1.0,

            // Bottom
            -1.0, -1.0, -1.0,
            -1.0, -1.0, +1.0,
            +1.0, -1.0, 1.0,
            +1.0, -1.0, -1.0,
        ];

        var color = [
            // Top
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            // Left
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            // Right
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            // Front
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,

            // Back
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,

            // Bottom
            1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
        ];

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        return [vertexBuffer, colorBuffer];
    }

    function defineEdges(gl) {

        var vertexIndices = [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl)[0],
        bufferColors: defineVertices(gl)[1],
        bufferEdges: defineEdges(gl),
        color: color,
        draw: function (gl, aVertexPositionId, aVertexColorId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

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

            i = i + 0.01;

            gl.bindTexture(gl.TEXTURE_2D, null); //gets rid of texture

            gl.drawElements(gl.TRIANGLES, 36 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}