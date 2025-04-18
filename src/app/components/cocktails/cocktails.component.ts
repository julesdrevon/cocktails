import { Component, signal, computed } from '@angular/core';
import {CocktailsListComponent} from './components/cocktails-list.component';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {Cocktail} from 'app/shared/interfaces';
import {cocktails} from 'app/shared/data';

@Component({
  selector: 'app-cocktails',
  imports: [
    CocktailsListComponent,
    CocktailDetailsComponent
  ],
  template: `
    <app-cocktails-list (selectCocktail)="selectCocktail($event)" [selectedCocktailName]="selectedCocktailName()" [cocktails]="cocktails()" class="md:w-1/2 card"/>
    <app-cocktail-details [cocktail]="selectedCocktail()" class="md:w-1/2 card"/>
  `,
  styles: `
    :host {
      display: flex;
      gap: 24px;
      padding: 24px;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }
  `
})
export class CocktailsComponent {
  cocktails = signal<Cocktail[]>(cocktails);
  selectedCocktail = signal<Cocktail>(this.cocktails()[0]);
  selectedCocktailName = computed(() => this.selectedCocktail().name);
  selectCocktail(cocktailName: string) {
    const newCocktail = this.cocktails().find(({ name }) => name === cocktailName);
    if (newCocktail) {
      this.selectedCocktail.set(newCocktail);
    }
  };

}
