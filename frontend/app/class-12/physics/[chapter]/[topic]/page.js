"use client";

import DynamicTopicPage from "@/components/DynamicTopicPage";
import Quiz from "@/components/Quiz";

export default function Page({ params }) {
  const { subject, topic } = params; // from route params
  const classLevel = "11";

  return (
    <div>
      {/* Topic Details */}
      <DynamicTopicPage classLevel={classLevel} subject={subject} />

      {/* Quiz Section */}
      <div className="mt-12">
        <h2 className="text-3xl text-white font-bold mb-4 text-center">
          Quiz on {topic.replace(/-/g, " ")}
        </h2>
        <Quiz classLevel={classLevel} subject={subject} topic={topic} />
      </div>
    </div>
  );
}
