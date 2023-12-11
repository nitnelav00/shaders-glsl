//////////////////////////////////////////////////////////////////////
// sRGB color transform and inverse from 
// https://bottosson.github.io/posts/colorwrong/#what-can-we-do%3F

vec3 srgb_from_linear_srgb(vec3 x) {

    vec3 xlo = 12.92*x;
    vec3 xhi = 1.055 * pow(x, vec3(0.4166666666666667)) - 0.055;
    
    return mix(xlo, xhi, step(vec3(0.0031308), x));

}

vec3 linear_srgb_from_srgb(vec3 x) {

    vec3 xlo = x / 12.92;
    vec3 xhi = pow((x + 0.055)/(1.055), vec3(2.4));
    
    return mix(xlo, xhi, step(vec3(0.04045), x));

}

//////////////////////////////////////////////////////////////////////
// oklab transform and inverse from
// https://bottosson.github.io/posts/oklab/


const mat3 fwdA = mat3(1.0, 1.0, 1.0,
                       0.3963377774, -0.1055613458, -0.0894841775,
                       0.2158037573, -0.0638541728, -1.2914855480);
                       
const mat3 fwdB = mat3(4.0767245293, -1.2681437731, -0.0041119885,
                       -3.3072168827, 2.6093323231, -0.7034763098,
                       0.2307590544, -0.3411344290,  1.7068625689);

const mat3 invB = mat3(0.4121656120, 0.2118591070, 0.0883097947,
                       0.5362752080, 0.6807189584, 0.2818474174,
                       0.0514575653, 0.1074065790, 0.6302613616);
                       
const mat3 invA = mat3(0.2104542553, 1.9779984951, 0.0259040371,
                       0.7936177850, -2.4285922050, 0.7827717662,
                       -0.0040720468, 0.4505937099, -0.8086757660);

vec3 oklab_from_linear_srgb(vec3 c) {

    vec3 lms = invB * c;
            
    return invA * (sign(lms)*pow(abs(lms), vec3(0.3333333333333)));
    
}

vec3 linear_srgb_from_oklab(vec3 c) {

    vec3 lms = fwdA * c;
    
    return fwdB * (lms * lms * lms);
    
}

//////////////////////////////////////////////////////////////////////

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

    float count = 0.0;
    for (int i = 0; i < BOUCLE; i++) {
        z = pow2i(z);
        z += vec2(m.x*2-1,m.y*2-1);
        if (dot(z,z) > DIST)
            break;
        count++;
    }

    vec3 color = vec3(0.0);
    color.x = smoothstep(0, 50, count);
    color.y = 0.5*cos(count / 3.1415926535);
    color.z = 0.5*sin(count / 3.1415926535);
    
    color = linear_srgb_from_oklab(color);

    fragColor = vec4(srgb_from_linear_srgb(color), 1.0);
}