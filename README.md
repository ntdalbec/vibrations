# lygia-sketch-base

This repository serves as a template for creating fullscreen shader sketches using the LYGIA shader library and WebGL. It includes a basic setup with Webpack and TWGL.js to facilitate shader development.

## Getting Started

Implement a subclass of `ShaderSketchBase` and set your uniforms in the `ShaderClassBase.update(time)` instance method. Make sure to call `super.update(time)` at the beginning and avoid overriding `ShaderClassBase.uniforms` with a new object unless you want to get rid of the default uniforms.

For developing the sketch, run `npm run start` to boot of the development server. `npm run build` builds the files to the `dist` folder for when you want to deploy them. Note that **the dist folder isn't .gitignore'd** so either add it to the `.gitignore` or make sure to build before committing your work. This is done for simplicity with Github Pages.

## Cloning the Repository

When cloning this repository, make sure to initialize submodules to include the LYGIA shader library:

```sh
git clone --recurse-submodules https://github.com/ntdalbec/lygia-sketch-base.git
```