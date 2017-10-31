attribute vec3 aVertexPosition;
attribute vec2 a_texcoord;
attribute vec4 aVertexColor;

varying vec4 vColor;
varying vec2 v_texcoord;

uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;
uniform mat4 uViewMatrix;


void main() {
    // to complete
    vColor = aVertexColor;
    v_texcoord = a_texcoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * uViewMatrix * vec4 ( aVertexPosition, 1.0) ;

}