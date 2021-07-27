#version 300 es
layout (location = 0) in vec2 aPos;
out vec2 pos;
uniform mat4 camProjectionMatrix;
uniform mat4 transformationMatrix;
uniform mat4 viewMatrix;

void main()
{
    gl_Position +=  camProjectionMatrix * viewMatrix * transformationMatrix * vec4(aPos.x, aPos.y, 0.0, 1.0);
    pos = aPos;
}