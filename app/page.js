"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import Link from "next/link";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 🌼 Modelo 3D optimizado con animación combinada
function FlowerModel() {
  const { scene } = useGLTF("/models/flower.glb");
  const groupRef = useRef();

  const optimizedScene = useMemo(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      scene.position.sub(center);

      // Escala según dispositivo
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = window.innerWidth < 640 ? 10 / maxDim : 6 / maxDim;
      scene.scale.set(scale, scale, scale);
    }
    return scene;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;

      // Rotación constante
      groupRef.current.rotation.y += 0.01;

      // Oscilación tipo viento
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;

      // Flotación vertical
      groupRef.current.position.y = Math.sin(t) * 0.1;

      // "Respiración" (cambia el tamaño suavemente)
      const scale = 1 + Math.sin(t * 2) * 0.015;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return <primitive ref={groupRef} object={optimizedScene} />;
}

// 📸 Cámara responsiva
function ResponsiveCamera() {
  const { camera } = useThree();
  useEffect(() => {
    if (window.innerWidth < 640) {
      camera.position.set(0, 1, 4); // sube un poco en móviles
      camera.fov = 55;
    } else {
      camera.position.set(0, 1.5, 6);
      camera.fov = 45;
    }
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

// ✅ Página principal
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = null;
    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min((elapsed / 2000) * 100, 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setLoading(false);
      }
    };
    requestAnimationFrame(animateProgress);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-500 text-white text-center px-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Cargando campo de flores...
        </h1>
        <p className="text-lg">{Math.round(progress)}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center">
      {/* Fondo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/campo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
        }}
      />

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={<ambientLight intensity={0.5} />}>
          <ResponsiveCamera />
          <FlowerModel />
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 2]} intensity={1.2} />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>

      {/* Contenedor del modelo + botón */}
      <div className="relative flex flex-col items-center justify-center z-10 mt-[40vh] sm:mt-[35vh]">
        <Link
          href="/more"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:bg-fuchsia-700 transition text-sm sm:text-base mt-6"
        >
          Tócame✨        </Link>
      </div>
    </div>
  );
}
