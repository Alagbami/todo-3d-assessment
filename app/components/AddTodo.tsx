// src/components/AddTodo.tsx
'use client';

import React, { useState } from 'react';
import { useTodoDispatch } from '@/context/TodoProvider';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useTodoDispatch();

  function onAdd(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: 'add', text: trimmed });
    setText('');
  }

  return (
    <form onSubmit={onAdd} className="flex gap-3">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task (press Enter)"
        aria-label="Add task"
        className="flex-1 rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
      <button
        type="submit"
        onClick={onAdd}
        className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
      >
        Add
      </button>
    </form>
  );
}
