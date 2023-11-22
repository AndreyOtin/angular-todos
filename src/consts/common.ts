import { TodoStatus } from '../app/services/todos/todos.interface';

export const statusToNameMap: Record<TodoStatus, string> = {
  default: 'Обычные',
  important: 'Важные',
  done: 'Выполненные'
};
export const TODOS_COLUMN_ORDER: TodoStatus[] = ['default', 'important', 'done'];
