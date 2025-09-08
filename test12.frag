
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
	return a + b*cos( 6.28318*(c*t+d));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = (-iResolution.xy + 2.0*fragCoord.xy)/iResolution.xy;
	uv *= 8.0;

	// vec2 m = (-iResolution.xy + 2.0*iMouse.xy)/iResolution.y;

	vec3 color = vec3(0.0);

	float dist = length(uv / 2.0);
	float x = uv.x / uv.y;
	color = palette(x * dist + cos(iTime) * dist, vec3(0.2,0.5,0.3),vec3(0.5,0.5,0.7),vec3(1.0,1.0,1.0),vec3(0.7,0.3,0.7));

	fragColor = vec4(color,1.0);
}