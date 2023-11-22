import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../../services/todos/todos.interface';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent, InputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search = '';
  status: TodoStatus | '' = '';
  @Output() findTodo = new EventEmitter<{ title: string; status: TodoStatus | string }>();
  @Output() resetSearch = new EventEmitter();

  handleSubmit() {
    this.findTodo.emit({ title: this.search, status: this.status });
  }

  handleReset() {
    this.resetSearch.emit();
  }
}
