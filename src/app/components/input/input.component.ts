import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) title: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  handleChange(text: string) {
    this.valueChange.emit(text);
    this.value = text;
  }
}
