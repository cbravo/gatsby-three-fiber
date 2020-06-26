import React, { useRef, useEffect } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import PerlinSpheres from '../components/Cells/PerlinSpheres'

import './style.css'

extend({ EffectComposer, RenderPass, BokehPass })

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
      <bokehPass
        attachArray="passes"
        args={[
          scene,
          camera,
          {
            focus: 850,
            aperture: 0.000025,
            maxblur: 1.0,

            width: size.width,
            height: size.height,
          },
        ]}
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
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PerlinSpheres count={10} />
      </Canvas>
    </div>
  )
}

export default Main
