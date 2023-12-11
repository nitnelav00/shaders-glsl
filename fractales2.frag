
#define BOUCLE 600
#define DIST 200

vec2 pow2i(vec2 v) {
	return vec2(
		v.x*v.x - v.y*v.y,
		v.x*v.y*2.0
		);
}

vec2 muli(vec2 a, vec2 b){
	return vec2(
		a.x*b.x - a.y*b.y,
		a.x*b.y+a.y*b.x
		);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (-iResolution.xy + 2.0*fragCoord.xy)/iResolution.y;
	uv *= 1.1;
	//uv.x -= .5;
	vec2 m = (-iResolution.xy + 2.0*iMouse.xy)/iResolution.y;
	m *= 0.5;
	m.y += 0.5;

	vec2 z = uv;

	float count = 0;
	for (int i = 0; i < BOUCLE; i++) {
		z = pow2i(z);
		z += vec2(m.x*2-1,m.y*2-1);
		if (dot(z,z) > DIST)
			break;
		count++;
	}

	vec3 color = vec3(0.0);
	color.r = smoothstep(100,0,count);
	color.g = smoothstep(30,0,count);
	color.b = count / 600;

	fragColor = vec4(color,1.0);
}