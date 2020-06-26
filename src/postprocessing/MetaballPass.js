// /**
//  * Metaball shader
//  *

//  parameters:
//  tDiffuse: texture

//  source: https://codepen.io/willowcheng/pen/qxOope

//  * @author Willow Cheng
//  */

import { ShaderMaterial } from 'three'
import { Pass } from 'three/examples/jsm/postprocessing/Pass'

const MetaballShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec4 currentScreen = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(currentScreen.xyz * 1.5, currentScreen.w) * max(sign(currentScreen.w - 0.8), 0.0);
    }
  `,
}

var MetaballPass = function () {
  Pass.call(this)
  if (MetaballShader === undefined)
    console.error('THREE.MetaballPass relies on THREE.MetaballShader')
  this.needsSwap = true
  this.material = new ShaderMaterial(MetaballShader)
  this.fsQuad = new Pass.FullScreenQuad(this.material)
}

MetaballPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: MetaballPass,

  render: function (renderer, readBuffer, writeBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
      this.fsQuad.render(renderer)
    } else {
      renderer.setRenderTarget(writeBuffer)
      renderer.clear()
      this.fsQuad.render(renderer)
    }
  },
})

export { MetaballPass }
