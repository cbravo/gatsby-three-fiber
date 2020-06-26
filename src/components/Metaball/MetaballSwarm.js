import React, { useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

// const COLOR = '#993399'
const COLOR = '#000'

const MetaBallSwarm = ({ instances }) => {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const metaballs = useMemo(() => {
    const temp = []
    for (let i = 0; i < instances; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -25 + Math.random() * 50
      const yFactor = -25 + Math.random() * 50
      const zFactor = -2 + Math.random() * 4
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [instances])

  useFrame(() => {
    metaballs.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.max(10.5, Math.cos(t) * 20)
      // particle.mx += (mouse.current[0] - particle.mx) * 0.02
      // particle.my += (-mouse.current[1] - particle.my) * 0.02
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, instances]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <shaderMaterial attach="material" args={[MetaballShaderMaterial]} />
    </instancedMesh>
  )
}

const MetaballShaderMaterial = {
  uniforms: {
    color: {
      type: 'c',
      value: new THREE.Color(COLOR),
    },
  },
  transparent: true,
  depthWrite: false,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = instanceMatrix * modelViewMatrix * vec4( position, 1.0 );
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

export default MetaBallSwarm
