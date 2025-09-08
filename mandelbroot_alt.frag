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

vec3 palette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
	return a + b*cos( 6.28318*(c*t+d) );
}

#define BOUCLE 400
#define DIST 300.0
#define COUNTMAX 150.0

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (-iResolution.xy + 2.0*fragCoord.xy)/iResolution.y;
	uv *= 1.0;
	uv.x -= 0.5;
	uv.y -= 0.0;

	vec2 a = uv;

	float count = 0.0;
	for (int i = 0; i < BOUCLE; i++) {
		a = pow2i(a);
		a += uv;
		if (a.x > DIST || a.y > DIST) {
			break;
		}
		count++;
	}

	vec3 color = vec3(0.0);
	//color.r = (count*2.0) / COUNTMAX;
	//color.g = count / COUNTMAX;
	//color.b = (count*4.0)/COUNTMAX;
	color = palette(count/COUNTMAX*8., vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0,0.10,0.20));

	fragColor = vec4(color,1.0);
}