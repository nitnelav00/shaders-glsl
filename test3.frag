#pragma optimize(on)

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b*cos(6.28318*(c*t+d));
}

vec3 palette1(float t) {
    vec3 a = vec3(.5, .5, .5);
    vec3 b = vec3(.5, .5, .5);
    vec3 c = vec3(1, 1, 1);
    vec3 d = vec3(.263, .416, .557);
    return palette(t, a, b, c, d);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = vec2(0,0);
    if (iResolution.y < iResolution.x) {
        uv = (fragCoord*2 - iResolution.xy)/iResolution.y;
    } else {
        uv = (fragCoord*2 - iResolution.xy)/iResolution.x; 
    }
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0);

    for (float i = 0; i < 4; i++){
        uv = fract(uv*1.5)-.5;
        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette1(length(uv0) + i*(iTime+i*1.2)*.4);

        d = sin(d*8 + iTime)/8;
        d = abs(d);

        d = pow(0.01 / d, 1.2);
        finalColor +=  col * d;
    }

    fragColor = vec4(finalColor, 1.0);
}