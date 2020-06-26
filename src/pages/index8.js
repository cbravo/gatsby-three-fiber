import React, { useRef, useEffect } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
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
      <renderPass attachArray="passes" args={[scene, camera]} />
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
      <Canvas gl={{ autoClear: false }}>
        <Effects />
        <MetaballSwarm instances={100} />
      </Canvas>
    </div>
  )
}

export default Main
