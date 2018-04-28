attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;
attribute vec3 aVertexColor;
attribute vec3 aVertexNormal;

varying vec3 vColor;
varying vec2 vTextureCoord;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

uniform mat4 uModelViewMatrix ;
uniform mat4 uProjectionMatrix ;
uniform mat3 uNormalMatrix;


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
    vNormalEye = normalize(uNormalMatrix * aVertexNormal);

    //set texture coordinates for fragment shader
    vTextureCoord = aVertexTextureCoord;

    //set color for fragment shader
    vColor = aVertexColor;

   //calculate the projeted position
   gl_Position = uProjectionMatrix * vVertexPositionEye4;
}

