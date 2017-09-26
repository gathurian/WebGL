precision mediump float;
varying vec4 vColor;
varying vec2 vTextureCoord;

uniform sampler2D usampler;

void main() {
    // to complete
    gl_FragColor = texture2D(usampler, vTextureCoord);
}