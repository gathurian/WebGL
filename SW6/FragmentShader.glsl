precision mediump float;
varying vec4 vColor;
varying vec2 v_texcoord;

uniform sampler2D u_texture;

void main() {
    // to complete
    gl_FragColor = texture2D(u_texture, v_texcoord);
}