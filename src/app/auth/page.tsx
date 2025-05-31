"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Effet lampe torche */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, transparent 100px, rgba(0,0,0,0.85) 200px)`,
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue dans le monde magique
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-md">
          Choisissez une option pour continuer votre aventure :
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/register")}
            className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            Créer un compte
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
