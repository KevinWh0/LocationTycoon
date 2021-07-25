#version 300 es
layout (location = 0) in vec2 aPos;
layout (location = 1) in vec2 textureCoords;
out vec2 pos;
uniform mat4 camProjectionMatrix;
uniform mat4 transformationMatrix;
out vec2 out_textureCoords;
void main()
{
    gl_Position =   camProjectionMatrix * transformationMatrix * vec4(aPos.x, aPos.y, 0.0, 1.0);
    pos = aPos;
    out_textureCoords = textureCoords;
}