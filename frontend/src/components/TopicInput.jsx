import React from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function TopicInput({ topic, setTopic, onGenerate, isGenerating }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !isGenerating) {
      onGenerate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex gap-2">
      <input
        type="text"
        placeholder="Enter a learning topic (e.g., Quantum Physics)..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={isGenerating}
      />
      <button
        type="submit"
        disabled={!topic.trim() || isGenerating}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
      >
        {isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
        Generate
      </button>
    </form>
  );
}
