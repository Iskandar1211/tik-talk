import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-cusotom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cusotom-input.component.html',
  styleUrl: './cusotom-input.component.scss',
})
export class CusotomInputComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) placeholder!: string;
  @Input() type?: 'text' | 'password';
  @Input({required: true}) formControlName!: string;
  @Input() value?: string | number | boolean;
  @Input() mode?: 'input' | 'textarea' = 'input'

  ngOnInit(): void {
    console.log("value", this.value);
  }
}
