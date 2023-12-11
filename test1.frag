#version 450
#pragma optimize(on)
uniform float iTime;
uniform vec2 iResolution;

#define S smoothstep

mat2 Rot(float a){
	float s=sin(a), c=cos(a);
	return mat2(c,-s,s,c);
}

float Feather(vec2 p){
	float d = length(p-vec2(0,clamp(p.y, -.3,.3)));
	float r = mix(.1, .01, S(-.3, .3, p.y));
	float m = S(.01,.0,d-r);

	float side = sign(p.x);
	float x = .9*abs(p.x)/r;
	float wave = (1.-x)*sqrt(x)+x*(1.-sqrt(1.-x));
	float y = (p.y-wave*.2)*40.+side;
	float id = floor(y+20.);
	float n = fract(sin(id*564.22)*763.);
	float shade = mix(.3, 1., n);
	float srand_length = mix(.7, 1., fract(n*34.));
	float srand = S(.1, .0, abs(fract(y)-.5)-.3);
	srand *= S(.1,.0,x-srand_length);

	d = length(p-vec2(0,clamp(p.y, -.45,.1)));
	float stem = S(.01, .0, d+p.y*.025);

	return max(srand * m * shade, stem);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv= (fragCoord-.5* iResolution.xy)/iResolution.y;
	vec3 color = vec3(0);

	uv*=Rot(iTime);

	color += Feather(uv);

	fragColor = vec4(color,1.0);
}