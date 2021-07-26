#version 300 es
precision highp float;
in vec2 out_textureCoords;
out vec4 FragColor;
uniform sampler2D imageId;
uniform float darkness;

void main()
{
	vec4 col = texture(imageId, out_textureCoords);
    if(col.a == 0.0)discard;

    FragColor = col - vec4(darkness, darkness, darkness, 1.0);

} 