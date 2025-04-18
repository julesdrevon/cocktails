import {Component, computed, ElementRef, input, model, output, signal, viewChild} from '@angular/core';
import {Cocktail} from 'app/shared/interfaces';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cocktails-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <h2 class="mb-5">Liste des cocktails</h2>
    <input [(ngModel)]="filter" type="text" class="mb-5 w-full" placeholder="Rechercher un cocktail" #search/>
    <ul class="mb-5">
      @let likedIds = likedCocktailIds();
      @for (cocktail of filteredCocktails(); track cocktail.name) {
        @let active = cocktail._id === selectedCocktailId();
        <li
          [class.active-item]="active"
          (click)="selectedCocktailId.set(cocktail._id)"
          class="px-3 py-1.5 my-0.5 cursor-pointer hover:bg-purple-200 transition-all duration-400 rounded-3xl">
          <div>
            <h3 class="flex justify-between">
              <span>{{ cocktail.name }}</span>
              @if (likedIds.includes(cocktail._id)) {
                <span>&#x2665;&#xfe0f;</span>
              }
            </h3>
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
  `,
  host: {
    '(window:keydown)': 'keyboardInteraction($event)',
  },
})
export class CocktailsListComponent {

  search = viewChild<ElementRef<HTMLInputElement>>('search');
  filter = signal('');
  cocktails = input<Cocktail[]>();
  filteredCocktails = computed(() => this.cocktails()?.filter(({name}) => name.toLowerCase().includes(this.filter().toLowerCase())));
  selectedCocktailId = model<string | null>();

  likedCocktailIds = input.required<string[]>();
  likecocktail = output<string>();
  unlikecocktail = output<string>();

  keyboardInteraction(event: KeyboardEvent) {
    const key = event.key;
    switch (key) {
      case 'Escape': {
        this.selectedCocktailId.set(null);
        break;
      }
      case 'Enter': {
        console.log('Enter key pressed');
        const selectedCocktailId = this.selectedCocktailId();
        if (selectedCocktailId) {
          if ((this.likedCocktailIds() ?? []).includes(selectedCocktailId)) {
            this.unlikecocktail.emit(selectedCocktailId)
          } else {
            this.likecocktail.emit(selectedCocktailId)
          }
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown': {
        event.preventDefault();
        const selectedCocktailId = this.selectedCocktailId();
        const cocktails = this.cocktails();
        if (cocktails?.length) {
          if (selectedCocktailId) {
            const index = cocktails.findIndex(({_id}) => _id === selectedCocktailId);
            if (key === 'ArrowDown') {
              const nextCocktailIndex = index === cocktails.length - 1 ? 0 : index + 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            } else {
              const nextCocktailIndex = index === 0 ? cocktails.length - 1 : index - 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            }
          } else {
            if (key === 'ArrowDown') {
              const {_id} = cocktails[0];
              this.selectedCocktailId.set(_id);
            } else {
              const {_id} = cocktails[cocktails.length - 1];
              this.selectedCocktailId.set(_id);
            }
          }
        }
        break;
      }
      default: {
        this.search()?.nativeElement.focus();
      }
    }
  }

}
