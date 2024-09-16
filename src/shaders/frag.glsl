#version 300 es

precision mediump float;

#include "lygia/generative/snoise.glsl"

uniform vec2 u_resolution;
uniform float u_time;

in vec2 fragPosition;
out vec4 fragColor;

void main() {
  float n = snoise(vec3(fragPosition, u_time));
  fragColor = vec4(n, n, n, 1.0);
}
