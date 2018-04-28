function WireFrameCube(gl, X, Y, Z) {

    function defineVertices(gl){
        var vertices = [
            -1.0, -1.0, -1.0,
            +1.0, -1.0, -1.0,
            +1.0, +1.0, -1.0,
            -1.0, +1.0, -1.0,

            -1.0, -1.0, +1.0,
            +1.0, -1.0, +1.0,
            +1.0, +1.0, +1.0,
            -1.0, +1.0, +1.0,
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer
    }

    function defineEdges(gl) {
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
            6, 7
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        draw: function (gl, aVertexPositionId, aVertexColorId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);
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

            gl.drawElements(gl.LINES, 24 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}