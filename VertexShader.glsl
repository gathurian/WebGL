attribute vec2 aVertexPosition;
attribute vec3 aVertexColor;

varying vec3 aFragmentColor;

void main() {
    // to complete
    aFragmentColor = aVertexColor;
    gl_Position = vec4(aVertexPosition,0,1);
}