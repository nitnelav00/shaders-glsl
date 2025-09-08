//

float sig(float x, float vitesse){
	return 1.0/(1.0+pow(2,-x*vitesse));
}

float norml(float x, float vitesse) {
	return pow(2.0,-1./2.*pow(-x/vitesse,2.0));
}

vec2 sig(vec2 ine, float vitesse) { 
	return vec2(sig(ine.x, vitesse), sig(ine.y, vitesse));
}
vec2 norml(vec2 ine, float vitesse) { 
	return vec2(norml(ine.x, vitesse), norml(ine.y, vitesse));
}
vec3 sig(vec3 ine, float vitesse) { 
	return vec3(sig(ine.x, vitesse), sig(ine.y, vitesse), sig(ine.z, vitesse));
}
vec3 norml(vec3 ine, float vitesse) { 
	return vec3(norml(ine.x, vitesse), norml(ine.y, vitesse), norml(ine.z, vitesse));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = (-iResolution.xy + 2.0*fragCoord.xy)/iResolution.xy;
	uv *= 8.0;

	// vec2 m = (-iResolution.xy + 2.0*iMouse.xy)/iResolution.y;

	vec3 color = vec3(10.0);

	float dist = length(uv);

	mat2 a = mat2(1.3, 1.2,-0.3, 1.2);
	mat2 c = mat2(2.8, -1.8, 2.4, -8.3);
	vec2 b = vec2(0.0);

	b += uv * a;
	b *= sin(uv);
	b *= c + dist;
	b /= (a+c) * uv + b;
	color.rg = sig(b, dist * uv.x * 0.2);
	//color = sig(color);

	fragColor = vec4(color,1.0);
}
