// src/components/TodoList.tsx
'use client';

import React, { useMemo } from 'react';
import { useTodoState } from '@/context/TodoProvider';
import TodoItem from './TodoItem';

export default function TodoList({ query = '', filter = 'all' as 'all' | 'active' | 'done' }) {
  const { todos } = useTodoState();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos
      .filter(t => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done))
      .filter(t => (q ? t.text.toLowerCase().includes(q) : true));
  }, [todos, filter, query]);

  if (visible.length === 0) return <p className="text-center text-sm text-slate-500 py-8">No tasks found — try adding one.</p>;

  return (
    <ul className="space-y-3">
      {visible.map(t => (
        <TodoItem key={t.id} t={t} />
      ))}
    </ul>
  );
}
