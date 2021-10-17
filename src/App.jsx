import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Box({ z }) {
  const ref = React.useRef(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = React.useState({
    x: THREE.MathUtils.randFloatSpread(3),
    y: THREE.MathUtils.randFloatSpread(height),
  });
  useFrame((state) => {
    ref.current.position.set(data.x * width, (data.y += 0.25), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color='aqua' />
    </mesh>
  );
}

function Gourd(props) {
  const { scene } = useGLTF('/gourd3.glb');
  return <primitive object={scene} {...props} />;
}

export default function App({ count = 100 }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Gourd scale={0.01} color='red' />
      </Suspense>
      {/* {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))} */}
    </Canvas>
  );
}
