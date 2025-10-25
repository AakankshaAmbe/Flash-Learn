"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Eye, Brain } from "lucide-react";

export default function DynamicTopicPage({ classLevel, subject }) {
  const { chapter, topic } = useParams();
  const router = useRouter();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert slug back to topic_name
  const slugToName = (slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formattedTopicName = slugToName(topic);

  // Normalize string
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const fetchTopic = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/topics?class_level=${classLevel}&subject=${subject}`
      );
      if (!res.ok) throw new Error("Failed to fetch topics from server");
      const json = await res.json();

      // Find topic
      const found = json.find(
        (t) => normalize(t.topic_name) === normalize(formattedTopicName)
      );
      if (!found) throw new Error("Topic not found");
      setTopicData(found);
    } catch (err) {
      console.error("Error fetching topic:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [formattedTopicName, classLevel, subject]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <p className="mb-4">{error}</p>
        <div className="flex gap-4">
          <Link href={`/class-${classLevel}/${subject}/syllabus`}>
            <button className="px-4 py-2 bg-cyan-500 rounded-md">Go Back</button>
          </Link>
          <button
            onClick={fetchTopic}
            className="px-4 py-2 bg-green-500 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10"
      >
        <div className="flex items-center gap-4">
          <Link
            href={`/class-${classLevel}/${subject}/syllabus`}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{topicData.topic_name}</h1>
            <p className="text-white/70">
              Class {classLevel}{" "}
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </p>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="flex h-[calc(100vh-100px)]">
        {/* Left Panel */}
        <motion.div className="w-[70%] p-6 overflow-y-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              {topicData.topic_name}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {topicData.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-teal-500/20 rounded-xl p-4 border border-teal-400/30">
                <h3 className="text-teal-300 font-semibold mb-2">Key Concepts</h3>
                <ul className="text-white/80 space-y-1 text-sm">
                  {(topicData.key_concepts || []).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                <h3 className="text-blue-300 font-semibold mb-2">
                  Learning Outcomes
                </h3>
                <ul className="text-white/80 space-y-1 text-sm">
                  {(topicData.learning_outcomes || []).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div className="w-[30%] p-6 border-l border-white/10">
          <h3 className="text-white font-semibold mb-6 text-lg">Learning Tools</h3>
          <div className="space-y-4">
            {/* Flashcards Button */}
            <button
              onClick={() =>
                router.push(
                  `/class-${classLevel}/${subject}/flashcards?topicId=${topicData.id}`
                )
              }
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-2xl flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />Flashcards
            </button>

            {/* Quiz Button */}
            <button
              onClick={() =>
                router.push(
                  `/class-${classLevel}/${subject}/${topic}/quiz?topicId=${topicData.id}`
                )
              }
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-2xl flex items-center gap-3"
            >
              <Brain className="w-5 h-5" />Quiz
            </button>

            {/* 3D Model Button */}
            <button
              onClick={() =>
                router.push(
                  `/class-${classLevel}/${subject}/3d_model?topicId=${topicData.id}`
                )
              }
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-2xl flex items-center gap-3"
            >
              <Eye className="w-5 h-5" />MindMaps
            </button>

            {/* Quick Stats */}
            <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <h4 className="text-white/90 font-medium mb-2">Quick Stats</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{topicData.duration || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="text-yellow-400">
                    {topicData.difficulty || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span className="text-teal-400">
                    {topicData.progress || "0"}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
