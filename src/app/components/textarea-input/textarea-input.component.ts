import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'js-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputComponent),
      multi: true,
    },
  ],
})
export class TextareaInputComponent {
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() formControlName: string;
  private innerValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  isInputFocused: boolean = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  // Implementieren Sie die writeValue-Methode, um den Wert des Steuerelements festzulegen
  writeValue(value: any): void {
    this.innerValue = value;
  }

  // Implementieren Sie die registerOnChange-Methode, um Änderungen am Wert zu überwachen
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Implementieren Sie die registerOnTouched-Methode, um festzulegen, dass das Steuerelement berührt wurde
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Schreiben Sie eine Methode, um den Wert zu aktualisieren und die onChange-Funktion aufzurufen
  updateValue(newValue: any): void {
    this.innerValue = newValue;
    this.onChange(newValue);
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }
}
