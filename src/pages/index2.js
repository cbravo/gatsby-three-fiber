import React from 'react'
import { Canvas } from 'react-three-fiber'
import DisplacementSpheres from '../components/Cells/DisplacementSpheres'

import './style.css'

const Main = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DisplacementSpheres />
    </Canvas>
  )
}

export default Main
