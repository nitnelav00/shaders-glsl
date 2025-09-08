

float map(vec3 p){

    p.z += iTime * .4;

    float dist = sin(p.x)*sin(p.y)*sin(p.z)*.5 + 1.;
    dist /= sin(p.y) + .3;
    dist -= length(mod(p, 2.) - 1.) - 0.7;

    return dist;
}

mat2 rot2D(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
}

vec3 palette(float t) {
    vec3 a = vec3(.5, .5, .5);
    vec3 b = vec3(.5, .5, .5);
    vec3 c = vec3(0.2, 0.8, 1.);
    vec3 d = vec3(0.263, 0.316, 0.557);

    return a + b*cos(6.28318*(c*t + d));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2. - iResolution.xy) / iResolution.y;
    vec2 m = (iMouse.xy * 2. - iResolution.xy) / iResolution.y;

    // Initialisation
    vec3 ro = vec3(0,0,-3);
    vec3 rd = normalize(vec3(uv,1));
    vec3 col = vec3(0);

    ro.xz *= rot2D(-m.x);
    rd.xz *= rot2D(-m.x);

    ro.yz *= rot2D(-m.y);
    rd.yz *= rot2D(-m.y);

    float t = 0.; // total distance

    // raymarching
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd*t;

        float d = map(p);

        t += d;

        if (d < .001) break;
        if (t > 100.) {
            t = 100.;
            break;
        }
    }

    col = palette(t*.04);

    fragColor = vec4(col, 1);
}