precision mediump float;

uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;
varying vec3 vLighting;


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
    vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}

/*
void main(){
    vec3 baseColor = vColor;
    if(uEnableTexture){
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if(uEnableLighting){
        //ambient Lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        //calculate light direction as seen from the vertex position
        vec3 lightDirectionEye = ; //todo
        vec3 normal = normalize(vNormalEye);

        //diffuse lighting
        float diffuseFactor = ; //todo
        vec3 diffuseColor = ; //todo;


        //specular lighting
        vec3 specularColor = vec3(0,0,0);

            if(diffuseFactor > 0.0){
                         vec3 reflectionDir = ; //todo
                         vec3 eyeDir = ; //todo
                         float cosPhih = ; //todo
                         float specularFactor = ; //todo
                         specularColor = ; //todo
            }

        vec3 color = ambientColor + diffuseColor + specularColor;
        gl_FragColor = vec4(color, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}*/
