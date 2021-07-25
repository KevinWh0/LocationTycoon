#version 300 es
precision highp float;
in vec2 out_textureCoords;
out vec4 FragColor;
uniform sampler2D imageId;
uniform float darkness;

void main()
{
    //FragColor = vec4(0.27, 1, 0.2, 1);
    FragColor = texture(imageId, out_textureCoords) - vec4(darkness, darkness, darkness, 1.0);

} 