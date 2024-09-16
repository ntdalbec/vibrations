import ExampleShaderSketch from "./ExampleShaderSketch";
import fragmentShader from "./shaders/frag.glsl";
import vertexShader from "./shaders/vert.glsl";

const canvas = document.querySelector("#canvas");
const sketch = new ExampleShaderSketch(canvas, fragmentShader, vertexShader);
sketch.start();
