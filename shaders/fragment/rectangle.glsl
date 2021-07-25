#version 300 es
precision highp float;
out vec4 FragColor;
uniform vec3 color;
//in vec2 pos;

void main()
{
    /*if(mod(pos.x * pos.y * 1.0, 2.0) > 0.1){
        discard;
    }*/
    //FragColor = vec4(0.2, 0.48, 1, 1);
    FragColor = vec4(color.r, color.g, color.b, 1);

} 