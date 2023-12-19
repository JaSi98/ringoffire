import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'js-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent {
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() password: boolean = false; // Neuer Input für Passwort-Modus
  @Input() formControlName: string;
  @Output() focusEvent = new EventEmitter<void>();
  private innerValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  isInputFocused: boolean = false;
  showPassword: boolean = false; // Zustand zum Umschalten der Sichtbarkeit des Passworts

  onInputFocus() {
    this.isInputFocused = true;
    this.focusEvent.emit();
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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

