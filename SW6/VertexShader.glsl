attribute vec3 aVertexPosition;
attribute vec2 a_texcoord;
attribute vec3 aVertexColor;

varying vec3 vColor;
varying vec2 v_texcoord;

uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;


void main() {
    // to complete
    vColor = aVertexColor;
    v_texcoord = a_texcoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4 ( aVertexPosition, 1) ;

}