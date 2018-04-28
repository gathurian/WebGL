attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

varying vec3 vColor;
uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix;


void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0) ;
    vTextureCoord = aTextureCoord;
    vColor = aVertexColor;
}