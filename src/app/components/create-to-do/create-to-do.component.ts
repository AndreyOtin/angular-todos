import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo, TodoStatus } from '../../services/todos/todos.interface';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';

type NewTodo = Omit<ITodo, 'id' | 'status'> & { status: TodoStatus & '' };

@Component({
  selector: 'app-create-to-do',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent, InputComponent],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateToDoComponent implements OnInit {
  newTodo: Omit<ITodo, 'id'> = { status: '' } as NewTodo;
  @Output() addNewTodo = new EventEmitter<Omit<ITodo, 'id'>>();

  ngOnInit() {
  }

  handleSubmit() {
    if (Object.values(this.newTodo).length !== 3 || !this.newTodo.status) {
      return;
    }

    this.addNewTodo.emit(this.newTodo);
    this.newTodo = { status: '' } as NewTodo;
  }
}
