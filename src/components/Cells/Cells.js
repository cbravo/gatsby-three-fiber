import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { BokehDepthShader } from 'three/examples/jsm/shaders/BokehShader2.js'

import cellTextureUrl from './textures/cell-texture.jpg'
import cellNormalMapUrl from './textures/cell-normal.jpg'
import cellDisplacementMapUrl from './textures/cell-displacement.jpg'

const Cells = ({ count }) => {
  const { camera } = useThree()
  // This reference will give us direct access to the mesh
  const cellTexture = useMemo(
    () => new THREE.TextureLoader().load(cellTextureUrl),
    []
  )
  const cellNormal = useMemo(
    () => new THREE.TextureLoader().load(cellNormalMapUrl),
    []
  )
  const cellDisplacement = useMemo(
    () => new THREE.TextureLoader().load(cellDisplacementMapUrl),
    []
  )
  const mesh = useRef()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 10
      const speed = 0.01 + Math.random() / 200
      const xFactor = -2 + Math.random() * 4
      const yFactor = -2 + Math.random() * 4
      const zFactor = -2 + Math.random() * 4
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  // useFrame(state => {
  //   particles.forEach((particle, i) => {
  //     let { t, factor, speed, xFactor, yFactor, zFactor } = particle
  //     t = particle.t += speed / 2
  //     const a = Math.cos(t) + Math.sin(t * 1) / 10
  //     const b = Math.sin(t) + Math.cos(t * 2) / 10
  //     // const s = Math.max(1.5, Math.cos(t) * 5)
  //     // particle.mx += (mouse.current[0] - particle.mx) * 0.02
  //     // particle.my += (-mouse.current[1] - particle.my) * 0.02
  //     dummy.position.set(
  //       (particle.mx / 10) * a +
  //         xFactor +
  //         Math.cos((t / 10) * factor) +
  //         (Math.sin(t * 1) * factor) / 10,
  //       (particle.my / 10) * b +
  //         yFactor +
  //         Math.sin((t / 10) * factor) +
  //         (Math.cos(t * 2) * factor) / 10,
  //       (particle.my / 10) * b +
  //         zFactor +
  //         Math.cos((t / 10) * factor) +
  //         (Math.sin(t * 3) * factor) / 10
  //     )
  //     // dummy.scale.set(s, s, s)
  //     dummy.updateMatrix()
  //     mesh.current.setMatrixAt(i, dummy.matrix)
  //     mesh.current.setMatrixAt(0, dummy.matrix)
  //   })
  //   mesh.current.instanceMatrix.needsUpdate = true
  // })
  // console.log(BokehDepthShader)

  useFrame(state => {
    mesh.current.rotation.x += 0.01
    mesh.current.position.z += 0.01
  })

  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshDepthMaterial
        attach="material"
        map={cellTexture}
        // normalMap={cellNormal}
        displacementMap={cellDisplacement}
      />
      {/* <shaderMaterial
        attach="material"
        args={[BokehDepthShader]}
        uniforms-mNear-value={camera.near}
        uniforms-mFar-value={camera.far}
      /> */}
      {/* <meshPhongMaterial
        attach="material"
        color="orange"
        map={cellTexture}
        normalMap={cellNormal}
        displacementMap={cellDisplacement}
      /> */}
    </mesh>
  )
}

export default Cells
