import {Component, computed, inject, signal} from '@angular/core';
import {CocktailDetailsComponent} from './components/cocktail-details.component';
import {CocktailsService} from '../../shared/service/cocktails.service';
import {CartService} from '../../shared/service/cart.service';
import {CocktailsListComponent} from './components/cocktails-list.component';

@Component({
  selector: 'app-cocktails',
  imports: [
    CocktailsListComponent,
    CocktailDetailsComponent
  ],
  template: `
    <app-cocktails-list
      [(selectedCocktailId)]="selectedCocktailId"
      [likedCocktailIds]="likedCocktailIds()"
      (likecocktail)="likeCocktail($event)"
      (unlikecocktail)="unlikeCocktail($event)"
      [cocktails]="cocktails()"
      class="md:w-1/2 card"/>
    @let sc = selectedCocktail();
    @if (sc) {
      <app-cocktail-details
        (likecocktail)="likeCocktail($event)"
        (unlikecocktail)="unlikeCocktail($event)"
        [cocktail]="sc"
        [isLiked]="selectedCocktailLiked()"
        class="md:w-1/2 card"/>
    }
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
  cocktailsService = inject(CocktailsService);
  cartService = inject(CartService);

  cocktails = computed(
    () => this.cocktailsService.cocktailsResource.value() || []
  );

  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );
  selectedCocktailLiked = computed(() => {
    const selectedCocktailId = this.selectedCocktailId();
    return selectedCocktailId
      ? this.likedCocktailIds().includes(selectedCocktailId)
      : false;
  });

  likedCocktailIds = computed(() => this.cartService.likedCocktailIds());
  likeCocktail(cocktailId: string) {
    this.cartService.likeCocktail(cocktailId);
  }
  unlikeCocktail(cocktailId: string) {
    this.cartService.unlikeCocktail(cocktailId);
  }
}
