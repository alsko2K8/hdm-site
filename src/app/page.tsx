"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suivi de la souris pour effet de lumière
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const lightX = useTransform(mouseX, (v) => `${v}px`);
  const lightY = useTransform(mouseY, (v) => `${v}px`);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2c2c2c] text-white overflow-hidden">
      {/* Effet de lumière */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-3xl"
        style={{ left: lightX, top: lightY }}
      />

      {/* Parallax Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-[url('/parchment-texture.jpg')] opacity-10 bg-cover bg-center"
        aria-hidden="true"
      ></div>

      {/* Contenu principal */}
      <main className="relative z-10 px-6 pt-32 pb-16 max-w-5xl mx-auto text-center">
        {/* Titre animé */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-yellow-200 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bienvenue à MagiCours
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-zinc-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Votre bibliothèque magique pour gérer vos cours, examens et feuilles de suivi dans l'univers RP de Harry Potter.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
            Se connecter avec Discord
          </Button>
          <Button variant="outline">Explorer le Drive</Button>
        </motion.div>
      </main>

      {/* Illustration flottante (animée au scroll) */}
      <motion.img
        src="/magic-book.png"
        alt="Livre magique"
        className="absolute bottom-0 right-0 w-64 opacity-90"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, type: "spring" }}
      />
    </div>
  );
}
