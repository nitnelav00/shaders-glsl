#define PI 3.1415926535897932

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float Noise(vec2 p, float freq ){
	float unit = 0.7/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(PI*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*Noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
	vec2 uv = vec2( fragCoord.xy - 0.5*iResolution.xy );
	uv = 2.0 * uv.xy / iResolution.y;

	vec3 color = vec3(0.0);

	color.r = pNoise(uv.xy, 1);
	color.g = 0.5-pNoise(uv.xy, 1);
	
	fragColor = vec4(color, 1.);
}