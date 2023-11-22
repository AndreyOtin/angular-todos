import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo, TodoStatus } from '../../services/todos/todos.interface';
import { statusToNameMap } from '../../../consts/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-to-do',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.scss'
})
export class CreateToDoComponent implements OnInit {
  statuses: TodoStatus[] = ['default', 'important', 'done'];
  newTodo: Omit<ITodo, 'id'> = {} as Omit<ITodo, 'id'>;
  @Output() addNewTodo = new EventEmitter<Omit<ITodo, 'id'>>();

  ngOnInit() {
  }

  transformStatus(status: TodoStatus) {
    return statusToNameMap[status];
  }

  handleSubmit() {
    if (Object.values(this.newTodo).length !== 3) {
      return;
    }

    this.addNewTodo.emit(this.newTodo);
    this.newTodo = {} as Omit<ITodo, 'id'>;
  }
}
