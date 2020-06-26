import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

const DisplacementSpheres = ({ count }) => {
  const mesh = useRef()
  const vertexDisplacement = useRef()

  const geometry = useMemo(() => {
    const geometry = new THREE.SphereBufferGeometry(1, 32, 32)

    vertexDisplacement.current = new Float32Array(
      geometry.attributes.position.count
    )

    for (let i = 0; i < vertexDisplacement.current.length; i++) {
      vertexDisplacement.current[i] = Math.sin(i) * 0.5
    }

    geometry.setAttribute(
      'vertexDisplacement',
      new THREE.BufferAttribute(vertexDisplacement.current, 1)
    )

    return geometry
  }, [])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < vertexDisplacement.current.length; i++) {
      vertexDisplacement.current[i] = Math.sin(i + time) * 0.5
    }
    mesh.current.geometry.attributes.vertexDisplacement.needsUpdate = true
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh} geometry={geometry}>
      <shaderMaterial attach="material" args={[MyShader]} />
    </mesh>
  )
}

var MyShader = {
  uniforms: {
    t: { value: 0 },
  },
  vertexShader: `
  attribute float vertexDisplacement;
  varying vec3 vUv;
  void main() { 
    vUv = position;
    vec3 p = position + vec3(normal.x * vertexDisplacement, normal.y * vertexDisplacement, normal.z * vertexDisplacement);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
  }`,

  fragmentShader: `
  varying vec3 vUv;
  void main() {
    gl_FragColor = vec4( vUv, 1.0 );
  }`,
}

export default DisplacementSpheres
