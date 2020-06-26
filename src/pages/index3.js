import React from 'react'
import { Canvas } from 'react-three-fiber'
import PerlinSphere from '../components/Cells/PerlinSphere'

import './style.css'

const Main = () => {
  return (
    <Canvas camera={{ position: [0, 0, -35], near: 0.1, far: 200 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerlinSphere />
    </Canvas>
  )
}

export default Main
