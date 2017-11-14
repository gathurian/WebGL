function wireCube(gl, X, Y, Z) {

    function defineVertices(gl) {
        var vertices = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,        //Bottom
            0, 1, 0,

            0, 0, 1,
            1, 0, 1,
            1, 1, 1,        //Top
            0, 1, 1
        ];
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        return vertexBuffer;
    }

    function defineEdges(gl) {
        var edges = [
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
        edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW);
        return edgeBuffer;
    }

    return {
        bufferVertices : defineVertices(gl),
        bufferEdges : defineEdges(gl),
        draw : function (gl, aVertexPositionId) {
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

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            matrixStuff(X, Y, Z);

            gl.bindTexture(gl.TEXTURE_2D, null);

            gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);

        }
    }

}