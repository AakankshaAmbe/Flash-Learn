"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get("topicId");

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlashcards = async () => {
    if (!topicId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/flashcards/${topicId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch flashcards");

      setFlashcards(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [topicId]);

  // 🌀 Loading state
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading flashcards...
      </div>
    );

  // ⚠️ Error state
  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <p className="mb-4">{error}</p>
        <button
          onClick={fetchFlashcards}
          className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition"
        >
          Retry
        </button>
      </div>
    );

  // 🧩 Empty state
  if (!flashcards.length)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <p className="mb-4">No flashcards found for this topic.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-600 transition"
        >
          Go Back
        </button>
      </div>
    );

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-white/70 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-white ml-4">Flashcards</h1>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((fc, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg leading-relaxed">{fc.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
