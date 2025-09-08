
float sdSphere(vec3 p, float s) {
   return length(p)-s;
}

float sdBox(vec3 p, vec3 b) {
   vec3 d = abs(p) - b;
   return length(max(d,0.0)) + min(max(d.x,max(d.y,d.z)),0.0);
}

float map(vec3 p){
    p.z += iTime * .4;
    vec3 pos = mod(p, 2.) - 1.;
    return sdBox(pos, vec3(.3));
}

mat2 rot2D(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
}

vec3 palette(float t) {
    vec3 a = vec3(.5, .5, .5);
    vec3 b = vec3(.5, .5, .5);
    vec3 c = vec3(1., 1., 1.);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b*cos(6.28318*(c*t + d));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2. - iResolution.xy) / iResolution.y;
    vec2 m = (iMouse.xy * 2. - iResolution.xy) / iResolution.y;

    // Initialisation
    vec3 ro = vec3(0,0,-3);
    vec3 rd = normalize(vec3(uv,1));
    vec3 col = vec3(0);

    ro.xz *= rot2D(-.2);
    rd.xz *= rot2D(-.2);

    ro.yz *= rot2D(-.2);
    rd.yz *= rot2D(-.2);

    float t = 0.; // total distance

    // raymarching
    for (int i = 0; i < 30; i++) {
        vec3 p = ro + rd*t;

        float d = map(p);

        t += d;

        if (d < .001) break;
        if (t > 100.) {
            t = 100.;
            break;
        }
    }

    col = palette(t*.04 + iTime*.1);

    fragColor = vec4(col, 1);
}