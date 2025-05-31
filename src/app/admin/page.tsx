"use client";

import { useState } from "react";

export default function AdminPanel() {
  const [codes, setCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");

  const handleAddCode = () => {
    if (newCode.trim() === "") return;
    setCodes([...codes, newCode.trim()]);
    setNewCode("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🎛️ Admin Panel</h1>

      {/* Section 1: Validation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">✅ Validation</h2>
        <p className="mb-4 text-gray-300">Liste des demandes en attente (à venir avec DB)</p>
        <div className="bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-400">Pas encore connecté à une base de données.</p>
        </div>
      </section>

      {/* Section 2: Création de codes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🔐 Codes secrets</h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Nouveau code..."
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <button
            onClick={handleAddCode}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Créer
          </button>
        </div>

        {codes.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {codes.map((code, i) => (
              <li key={i}>{code}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun code généré.</p>
        )}
      </section>

      {/* Section 3: Docs - à venir */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📄 Docs</h2>
        <p className="text-gray-500">Section en construction...</p>
      </section>
    </div>
  );
}
