import Link from "next/link";

export default function Home() {
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
