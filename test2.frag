
float dot2( in vec2 v ) { return dot(v,v); }

float sdHeart( in vec2 p )
{
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    vec2 p = (2.0*fragCoord-iResolution.xy)/min(iResolution.y,iResolution.x);
    
    p.y += .4;
    float b = sdHeart(p);
    float a = ceil(smoothstep(.01,.0,b * 3.));

    // Output to screen
    fragColor = vec4(a,1.-a, 1.-a,1.0);
}