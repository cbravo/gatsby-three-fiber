import React, { useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { Color, PlaneBufferGeometry, InstancedBufferAttribute } from 'three'

const COLORS = ['#446AB3', '#E36980', '#1FC6A6']

const MetaBall = ({ count }) => {
  const mesh = useRef()

  // useFrame(() => {
  //   mesh.current.position.x += 0.001
  // })
  const geometry = useMemo(() => {
    const geometry = new PlaneBufferGeometry(1, 1, 1, 1)

    const positions = new Float32Array(count * 3) // xyz;
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 50
      positions[i + 2] = Math.random() * 100
    }

    geometry.setAttribute(
      'instancePosition',
      new InstancedBufferAttribute(positions, 3)
    )

    return geometry
  }, [count])

  return (
    <instancedMesh ref={mesh} args={[geometry, null, count]}>
      <shaderMaterial attach="material" args={[MyShader]} />
    </instancedMesh>
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
    attribute vec3 instancePosition;  
    void main() {
      vUv = uv;
      vec3 newPosition = position + instancePosition;
      vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
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
