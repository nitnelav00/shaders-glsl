
vec3 normalize(vec3 vec) {
	vec3 normalized;
	float squared = vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
	float scale = 1.0 / sqrt(squared);
	normalized.x = vec.x * scale;
	normalized.y = vec.y * scale;
	normalized.z = vec.z * scale;

	return normalized;
}

const mat3 un = mat3(
			1.0,8.0,1.0,
			1.0,1.0,8.0,
			1.0,1.0,8.0
	);

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;

    vec3 color = vec3(0.0);

    color = vec3(uv, 1.0) * un;
    color = normalize(color);

    fragColor = vec4(color, 1.);
}