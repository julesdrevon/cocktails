import {Component, input, output, signal, computed} from '@angular/core';
import {Cocktail} from 'app/shared/interfaces';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cocktails-list',
  imports: [
    FormsModule
  ],
  template: `
    <h2 class="mb-5">Liste des cocktails</h2>
    <input [(ngModel)]="filter" type="text" class="mb-5 w-full" placeholder="Rechercher un cocktail"/>
    <ul class="mb-5">
      @for (cocktail of filteredCocktails(); track cocktail.name) {
        <li [class.active-item]="cocktail.name === selectedCocktailName()" (click)="selectCocktail.emit(cocktail.name)" class="px-3 py-1.5 my-0.5 cursor-pointer hover:bg-purple-200 transition-all duration-400 rounded-3xl">
          <div>
            <h3>{{ cocktail.name }}</h3>
          </div>
        </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `
    :host {
      font-weight: 800;
    }
  `
})
export class CocktailsListComponent {
  filter = signal('');
  cocktails = input<Cocktail[]>();
  filteredCocktails = computed(() => this.cocktails()?.filter (({name}) => name.toLowerCase().includes(this.filter().toLowerCase())));
  selectedCocktailName = input.required();
  selectCocktail = output<string>();
}
