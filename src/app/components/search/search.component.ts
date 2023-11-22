import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../../services/todos/todos.interface';
import { statusToNameMap } from '../../../consts/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  statuses: TodoStatus[] = ['default', 'important', 'done'];
  search = '';
  status = '';
  @Output() findTodo = new EventEmitter<{ title: string; status: TodoStatus | string }>();
  @Output() resetSearch = new EventEmitter();

  handleSubmit() {
    this.findTodo.emit({ title: this.search, status: this.status });
  }

  handleReset() {
    this.resetSearch.emit();
  }

  transformStatus(status: TodoStatus) {
    return statusToNameMap[status];
  }
}
