function texturedCube(gl, X, Y, Z){

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

    function defineVertices(gl  ){
        var vertices = [
                //Pos X, Y, Z
                X, Y, Z,
                X, Y, Z+1,
                X+1, Y, Z+1,    //bottom
                X+1, Y, Z,

                X, Y+1, Z,
                X, Y+1, Z+1,
                X+1, Y+1, Z+1,  //top
                X+1, Y+1, Z,

                X, Y, Z+1,
                X+1, Y, Z+1,
                X+1, Y+1, Z+1,  //front
                X, Y+1, Z+1,

                X, Y, Z,
                X+1, Y, Z,
                X+1, Y+1, Z,    //back
                X, Y+1, Z,

                X, Y, Z,
                X, Y, Z+1,
                X, Y+1, Z+1,    //left
                X, Y+1, Z,

                X+1, Y, Z+1,
                X+1, Y, Z,
                X+1, Y+1, Z,    //right
                X+1, Y+1, Z+1
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

    function defineTexture(gl){
        loadTexture();

        var textureCoordinates = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,   //Front
            0.0, 1.0,

            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,   //Back
            0.0, 0.0,

            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,   //Top
            1.0, 1.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,   //Bottom
            1.0, 0.0,

            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,   //Right
            0.0, 0.0,

            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,   //Left
            0.0, 1.0
        ];

        textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    }

    return{
        bufferVertices : defineVertices(gl),
        bufferEdges : defineEdges(gl),
        bufferTexture : defineTexture(gl),
        draw: function(gl, aVertexPositionId, aVertexColorId, aTextureId){
             // add drawing routines here
            gl.bindBuffer(gl.ARRAY_BUFFER,this.bufferVertices);
            gl.vertexAttribPointer(
                aVertexPositionId,              //Welche ID soll verwendet werden
                3,                                  //Wie viele Werte sollen ausgelesen werden (3, da "x", "y", "z")
                gl.FLOAT,
                false,
                3 * Float32Array.BYTES_PER_ELEMENT, //Nach wie vielen Werten kommt der nächste zu nehmende Wert? (x, y, z = 3)
                0                                   //Wie viele Werte sollen am Anfang jeweils übersprungen werden?
            );
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTexture);
            gl.vertexAttribPointer(
                aTextureId,
                2,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray(aTextureId);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
            gl.uniform1i(ctx.shaderProgram.u_texture, 0);
            gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        }
    }
}