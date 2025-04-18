import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <p class="text-sm font-semibold">&copy; Dyma 2025-2026</p>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-gray-700);
      color: white;
      padding: 12px;
    }
  `
})
export class FooterComponent {

}
