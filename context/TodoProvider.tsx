// src/context/TodoProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type Todo = { id: string; text: string; done: boolean; createdAt: number };

type State = { todos: Todo[] };

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'hydrate'; todos: Todo[] };

const initialState: State = { todos: [] };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const todo: Todo = { id: crypto.randomUUID(), text: action.text, done: false, createdAt: Date.now() };
      return { todos: [todo, ...state.todos] };
    }
    case 'toggle':
      return { todos: state.todos.map(t => (t.id === action.id ? { ...t, done: !t.done } : t)) };
    case 'remove':
      return { todos: state.todos.filter(t => t.id !== action.id) };
    case 'hydrate':
      return { todos: action.todos };
    default:
      return state;
  }
}

const TodoStateContext = createContext<State | undefined>(undefined);
const TodoDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export default function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('todo-app.v1');
      if (raw) {
        const todos = JSON.parse(raw) as Todo[];
        dispatch({ type: 'hydrate', todos });
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem('todo-app.v1', JSON.stringify(state.todos));
    } catch {}
  }, [state.todos]);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>{children}</TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
}

export const useTodoState = () => {
  const ctx = useContext(TodoStateContext);
  if (!ctx) throw new Error('useTodoState must be used within TodoProvider');
  return ctx;
};

export const useTodoDispatch = () => {
  const ctx = useContext(TodoDispatchContext);
  if (!ctx) throw new Error('useTodoDispatch must be used within TodoProvider');
  return ctx;
};
