"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simula el progreso del cargador
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false); // Finaliza la carga
          return 100;
        }
        return prev + 1; // Incrementa el progreso
      });
    }, 30); // Incrementa el progreso cada 30ms
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-500 text-white">
        <h1 className="text-2xl font-bold mb-4">Cargando campo de flores...</h1>
        <p className="text-lg">{progress}%</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Contenedor del fondo con desenfoque */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/campo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)", // Difumina solo el fondo
        }}
      ></div>

      {/* Contenedor del contenido */}
      <div className="relative flex items-center justify-center min-h-screen">
        <Link
          href="/more"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Click me
        </Link>
      </div>
    </div>
  );
}
