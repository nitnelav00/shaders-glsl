////

#define vitesse 4.0

float sigmoid(float x){
	return 1.0/(1.0+pow(vitesse,-x));
}

#define sig sigmoid

vec2 sig(vec2 ine) { return vec2(sig(ine.x), sig(ine.y));}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = (-iResolution.xy + 2.0*fragCoord.xy)/iResolution.xy;
	uv *= 8.0;

	// vec2 m = (-iResolution.xy + 2.0*iMouse.xy)/iResolution.y;

	vec3 color = vec3(1.0);

	float d = length(uv);

	mat2 a = mat2(1.3, 1.2,-0.3, 1.2);
	mat2 c = mat2(2.8, -1.8, 2.4, -8.3);
	vec2 b = vec2(0.0);

	b += uv * a;
	b *= sin(uv);
	b *= c + d;
	b /= (a+c) * uv + b;
	color.rg = sig(b);
	// color.b = m.x;
	// color.b = sig(color.b);

	fragColor = vec4(color,1.0);
}
