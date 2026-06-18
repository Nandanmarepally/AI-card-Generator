import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ message = 'Generating learning cards...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400 gap-4 animate-in fade-in duration-300">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="font-medium">{message}</p>
    </div>
  );
}
