import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

export default function Card({ title, concept, funFact, index }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 transform transition-all hover:-translate-y-1 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 150}ms` }}>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">
          {index}
        </span>
        {title}
      </h3>
      
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {concept}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-start gap-2 text-sm">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-slate-500 dark:text-slate-400 italic">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Fun Fact: </span>
            {funFact}
          </p>
        </div>
      </div>
    </div>
  );
}
