attribute vec2 aVertexPosition;

attribute vec4 aVertexColor;
varying vec4 vColor;


void main() {
    // to complete
    vColor = aVertexColor;
    gl_Position = vec4(aVertexPosition,0,1);
}