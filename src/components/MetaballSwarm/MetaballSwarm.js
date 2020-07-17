import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { Object3D, Vector4 } from 'three'

import CreateMetaballMaterial from './MetaballMaterial'

const MetaballSwarm = ({ mouse }) => {
  const { gl } = useThree()
  const width = gl.getContext().canvas.width
  const height = gl.getContext().canvas.height
  const pixelRatio = gl.getPixelRatio()
  const mesh = useRef()
  let metaballCount = 10

  const metaballUniforms = useMemo(
    () => new Array(metaballCount).fill().map(() => new Vector4()),
    [metaballCount]
  )

  // CREATE METABALL OBJECTS
  const metaballs = useMemo(
    () => new Array(metaballCount).fill().map(() => new Object3D()),
    [metaballCount]
  )

  const metaballMaterial = useMemo(
    () => CreateMetaballMaterial(metaballCount),
    [metaballCount]
  )

  const normalizeXPos = x => x + width * 0.5
  const normalizeYPos = y => height - (y + height * 0.5)

  useLayoutEffect(() => {
    metaballs.forEach((metaball, i) => {
      metaball.userData = {
        radius: 35 * pixelRatio,
        enabled: 1.0,
        // speed: 1.1 - 0.1 * (i + 1),
        speed: 0.5,
        tracking: true,
      }
    })
  }, [metaballs, pixelRatio])

  useFrame(() => {
    const metaballTarget = {
      x: mouse.current[0] * pixelRatio,
      y: mouse.current[1] * pixelRatio,
    }
    metaballs.forEach((metaball, i) => {
      const { speed, radius, tracking, enabled } = metaball.userData
      if (tracking && enabled === 1) {
        const distX = metaballTarget.x - metaball.position.x
        const distY = metaballTarget.y - metaball.position.y
        // metaball.position.x += distX * (i + 1) * speed
        // metaball.position.y += distY * (i + 1) * speed
        metaball.position.x += distX * speed
        metaball.position.y += distY * speed

        metaballTarget.x = metaball.position.x
        metaballTarget.y = metaball.position.y
      }
      metaballUniforms[i].set(
        normalizeXPos(metaball.position.x),
        normalizeYPos(metaball.position.y),
        radius,
        metaball.userData.enabled
      )
    })
  })

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[width, height, 1, 1]} />
      <shaderMaterial
        attach="material"
        uniforms-metaballs-value={metaballUniforms}
        args={[metaballMaterial]}
      />
      {/* <meshPhongMaterial attach="material" color="red" /> */}
    </mesh>
  )
}

export default MetaballSwarm
