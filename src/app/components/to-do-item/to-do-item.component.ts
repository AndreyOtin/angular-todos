import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from '../../services/todos/todos.interface';


@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.scss'
})

export class ToDoItemComponent {
  @Input() todo: ITodo | null = null;
}
