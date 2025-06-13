shader_type canvas_item;

uniform float blur_size = 4.0;
uniform float darkness = 0.2;
uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;

void fragment() {
    vec2 texel_size = vec2(1.0 / 1920.0, 1.0 / 1080.0) * blur_size;
    vec4 color = vec4(0.0);

    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2(-1.0, -1.0)) * 0.0625;
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2( 0.0, -1.0)) * 0.125;
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2( 1.0, -1.0)) * 0.0625;
    
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2(-1.0,  0.0)) * 0.125;
    color += texture(SCREEN_TEXTURE, SCREEN_UV) * 0.25;
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2( 1.0,  0.0)) * 0.125;
    
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2(-1.0,  1.0)) * 0.0625;
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2( 0.0,  1.0)) * 0.125;
    color += texture(SCREEN_TEXTURE, SCREEN_UV + texel_size * vec2( 1.0,  1.0)) * 0.0625;

	color.rgb *= 1.0 - darkness;
    COLOR = color;
}