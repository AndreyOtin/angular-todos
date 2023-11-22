import { Injectable } from '@angular/core';
import { ITodo, TodoStatus } from './todos.interface';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: ITodo[] = [
    {
      id: crypto.randomUUID(),
      title: 'Первая задача',
      description: 'Сделать дела',
      status: 'important'
    },
    {
      id: crypto.randomUUID(),
      title: 'Вторая задача',
      description: 'Сделать дела 2',
      status: 'default'
    },
    {
      id: crypto.randomUUID(),
      title: 'Третья задача',
      description: 'Сделать дела 3',
      status: 'done'
    }
  ];

  constructor() {
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  addTodo(todo: Omit<ITodo, 'id'>) {
    this.todos.push({ id: crypto.randomUUID(), ...todo });
  }

  updateTodo(id: string, status: TodoStatus) {
    const todo = this.todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    todo.status = status;
  }
}
