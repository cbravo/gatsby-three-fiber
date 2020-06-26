import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import ashima from '../../glsl/ashima'

const PerlinSphere = ({ count }) => {
  const mesh = useRef()

  useFrame(state => {
    mesh.current.material.uniforms.time.value = state.clock.getElapsedTime()
  })

  return (
    <mesh ref={mesh}>
      <icosahedronBufferGeometry attach="geometry" args={[20, 3]} />
      <shaderMaterial attach="material" args={[MyShader]} />
    </mesh>
  )
}

var MyShader = {
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    ${ashima}
    varying vec2 vUv;
    varying float noise;
    uniform float time;

    float turbulence( vec3 p ) {

      float t = -.5;

      for (float f = 1.0 ; f <= 10.0 ; f++ ){
        float power = pow( 2.0, f );
        t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
      }

      return t;

    }

    void main() {

      vUv = uv;

      // get a turbulent 3d noise using the normal, normal to high freq
      noise = 7.5 *  -.10 * turbulence( .5 * normal + (time * 0.1) );
      // get a 3d noise using the position, low frequency
      float b = 1.0 * pnoise( 0.05 * position + vec3( 0.2 * time ), vec3( 100.0 ) );
      // compose both noises
      float displacement = - 10. * noise + b;

      // move the position along the normal and transform it
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    varying float noise;

    void main() {
      // vec2 baseColor = vUv;
      vec2 baseColor = vec2(0.5, 0);
      // compose the colour using the UV coordinate
      // and modulate it with the noise like ambient occlusion
      vec3 color = vec3( baseColor * ( 2. - 4. * noise ), 0.2 );
      gl_FragColor = vec4( color.rgb, 1.0 );

    }
  `,
}

export default PerlinSphere
