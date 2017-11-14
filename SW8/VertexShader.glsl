attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;
attribute vec3 aVertexColor;
attribute vec3 aVertexNormal;

varying vec3 vColor;
varying vec2 vTextureCoord;
varying vec3 vNormalEye;
varying vec3 vLighting;
varying vec3 vVertexPositionEye3;

uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;
uniform mat4 uNormalMatrix;


/*void main() {
    vColor = aVertexColor;
    vTextureCoord = aVertexTextureCoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4 ( aVertexPosition, 1) ;

}*/

void main(){
    //calculate the vertex position in eye coordinates
    vec4 vVertexPositionEye4 = uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vVertexPositionEye3 = vVertexPositionEye4.xyz / vVertexPositionEye4.w;

    //calculate the normal vector in eye coordinates
    //vNormalEye = normalize(uNormalMatrix * aVertexNormal);

    //set texture coordinates for fragment shader
    vTextureCoord = aVertexTextureCoord;

    //set color for fragment shader
    vColor = aVertexColor;

   //calculate the projeted position
   gl_Position = uProjectionMatrix * vVertexPositionEye4;

   //lighting
   vec3 ambientLight = vec3(0.6, 0.6, 0.6);
   vec3 directionalLightColor = vec3(0.5, 0.5, 0.5);
   vec3 diretionalVector = vec3 (0.85, 0.8, 0.75);

   vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
   float directional = max(dot(transformedNormal.xyz, diretionalVector), 0.0);
   vLighting = ambientLight + (directionalLightColor * directional);
}

