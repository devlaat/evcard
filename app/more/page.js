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
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);

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
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* 💖 Love Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 opacity-70 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 15}px`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Fondo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/campo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.55)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* Header */}
        <h1 className="mt-12 text-center text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl tracking-wider">
          💖 Feliz 14 de Febrero 💖
        </h1>
        <p className="mt-4 text-white text-lg opacity-90 italic">
          Un detalle hecho con cariño, música y recuerdos ✨
        </p>

        {/* Player */}
        <div className="mt-10 w-full max-w-xl backdrop-blur-xl bg-white/20 rounded-3xl p-6 shadow-2xl">
          <p className="text-center text-white text-xl mb-4 font-semibold">
            🎵 Sonando ahora:
            <br />
            <span className="italic">{playlist[currentSong].name}</span>
          </p>

          <audio
            ref={audioRef}
            src={playlist[currentSong].file}
            autoPlay
            controls
            muted={muted}
            onEnded={handleEnded}
            className="w-full rounded-xl mb-6"
          />

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() =>
                setCurrentSong((currentSong - 1 + playlist.length) % playlist.length)
              }
              className="btn-primary"
            >
              ⏮
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className="btn-secondary"
            >
              {muted ? "🔊" : "🔇"}
            </button>

            <button
              onClick={() => setCurrentSong((currentSong + 1) % playlist.length)}
              className="btn-primary"
            >
              ⏭
            </button>
          </div>

          <ul className="space-y-2">
            {playlist.map((song, index) => (
              <li
                key={index}
                onClick={() => setCurrentSong(index)}
                className={`cursor-pointer text-center py-2 rounded-lg transition ${
                  index === currentSong
                    ? "bg-pink-600 text-white font-bold"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {index === currentSong ? "▶ " : ""} {song.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Mensaje PRO */}
        <div className="mt-12 max-w-2xl backdrop-blur-xl bg-white/20 rounded-3xl p-8 shadow-2xl">
          <p className="text-white text-lg leading-relaxed text-center italic">
            Hay personas que no necesitan fechas para ser especiales…  
            pero hoy es la excusa perfecta para recordarte lo increíble que eres 💖  
            <br /><br />
            Gracias por existir, por las risas, los silencios cómodos  
            y por hacer que lo simple se sienta extraordinario ✨
          </p>
        </div>

        {/* Carrusel */}
        <div className="mt-12 w-full max-w-2xl">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Slider {...settings}>
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="h-[500px]">
                  <Image
                    src={`/images/photo${i}.jpg`}
                    alt={`Recuerdo ${i}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Botón */}
        <Link
          href="/"
          className="mt-12 mb-10 px-8 py-3 rounded-full bg-pink-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          Volver al inicio 💫
        </Link>

        {/* Footer */}
        <footer className="w-full text-center py-4 bg-black/60 text-white">
          Hecho con 💖 por <span className="font-bold">devLAAT 🚀</span>
        </footer>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        .animate-float {
          animation: floatUp linear infinite;
        }
        @keyframes floatUp {
          from {
            transform: translateY(110vh);
            opacity: 0;
          }
          to {
            transform: translateY(-10vh);
            opacity: 1;
          }
        }
        .btn-primary {
          padding: 12px 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ec4899, #db2777);
          color: white;
          font-size: 20px;
          box-shadow: 0 10px 25px rgba(236,72,153,.5);
          transition: transform .2s;
        }
        .btn-primary:hover {
          transform: scale(1.1);
        }
        .btn-secondary {
          padding: 12px 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
          }
