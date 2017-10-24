attribute vec3 aVertexPosition;

attribute vec4 aVertexColor;
varying vec4 vColor;
uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;


void main() {
    // to complete
    vColor = aVertexColor;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4 ( aVertexPosition, 1.0) ;

}