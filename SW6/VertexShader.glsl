attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;
attribute vec3 aVertexColor;

varying vec3 vColor;
varying vec2 vTextureCoord;

uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;


void main() {
    vColor = aVertexColor;
    vTextureCoord = aVertexTextureCoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4 ( aVertexPosition, 1) ;

}