// src/components/TodoApp.tsx
'use client';

import React, { useMemo, useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import ThreeWidget from './ThreeWidget';
import { useTodoState } from '@/context/TodoProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoApp() {
  const { todos } = useTodoState();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  const total = todos.length;
  const completed = todos.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Pass query + filter to TodoList
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">To-Do 3D</h1>
            <p className="text-sm text-slate-500 mt-1">A polished responsive to-do app with interactive 3D progress.</p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="text-sm text-slate-600">Progress</div>
            <div className="w-36 bg-slate-100 rounded-full p-0.5">
              <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500" style={{ width: `${percent}%` }} />
            </div>
            <div className="text-sm text-slate-700 w-12 text-right">{percent}%</div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <AddTodo />
            <div className="flex items-center gap-3 mt-4 mb-4">
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 10 6 6a7.5 7.5 0 0010.65 10.65z" />
                </svg>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks" className="text-sm bg-transparent outline-none" />
              </div>

              <div className="ml-auto flex items-center gap-2">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
                <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
                <FilterButton active={filter === 'done'} onClick={() => setFilter('done')}>Done</FilterButton>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                <TodoList key={`${query}-${filter}`} query={query} filter={filter} />
              </AnimatePresence>
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-4 shadow-lg flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Progress</h3>
                <div className="text-sm text-slate-500">{percent}%</div>
              </div>

              <div className="flex-1 rounded-md overflow-hidden">
                <ThreeWidget percent={percent} />
              </div>

              <div className="mt-3 text-sm text-slate-500">Complete tasks to light more stars.</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h4 className="text-sm font-medium mb-2">Tips to impress</h4>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                <li>Keep core functionality accessible without WebGL.</li>
                <li>Persist state to localStorage so data survives reloads.</li>
                <li>Include tests and a clear README describing trade-offs.</li>
              </ul>
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-center text-xs text-slate-400">Made with ♥ for your assessment — present this during your demo.</footer>
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`text-sm px-3 py-1 rounded-lg ${active ? 'bg-sky-600 text-white shadow' : 'bg-transparent text-slate-700 hover:bg-slate-100'}`}>
      {children}
    </button>
  );
}
