function WireFrameCube(gl){
    function defineVertices(gl){
        var vertices = [
                //Pos X, Y, Z
                0, 0, 0,
                0, 0 ,1,    //bottom
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

        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        return vertexBuffer;
    }

    function defineEdges(gl){
        var vertexIndices = [   //Welche vertices sind mit welchen anderen vertices verbunden?
                0, 1, 2,
                0, 2, 3,        //bottom

                4, 5, 6,
                4, 6, 7,        //top

                8, 9, 10,
                8, 10, 11,      //front

                12, 13, 14,
                12, 14, 15,     //back

                16, 17, 18,
                16, 18, 19,     //left

                20, 21, 22,
                20, 22, 23      //right
            ];
        edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);

        return edgeBuffer;
    }

    function defineColors(gl){
        var verticesColor = [
            0, 0, 0,
            0, 0, 0,    //bottom    black
            0, 0, 0,
            0, 0, 0,

            1, 0, 0,
            1, 0, 0,    //top       red
            1, 0, 0,
            1, 0, 0,

            0, 1, 0,
            0, 1, 0,    //front     green
            0, 1, 0,
            0, 1, 0,

            1, 1, 1,
            1, 1, 1,    //back      white
            1, 1, 1,
            1, 1, 1,

            1, 0, 1,
            1, 0, 1,    //left      magenta
            1, 0, 1,
            1, 0, 1,

            0, 0, 1,
            0, 0, 1,    //right     blue
            0, 0, 1,
            0, 0, 1
            ];
            colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColor), gl.STATIC_DRAW);
        }

    return {
        bufferVertices : defineVertices (gl),
        bufferEdges : defineEdges (gl),
        color : defineColors (gl),
        draw: function(gl, aVertexPositionId, aVertexColorId){                console.log("Drawing");

                gl.frontFace (gl. CCW);
                gl.cullFace (gl. BACK );
                gl.enable (gl. CULL_FACE );
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.clearDepth(1.0);

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


                var modelview = mat4.create();
                mat4.lookAt(modelview, [1.5, 1.5, 1.5], [0.5, 0.5, 0.5], [0, 1, 0]); //von woher wird geschaut?
                //                     Kamera-Ort   Zentrum         Wo ist oben?


                var projectionview = mat4.create();
                mat4.ortho(projectionview, -2, 2, -2, 2, -2, 10);

                var view = mat4.create();
                mat4.fromYRotation(view, i);
                //console.log(i);


                gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelview);
                gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionview);
                gl.uniformMatrix4fv(ctx.uViewMatrixId, false, view);

                // add drawing routines here
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                gl.vertexAttribPointer(
                    ctx.aVertexPositionId,              //Welche ID soll verwendet werden
                    3,                                  //Wie viele Werte sollen ausgelesen werden (3, da "x", "y", "z")
                    gl.FLOAT,
                    false,
                    3 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (x, y, z = 3)
                    0                                   //Wie viele Werte sollen am Anfang jeweils übersprungen werden?
                );

                gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
                gl.vertexAttribPointer(
                    ctx.aColorId,
                    3,
                    gl.FLOAT,
                    false,
                    3 * Float32Array.BYTES_PER_ELEMENT,
                    0* Float32Array.BYTES_PER_ELEMENT
                );

                window.requestAnimationFrame(draw)
                i = i+0.01;

                gl.enableVertexAttribArray(ctx.aVertexPositionId);
                gl.enableVertexAttribArray(ctx.aColorId);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
                gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

        }
    }
}