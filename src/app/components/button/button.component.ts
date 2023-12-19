import { Component, Input } from '@angular/core';

@Component({
  selector: 'js-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() icon?: string;
  @Input() color: string = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false; // Neue Eigenschaft für den Ladezustand

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
