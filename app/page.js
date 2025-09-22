"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import Link from "next/link";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 🌼 Componente de la flor (optimizado)
function FlowerModel() {
  const { scene } = useGLTF("/models/flower.glb");
  const groupRef = useRef();

  // Centrar y escalar (memoizado para evitar cálculos repetidos)
  const optimizedScene = useMemo(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      scene.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = window.innerWidth < 768 ? 15 / maxDim : 8 / maxDim;
      scene.scale.set(scale, scale, scale);
    }
    return scene;
  }, [scene]);

  // Rotación más fluida
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Rotación constante y ligera
    }
  });

  return <primitive ref={groupRef} object={optimizedScene} />;
}

// 📸 Cámara adaptable
function ResponsiveCamera() {
  const { camera } = useThree();
  useEffect(() => {
    if (window.innerWidth < 768) {
      camera.position.set(0, 0, 4);
      camera.fov = 55;
    } else {
      camera.position.set(0, 1, 6);
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
    // Usar requestAnimationFrame para un progreso más fluido
    let start = null;
    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min((elapsed / 3000) * 100, 100); // 3 segundos para llegar al 100%
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-500 text-white">
        <h1 className="text-2xl font-bold mb-4">Cargando campo de flores...</h1>
        <p className="text-lg">{Math.round(progress)}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/campo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)", // Reducir el desenfoque para mejorar el rendimiento
        }}
      />

      {/* Canvas 3D encima del fondo */}
      <Canvas
        shadows={false} // Desactivar sombras para mejorar el rendimiento
        dpr={[1, 1.5]} // Reducir la calidad en dispositivos de baja resolución
        camera={{ position: [0, 1, 6], fov: 45 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={<ambientLight intensity={0.5} />}>
          <ResponsiveCamera />
          <FlowerModel />
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 2]} intensity={1.2} />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>

      {/* Contenido encima del Canvas */}
      <div className="relative flex flex-col items-center justify-end min-h-screen pb-10">
        <Link
          href="/more"
          className="px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:bg-fuchsia-700 transition"
        >
          Click me
        </Link>
      </div>
    </div>
  );
}
