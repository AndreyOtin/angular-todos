import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo, TodoStatus } from '../../services/todos/todos.interface';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.scss'
})

export class ToDoItemComponent {
  @Input() todo: ITodo | null = null;
  status: TodoStatus | '' = '';
  @Output() changeStatus = new EventEmitter<{ id: string, status: TodoStatus }>();
  @Output() deleteTodo = new EventEmitter<string>();

  handleStatusChange(status: TodoStatus) {
    this.changeStatus.emit({ status, id: this.todo?.id || '' });
  }

  handleDeleteClick() {
    this.deleteTodo.emit(this.todo?.id || '');
  }
}
