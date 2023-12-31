import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../../services/todos/todos.interface';
import { statusToNameMap } from '../../../consts/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  statuses: TodoStatus[] = ['default', 'important', 'done'];
  @Input() status: TodoStatus | '' = '';
  @Output() statusChange = new EventEmitter<TodoStatus>();
  @Input() title: string = 'Выберите статус';

  transformStatus(status: TodoStatus) {
    return statusToNameMap[status];
  }

  handleChange(status: TodoStatus) {
    this.statusChange.emit(status);
    this.status = status;
  }
}
