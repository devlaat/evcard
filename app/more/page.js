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
    { name: "Bella Dosis - Paciente 16", file: "/audio/paciente16.mp3" },
    { name: "Charles Ans - Andrómeda", file: "/audio/andromeda.mp3" },
    { name: "Ocacional Talento - Buen Tipo", file: "/audio/ocacional.mp3" },
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEnded = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-red-400 to-fuchsia-600 flex flex-col items-center">

      {/* Corazones flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute text-white opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 w-full max-w-5xl px-4">

        {/* Título */}
        <h1 className="text-center text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl mt-10 mb-6">
          💘 Feliz 14 de Febrero 💘
        </h1>

        {/* Tarjeta Glass */}
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 mb-10 border border-white/30">

          {/* CONTADOR */}
          <p className="text-center text-white text-lg mb-6">
            ⏳ Compartiendo momentos desde hace <b>{seconds}</b> segundos 💞
          </p>

          {/* REPRODUCTOR */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg mb-8">
            <p className="text-center text-xl font-semibold mb-4">
              🎶 {playlist[currentSong].name}
            </p>

            <audio
              ref={audioRef}
              src={playlist[currentSong].file}
              controls
              muted={muted}
              className="w-full mb-4"
              onEnded={handleEnded}
            />

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() =>
                  setCurrentSong((currentSong - 1 + playlist.length) % playlist.length)
                }
                className="btn"
              >
                ⏮ Anterior
              </button>

              <button
                onClick={() => setMuted(!muted)}
                className="btn"
              >
                {muted ? "🔊 Activar" : "🔇 Silenciar"}
              </button>

              <button
                onClick={() => setCurrentSong((currentSong + 1) % playlist.length)}
                className="btn"
              >
                Siguiente ⏭
              </button>
            </div>
          </div>

          {/* MENSAJE */}
          <div className="bg-pink-100/90 rounded-2xl p-6 text-center shadow-md">
            <p className="text-lg italic text-gray-800 leading-relaxed">
              Hay personas que no llegan a tu vida por casualidad…  
              llegan para quedarse, para sumar, para enseñarte que la amistad también
              puede ser un regalo increíble.  
              <br /><br />
              Gracias por cada risa, cada locura y cada momento compartido 💕  
              Hoy y siempre, esto es solo un pequeño recordatorio de lo especial que eres ✨
            </p>
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10">
          <Slider {...settings}>
            {[1,2,3,4,5].map((n) => (
              <Image
                key={n}
                src={`/images/photo${n}.jpg`}
                alt={`Recuerdo ${n}`}
                width={900}
                height={900}
                className="w-full h-[500px] object-cover"
              />
            ))}
          </Slider>
        </div>

        {/* BOTÓN */}
        <Link
          href="/"
          className="inline-block mb-10 px-8 py-4 bg-white text-fuchsia-600 font-bold rounded-full shadow-lg hover:scale-105 transition"
        >
          ⬅ Volver al inicio
        </Link>

        <footer className="text-white text-center mb-6 opacity-90">
          💖 Hecho con amor por <b>devLAAT 🚀</b>
        </footer>
      </div>

      {/* Animación */}
      <style jsx>{`
        .btn {
          padding: 12px 20px;
          background: linear-gradient(to right, #ec4899, #ef4444);
          color: white;
          border-radius: 999px;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        .btn:hover {
          transform: scale(1.08);
        }
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-120vh); }
        }
        .animate-float {
          animation: float 12s linear infinite;
        }
      `}</style>
    </div>
  );
    }
