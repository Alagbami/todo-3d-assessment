// src/components/TodoItem.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
import { Todo, useTodoDispatch } from '@/context/TodoProvider';

export default function TodoItem({ t }: { t: Todo }) {
  const dispatch = useTodoDispatch();

  const onToggle = useCallback(() => dispatch({ type: 'toggle', id: t.id }), [dispatch, t.id]);
  const onRemove = useCallback(() => dispatch({ type: 'remove', id: t.id }), [dispatch, t.id]);

  // Memoize formatted date/time for performance
  const { shortDate, shortTime, full } = useMemo(() => {
    const dt = new Date(t.createdAt);
    const shortDate = dt.toLocaleDateString(); // e.g. 9/22/2025
    const shortTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g. 09:30 AM
    const full = dt.toLocaleString(); // full locale string for tooltip
    return { shortDate, shortTime, full };
  }, [t.createdAt]);

  return (
    <li className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-3">
      {/* Left: checkbox + text (allow text to shrink) */}
      <div className="flex items-center gap-3 min-w-0">
        <input
          id={`cb-${t.id}`}
          type="checkbox"
          checked={t.done}
          onChange={onToggle}
          className="h-5 w-5 accent-sky-500 flex-shrink-0"
          aria-label={`Toggle ${t.text}`}
        />

        {/* make this flex item able to shrink and truncate */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <label
            htmlFor={`cb-${t.id}`}
            className={`block select-none truncate ${t.done ? 'line-through text-slate-400' : 'text-slate-800'}`}
            title={t.text} // show full text on hover
          >
            {t.text}
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
        {/* Semantic time element with tooltip */}
        <time
          dateTime={new Date(t.createdAt).toISOString()}
          className="text-xs text-slate-400"
          title={full}
          aria-label={`Created on ${full}`}
        >
          {shortDate} · {shortTime}
        </time>

        <button
          onClick={onRemove}
          className="p-2 rounded-md hover:bg-slate-100"
          aria-label={`Delete ${t.text}`}
          title="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}
