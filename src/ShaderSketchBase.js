/**
 * Represents a base class for shader sketches.
 * @class
 */
import { 
  createProgramInfo, 
  createBufferInfoFromArrays, 
  resizeCanvasToDisplaySize,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo
} from "twgl.js";

export default class ShaderSketchBase {
  /**
   * Constructs a new instance of ShaderSketchBase. Not intended to be called directly, and instead used as a base class.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the shader sketch.
   * @param {string} fragmentShader - The fragment shader code.
   * @param {string} vertexShader - The vertex shader code.
   */
  constructor(canvas, fragmentShader, vertexShader) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2');
    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
    this.animationFrameId = null;

    this.programInfo = createProgramInfo(this.gl, [this.vertexShader, this.fragmentShader]);
    this.bufferInfo = createBufferInfoFromArrays(this.gl, {
      position: {
        numComponents: 2,
        data: [
          -1, -1,
          1, -1,
          -1,  1,
          -1,  1,
          1, -1,
          1,  1,
        ],
      },
    });

    this.uniforms = {
      u_time: 0,
      u_resolution: [this.canvas.width, this.canvas.height],
      u_mouse: [0, 0],
    };

    this.canvas.addEventListener("mousemove", (event) => {
      this.uniforms.u_mouse = this.getNormalizedMousePosition(event);
    });
  }
  
  /**
   * Renders the shader sketch. Used through requestAnimationFrame looping.
   * 
   * @private
   * @param {number} time - The current time in milliseconds.
   */
  render(time) {
    resizeCanvasToDisplaySize(this.canvas);
    this.update(time);

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    setUniforms(this.programInfo, this.uniforms);
    drawBufferInfo(this.gl, this.bufferInfo);

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  /**
   * Updates the shader sketch base. Intended to be overridden by subclasses. 
   * Call super.update(time) to update the default uniforms. Called before the sketch is rendered.
   * 
   * @param {number} time - The current time in milliseconds.
   */
  update(time) {
    Object.assign(this.uniforms, {
      u_time: time * 0.001,
      u_resolution: [this.canvas.width, this.canvas.height],
    });
  }

  /**
   * Starts the rendering process by requesting an animation frame.
   */
  start() {
    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  /**
   * Stops the animation frame.
   */
  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }


  /**
   * Calculates the mouse position normalized to a range of [0, 1]. Intended to be used in the mousemove event listener.
   * 
   * @private
   * @param {MouseEvent} event - The mouse event object.
   * @returns {number[]} - The normalized mouse position as an array of two values.
   */
  getNormalizedMousePosition(event) {
    return [
      event.offsetX / this.canvas.clientWidth,
      event.offsetY / this.canvas.clientHeight,
    ];
  }
}