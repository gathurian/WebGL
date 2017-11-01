precision mediump float;
varying vec3 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
    // to complete
    //gl_FragColor = vColor;
    gl_FragColor = texture2D(uSampler, vTextureCoord) + vec4(vColor, 1.0);
}