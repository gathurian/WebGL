attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

attribute vec4 aVertexColor;
varying vec4 vColor;
varying vec2 vTextureCoord;


void main() {
    vColor = aVertexColor;
    gl_Position = vec4(aVertexPosition,0,1);
    vTextureCoord = aTextureCoord;
}