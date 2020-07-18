import React, { useRef, useMemo, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import MetaballSwarm from '../components/MetaballSwarm/MetaballSwarm'

import './style.css'

extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, FXAAShader })

const Effects = () => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()

  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size,
  ])

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />
    </effectComposer>
  )
}

const Main = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas gl={{ autoClear: false }}>
        <Effects />
        <MetaballSwarm />
      </Canvas>
    </div>
  )
}

export default Main
