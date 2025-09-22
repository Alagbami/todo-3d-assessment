// app/page.tsx
import TodoProvider from '@/context/TodoProvider';
import TodoApp from './components/TodoApp';

export default function Page() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
