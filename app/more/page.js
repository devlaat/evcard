"use client";

import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function More() {
  const playlist = [
    { name: "Floricienta - Flores Amarillas", file: "/audio/floresamarillas.mp3" },
    { name: "Café Tacvba - Quiero Ver", file: "/audio/quierover.mp3" },
    { name: "Kalimba - Se te olvido", file: "/audio/seteolvido.mp3" },
    { name: "Bruno Mars - When I Was Your Man", file: "/audio/bruno.mp3" },
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const [muted, setMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);

  const handleEnded = () => {
    setCurrentSong((currentSong + 1) % playlist.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-between ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Imagen de fondo con superposición */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/campo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full flex flex-col items-center justify-between">
        {/* Título */}
        <div className="text-center mt-10">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow-lg`}>
            🌹🌹🌹 Feliz 21 de Septiembre 🌹🌹🌹
          </h1>
          <p className={`text-lg mb-6 drop-shadow-md ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            💌 Para mi amada GabyLove 💌
          </p>
        </div>

        {/* Reproductor de música */}
        <div className={`mb-6 w-full flex flex-col items-center p-6 rounded-2xl shadow-lg max-w-xl ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 bg-opacity-80'}`}>
          <p className={`text-xl font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🎵 Reproduciendo:<br />
            <span className="italic">{playlist[currentSong].name}</span>
          </p>

          <audio
            ref={audioRef}
            src={playlist[currentSong].file}
            autoPlay
            controls
            muted={muted}
            className="w-full mb-6 rounded-lg shadow-md"
            onEnded={handleEnded}
          />

          <div className="flex gap-6">
            <button
              onClick={() =>
                setCurrentSong((currentSong - 1 + playlist.length) % playlist.length)
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Anterior
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className={`px-6 py-3 ${muted ? "bg-gradient-to-r from-gray-400 to-gray-600" : "bg-gradient-to-r from-green-500 to-green-700"} text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform`}
            >
              {muted ? "🔊 Activar sonido" : "🔇 Silenciar"}
            </button>

            <button
              onClick={() => setCurrentSong((currentSong + 1) % playlist.length)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Dedicatoria romántica */}
        <div className={`bg-pink-100 bg-opacity-70 p-6 rounded-xl shadow-md max-w-2xl mb-10 ${darkMode ? 'bg-gray-800' : ''}`}>
          <p className={`text-lg italic text-black text-center drop-shadow-sm ${darkMode ? 'text-white' : ''}`}>
            Con todo mi amor..<br />
            Hoy quiero recordarte lo mucho que te amo. <br /> Eres mi esposita, mi compañera, mi amor, la mamá más increíble de nuestra hijita preciosa.<br /> Gracias por llenar nuestra vida de amor, alegría y momentos hermosos.
            <br />Feliz día del amor, mi vida. <br />Te amo con todo mi corazón, hoy y siempre. 💖
          </p>
        </div>

        {/* Carrusel de imágenes */}
        <div className="w-full max-w-2xl mb-10">
          <Slider {...settings}>
            <div>
              <Image
                src="/images/photo1.jpg"
                alt="Recuerdo 1"
                width={1200}
                height={500}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div>
              <Image
                src="/images/photo2.jpg"
                alt="Recuerdo 2"
                width={1200}
                height={500}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div>
              <Image
                src="/images/photo3.jpg"
                alt="Recuerdo 3"
                width={1200}
                height={500}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
          </Slider>
        </div>

        {/* Botón para cambiar tema */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-10 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          {darkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
        </button>

        {/* Botón regresar */}
        <Link
          href="/"
          className="mb-10 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          ⬅ Go Back
        </Link>

        {/* Botón flotante para volver al inicio */}
        <a
          href="#top"
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ⬆
        </a>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 w-full">
          Dev: <span className="font-bold">LAAT</span>
        </footer>
      </div>
    </div>
  );
}
