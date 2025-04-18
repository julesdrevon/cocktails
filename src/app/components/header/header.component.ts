import { Component } from '@angular/core';
import {HeaderMenuComponent} from './components/header-menu.component';

@Component({
  selector: 'app-header',
  imports: [
    HeaderMenuComponent
  ],
  template: `
    <div class="flex-auto font-bold text-lg">Cocktails</div>
    <ul class="hidden md:flex flex-row gap-16">
      <li>
        <a href="#">Liste des cocktails</a>
      </li>
      <li>
        <a href="#">Panier</a>
      </li>
    </ul>
    <app-header-menu class="md:hidden"/>
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--primary);
      color: white;
      height: 56px;
      padding: 0 16px;
    }
  `
})
export class HeaderComponent {

}
