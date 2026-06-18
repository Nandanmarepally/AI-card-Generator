import React from 'react';

export default function Toggle({ mode, setMode }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium transition-colors ${mode === 'Success Mode' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Success</span>
      <button
        onClick={() => setMode(mode === 'Success Mode' ? 'Failure Mode' : 'Success Mode')}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${mode === 'Failure Mode' ? 'bg-red-500' : 'bg-emerald-500'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mode === 'Failure Mode' ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${mode === 'Failure Mode' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Failure</span>
    </div>
  );
}
