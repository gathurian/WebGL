precision mediump float;

uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

varying vec3 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

const float ambientFactor = 0.2;
const float shininess = 10.0;
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);

/*void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord) + vec4(vColor, 1.0);
}*/


void main(){
    vec3 baseColor = vColor;
    if(uEnableTexture){
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if(uEnableLighting){
        //ambient Lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        //calculate light direction as seen from the vertex position
        vec3 lightDirectionEye = vec3(1.0, 1.0, 1.0); //todo
        vec3 normal = normalize(vNormalEye);

        //diffuse lighting
        float diffuseFactor = 0.0; //todo
        vec3 diffuseColor = vec3(0.5, 0.5, 0.5) ; //todo;


        //specular lighting
        vec3 specularColor = vec3(0,0,0);

/*        if(diffuseFactor > 0.0){
                     vec3 reflectionDir = (1, 1, 1); //todo
                     vec3 eyeDir = (1, 1, 1); //todo
                     float cosPhih = 0.0; //todo
                     float specularFactor = 0.4; //todo
                     specularColor = (0, 0, 0); //todo
        }*/

        vec3 color = ambientColor + diffuseColor + specularColor;
        gl_FragColor = vec4(color, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
