import React, { useRef, useMemo, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import MetaballSwarm from '../components/MetaballSwarm/MetaballSwarm'

import './style.css'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

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
    </effectComposer>
  )
}

const Main = () => {
  const mouse = useRef([0, 0])

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  )

  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        gl={{ autoClear: false }}
        pixelRatio={getDevicePixelRatio(1)}
        onMouseMove={onMouseMove}
      >
        <Effects />
        <MetaballSwarm mouse={mouse} />
      </Canvas>
    </div>
  )
}

const getDevicePixelRatio = (maxDpr = 2.0) =>
  typeof window !== 'undefined'
    ? Math.min(
        Math.max(Math.round(window.devicePixelRatio), 1),
        maxDpr
      ).toFixed(1)
    : '1.0'

export default Main
