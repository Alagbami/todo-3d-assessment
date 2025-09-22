// src/components/TodoApp.tsx
'use client';

import React, { useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import ThreeWidget from './ThreeWidget';
import { useTodoState } from '@/context/TodoProvider';
import { AnimatePresence } from 'framer-motion';

export default function TodoApp() {
  const { todos } = useTodoState();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  const total = todos.length;
  const completed = todos.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-6">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">To-Do 3D Adeleke Abiodun dapo</h1>
            <p className="text-sm text-slate-500 mt-1">adelekeabiodun1996@gmail.com</p>
            <p className="text-sm text-slate-500 mt-1">+2348144807421</p>
            <p className="text-sm text-slate-500 mt-1">A polished, responsive to-do app with an interactive 3D progress widget.</p>
          </div>

          {/* Desktop progress: visible on md+ */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-sm text-slate-600">Progress</div>
            <div className="w-36 bg-slate-100 rounded-full p-0.5">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-sm text-slate-700 w-12 text-right">{percent}%</div>
          </div>

          {/* Mobile progress: visible on small screens (under header title) */}
          <div className="w-full md:hidden mt-2">
            <label htmlFor="mobile-progress" className="sr-only">Progress</label>
            <div id="mobile-progress" className="flex items-center gap-3">
              <div className="text-sm text-slate-600">Progress</div>
              <div className="flex-1 bg-slate-100 rounded-full p-0.5">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="text-sm text-slate-700 w-12 text-right">{percent}%</div>
            </div>
          </div>
        </header>

        {/* Main: responsive grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary content (spans 2 cols on large screens) */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
            <AddTodo />

            {/* Search + filters */}
            <div className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search - full width on mobile */}
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1 flex-1 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 10 6 6a7.5 7.5 0 0010.65 10.65z" />
                </svg>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search tasks"
                  className="text-sm bg-transparent outline-none w-full"
                  aria-label="Search tasks"
                />
              </div>

              {/* Filters - on small screens they scroll horizontally if overflow */}
              <div className="ml-0 sm:ml-auto flex gap-2 items-center">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
                  <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
                  <FilterButton active={filter === 'done'} onClick={() => setFilter('done')}>Done</FilterButton>
                </div>
              </div>
            </div>

            {/* Todo list */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                <TodoList key={`${query}-${filter}`} query={query} filter={filter} />
              </AnimatePresence>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Progress</h3>
                <div className="text-sm text-slate-500">{percent}%</div>
              </div>

              {/* 3D widget: responsive height */}
              <div className="flex-1 rounded-md overflow-hidden">
                <div className="w-full h-56 md:h-64 lg:h-72">
                  <ThreeWidget percent={percent} />
                </div>
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
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1 rounded-lg whitespace-nowrap ${active ? 'bg-sky-600 text-white shadow' : 'bg-transparent text-slate-700 hover:bg-slate-100'}`}
      aria-pressed={active ? 'true' : 'false'}
    >
      {children}
    </button>
  );
}
