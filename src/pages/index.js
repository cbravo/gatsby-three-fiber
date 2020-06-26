import React, { useRef, useEffect } from 'react'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader2.js'

import Cells from '../components/Cells/Cells'
import Box from '../components/Box/Box'

import './style.css'
extend({ EffectComposer, RenderPass, BokehShader })

// const shaderSettings = {
//   rings: 3,
//   samples: 4,
// }

// function Effects() {
//   const { gl, scene, camera, size } = useThree()
//   const composer = useRef()

//   // useEffect(() => void composer.current.setSize(size.width, size.height), [
//   //   size,
//   // ])

//   // useEffect(()=>{

//   // },[])

//   useFrame(() => composer.current.render(), 1)
//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass
//         attachArray="passes"
//         args={[scene, camera, null, 'red', 0.5]}
//       />
//       <bokehPass
//         attachArray="passes"
//         args={[
//           scene,
//           camera,
//           {
//             focus: 800.0,
//             aperture: 5 * 0.00001,
//             maxblur: 1.0,

//             width: size.width,
//             height: size.height,
//           },
//         ]}
//       />
//     </effectComposer>
//   )
// }

const Main = () => {
  return (
    <Canvas>
      {/* <Effects /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cells count={5} />
      {/* <Box /> */}
    </Canvas>
  )
}

export default Main
