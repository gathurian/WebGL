precision mediump float;
varying vec3 vColor;
varying vec2 v_texcoord;

uniform sampler2D u_texture;

void main() {
    // to complete
    //gl_FragColor = vColor;
    gl_FragColor = texture2D(u_texture, v_texcoord) + vec4(vColor, 1.0);
}