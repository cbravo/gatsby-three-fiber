import React from 'react'
import { Canvas } from 'react-three-fiber'
import PerlinSpheres from '../components/Cells/PerlinSpheres'

import './style.css'

const Main = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PerlinSpheres count={10} />
      </Canvas>
    </div>
  )
}

export default Main
