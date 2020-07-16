import React, { useRef, useEffect } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { MetaballPass } from '../postprocessing/MetaballPass'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import MetaballSwarm from '../components/Metaball/MetaballSwarm'

import './style.css'

extend({ EffectComposer, RenderPass, MetaballPass })

const Effects = () => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} renderToScreen />
      <metaballPass
        attachArray="passes"
        args={[scene, camera]}
        renderToScreen
      />
    </effectComposer>
  )
}

const Main = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas gl={{ autoClear: false }} pixelRatio={getDevicePixelRatio(1)}>
        <Effects />
        <MetaballSwarm instances={90} />
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
