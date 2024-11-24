"use client"
import React, { useEffect, useRef, useState} from 'react'
import { Canvas,  ThreeEvent,  useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useTexture } from "@react-three/drei";
//import { gsap } from "gsap";
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';

type CynliderProps={
  handleZoom: ()=>void,
}
const Cylinder:React.FC<CynliderProps> = ({handleZoom})=>{
  const tex = useTexture('/rescaro2.png')
  tex.needsUpdate = true;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(1, 1);
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false);
  useFrame(()=>{
    if(!hovered){
      if(ref.current){
        ref.current.rotation.y += 0.01;
      }
    }
  })
  const handlePointerOver = (e:ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
  };

  const handlePointerOut = (e:ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = 'auto';
    setHovered(false)
  };
  return (
    <mesh onPointerOver={handlePointerOver}  
    onPointerOut={handlePointerOut}  onClick={handleZoom} ref={ref} position={[0,-0.3,0]}>
<cylinderGeometry args={[3,3,3,64,30,true]}/>
<meshStandardMaterial transparent side={THREE.DoubleSide} map={tex}  roughness={0.5}  metalness={0.1}/>
    </mesh>
  )
}
const CustomCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, -1, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

type CarouselProps={
  handleZoom: ()=>void
}
const Carouselthree:React.FC<CarouselProps> = ({handleZoom}) => {
 
  return (
    <Canvas shadows >
      <CustomCamera/>
      <perspectiveCamera fov={35} position={[0, 0,0]} />
      <OrbitControls enableZoom={false}/>
      <ambientLight intensity={1.5} />
<directionalLight  intensity={1}
        position={[0, -1, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}  
        castShadow />
<EffectComposer>
  <Bloom intensity={4} mipmapBlur luminanceThreshold={0.6} luminanceSmoothing={0.7} />
</EffectComposer>
<ToneMapping adaptive/>
      <Cylinder handleZoom={handleZoom}/>
    </Canvas>
  )
}

export default Carouselthree