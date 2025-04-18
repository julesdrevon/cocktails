import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  imports: [],
  template: `
    <button (click)="toggleMenu()" class="p-4 text-2xl cursor-pointer">&Congruent;</button>
    @if (show()) {
      <ul class="flex flex-col gap-5 absolute right-3 top-16 border rounded-3xl border-gray-100 text-text bg-white p-3">
        @for (link of navigations; track $index) {
          <li (click)="show.set(false)" class="hover:bg-gray-100 rounded-3xl p-2 cursor-pointer">
            <a [href]="link.path">{{ link.name }}</a>
          </li>
        }
      </ul>
    }
  `,
  styles: ``
})
export class HeaderMenuComponent {
  show = signal(false)

  navigations = [
    {
      path: '#',
      name: 'Liste des cocktails',
    },
    {
      path: '#',
      name: 'Panier',
    }
  ]

  toggleMenu() {
    this.show.update((s) => !s);
  }
}
