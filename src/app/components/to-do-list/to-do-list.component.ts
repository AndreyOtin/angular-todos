import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoItemComponent } from '../to-do-item/to-do-item.component';
import { TodosService } from '../../services/todos/todos.service';
import { ITodo, TodoStatus } from '../../services/todos/todos.interface';
import { CreateToDoComponent } from '../create-to-do/create-to-do.component';
import { statusToNameMap, TODOS_COLUMN_ORDER } from '../../../consts/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule, ToDoItemComponent, CreateToDoComponent, SearchComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent {
  todoEntries: [TodoStatus, ITodo[]][];
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  constructor(private todoService: TodosService) {
    this.todoEntries = this.transformTodos(this.todoService.todos);
  }

  trackTodos(_: number, item: ITodo) {
    return item.id;
  }

  trackEntries(_: number, item: [TodoStatus, ITodo[]]) {
    return item[0];
  }

  transformStatus(status: TodoStatus) {
    return statusToNameMap[status];
  }

  changeTodoStatus({ status, id }: { status: TodoStatus, id: string }) {
    this.todoService.updateTodo(id, status);
    this.todoEntries = this.transformTodos(this.todoService.todos);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.searchComponent.handleReset();
  }

  resetSearch() {
    this.todoEntries = this.transformTodos(this.todoService.todos);
  }

  addNewTodo(todo: Omit<ITodo, 'id'>) {
    this.todoService.addTodo(todo);
    this.searchComponent.handleReset();
  }

  filterTodos({ status, title }: { title: string, status: TodoStatus | '' }) {
    const todos = this.todoService.todos.filter(t => {
      if (status && title) {
        return status === t.status && t.title.toLowerCase().includes(title.toLowerCase());
      }

      if (title) {
        return t.title.toLowerCase().includes(title.toLowerCase());
      }

      if (status) {
        return status === t.status;
      }

      return true;
    });

    this.todoEntries = this.transformTodos(todos);
  }

  private transformTodos(todos: ITodo[]) {
    const todoEntries = Object.entries(todos.reduce((acc, item) => {
      if (acc[item.status]) {
        acc[item.status].push(item);
      } else {
        acc[item.status] = [item];
      }

      return acc;
    }, {} as Record<TodoStatus, ITodo[]>)) as [TodoStatus, ITodo[]][];

    todoEntries.sort((a, b) => TODOS_COLUMN_ORDER.indexOf(a[0]) - TODOS_COLUMN_ORDER.indexOf(b[0]));

    return todoEntries;
  }
}
