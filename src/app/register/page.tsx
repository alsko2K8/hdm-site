"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const houses = {
  gryffondor: {
    color: "from-red-600 to-yellow-400",
    border: "border-red-600",
    glow: "shadow-[0_0_30px_rgba(220,38,38,0.6)]",
    label: "Gryffondor",
  },
  serpentard: {
    color: "from-green-600 to-gray-500",
    border: "border-green-600",
    glow: "shadow-[0_0_30px_rgba(22,163,74,0.6)]",
    label: "Serpentard",
  },
  serdaigle: {
    color: "from-blue-600 to-slate-400",
    border: "border-blue-600",
    glow: "shadow-[0_0_30px_rgba(37,99,235,0.6)]",
    label: "Serdaigle",
  },
  poufsouffle: {
    color: "from-yellow-400 to-neutral-600",
    border: "border-yellow-500",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.6)]",
    label: "Poufsouffle",
  },
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    discord: "",
    firstName: "",
    lastName: "",
    house: "gryffondor",
    year: "1",
    code: "",
  });

  const houseStyles = houses[form.house];
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
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
      className="relative w-full h-screen overflow-hidden text-white"
    >
      {/* Vidéo magique de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Effet lampe torche dynamique */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, transparent 100px, rgba(0,0,0,0.85) 250px)`,
        }}
      />

      {/* Formulaire centré */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${houseStyles.color} p-10 rounded-xl ${houseStyles.glow} w-full max-w-lg backdrop-blur-md border-2 ${houseStyles.border}`}
        >
          <h1 className="text-3xl font-bold mb-6">Inscription</h1>
          {step === 1 ? (
            <>
              <input
                type="text"
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full mb-4 p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="w-full mb-4 p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Pseudo Discord"
                value={form.discord}
                onChange={(e) => setForm({ ...form, discord: e.target.value })}
                className="w-full mb-4 p-2 rounded text-black"
              />
              <select
                value={form.house}
                onChange={(e) => setForm({ ...form, house: e.target.value })}
                className="w-full mb-4 p-2 rounded text-black"
              >
                {Object.entries(houses).map(([key, house]) => (
                  <option key={key} value={key}>
                    {house.label}
                  </option>
                ))}
              </select>
              <select
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full mb-4 p-2 rounded text-black"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                  <option key={year} value={year}>
                    Année {year}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setStep(2)}
                className="bg-black text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-black border border-white transition-all"
              >
                Continuer
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Code secret fourni par l'admin"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full mb-6 p-2 rounded text-black"
              />
              <button
                onClick={() => alert("Inscription envoyée !")}
                className="bg-black text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-black border border-white transition-all"
              >
                S'inscrire
              </button>
              <button
                onClick={() => setStep(1)}
                className="mt-4 text-sm underline text-white"
              >
                Retour
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
