import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { Color } from 'three'

const COLORS = ['#446AB3', '#E36980', '#1FC6A6']

const MetaBall = props => {
  const mesh = useRef()

  // useFrame(() => {
  //   mesh.current.position.x += 0.001
  // })

  return (
    <mesh ref={mesh} {...props}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <shaderMaterial attach="material" args={[MyShader]} />
    </mesh>
  )
}

var MyShader = {
  uniforms: {
    color: {
      type: 'c',
      value: new Color(COLORS[Math.floor(Math.random() * COLORS.length)]),
    },
  },
  transparent: true,
  depthWrite: false,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  fragmentShader: `
    uniform vec3 color;
    varying vec2 vUv;
    float drawGradientArc(vec2 center, vec2 currentPosition, float scale) {
      float dist = distance(center, currentPosition) * (2.0 / scale);
      return 1.0 - dist;
    }
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float alpha = drawGradientArc(center, vUv, 1.0);
      gl_FragColor = vec4(vec3(color), alpha);
    }
  `,
}

export default MetaBall
