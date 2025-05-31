"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa"; // ✅ Changement ici

export default function HomeHero() {
  const [view, setView] = useState<"intro" | "after">("intro");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y });
  };

  const handleMouseEnterText = () => {
    if (triggerAnimation) return;
    setTriggerAnimation(true);
    setTimeout(() => {
      setView((prev) => (prev === "intro" ? "after" : "intro"));
      setTriggerAnimation(false);
    }, 800);
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

      {/* Animation magique */}
      {triggerAnimation && (
        <div
          className="pointer-events-none absolute top-0 left-0 w-full h-full z-30"
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            animation: "sparkle 0.7s ease-out forwards",
          }}
        />
      )}

      {/* Contenu centré */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatePresence mode="wait">
          {view === "intro" ? (
            <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cursor-pointer flex flex-col items-center"
            onMouseEnter={handleMouseEnterText}
          >
            <motion.h1
              className="text-white text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Bienvenue en Histoire De la Magie
            </motion.h1>
            <p className="text-gray-200 text-lg mb-6 text-center">
              Explore la magie de l’histoire de LBDS
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-3 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-xl transition-all"
              onClick={() => window.location.href = "/api/auth/discord"}
            >
              <FaDiscord className="w-5 h-5 text-white animate-pulse" />
              Se connecter avec Discord
              <span className="absolute left-0 top-0 w-full h-full animate-ping opacity-10 bg-white rounded-full blur-md" />
            </motion.button>
          </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cursor-pointer max-w-2xl"
              onMouseEnter={handleMouseEnterText}
            >
              <motion.h1
                className="text-white text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Découvre les avantages ✨
              </motion.h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/avantages")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all"
              >
                Voir les avantages
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animation sparkle */}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(4);
          }
        }
      `}</style>
    </div>
  );
}
