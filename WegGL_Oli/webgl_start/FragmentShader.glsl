precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

varying vec3 vColor;

void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord) + vec4(vColor, 1.0);
}
