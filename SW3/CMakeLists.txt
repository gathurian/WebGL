cmake_minimum_required(VERSION 3.8)
project(webgl_start)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        .idea/dbnavigator.xml
        .idea/jsLibraryMappings.xml
        .idea/misc.xml
        .idea/modules.xml
        .idea/webgl_start.iml
        .idea/workspace.xml
        Exercise1.html
        Exercise2.js
        FragmentShader.glsl
        gl-matrix.js
        lena512.png
        shaderUtils.js
        VertexShader.glsl
        webgl-debug.js)

add_executable(webgl_start ${SOURCE_FILES})