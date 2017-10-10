attribute vec2 aVertexPosition;
attribute vec2 aVertexTextureCoord;
varying vec2 vTextureCoord;
uniform mat4 uModelViewMatrix ;

void main() {
    gl_Position = uModelViewMatrix * vec4 ( aVertexPosition , 0.0 , 1.0) ;
    vTextureCoord = aVertexTextureCoord;
}
