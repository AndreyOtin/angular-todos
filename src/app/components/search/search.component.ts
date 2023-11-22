import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input() search = '';
  @Input() status: TodoStatus | '' = '';
  @Output() findTodo = new EventEmitter<{ title: string; status: TodoStatus | '' }>();
  @Output() resetSearch = new EventEmitter();

  handleSubmit() {
    this.findTodo.emit({ title: this.search, status: this.status });
  }

  handleReset() {
    this.resetSearch.emit();
    this.search = '';
    this.status = '';
  }
}
