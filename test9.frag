
#define DISTRE 0.0
#define NBTRE 1

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec3 totalcolor = vec3(0.0);


	for (int as = 0; as < NBTRE+1; as++){
		for (int bs = 0; bs < NBTRE+1; bs++){
			vec2 uv = (-iResolution.xy + 2.0*(fragCoord.xy + vec2((DISTRE/NBTRE)*as, (DISTRE/NBTRE)*bs)))/iResolution.xy;
			// vec2 m = (-iResolution.xy + 2.0*iMouse.xy)/iResolution.xy;

			vec3 color = vec3(0.0);

			float tre = sin(length(uv * 20.0)+1.2);

			// color.r = sin(length(uv)*20.0 + iTime*2.0);

			// color.g = cos(length(uv)*20.0 + iTime*2.0);
			// color.b = -sin(length(uv)*20.0 + iTime*2.0);

			if (tre > 0.2)
				color = vec3(1.0, 0.4, 0.7);

			if (tre > 0.95)
				color = vec3(1.0);

			if (abs(uv.x) < 0.05 && uv.y > 0)
				color = vec3(0.0);

			totalcolor += color/float((NBTRE+1)*(NBTRE+1));
		}
	}

	fragColor = vec4(totalcolor,1.0);
}