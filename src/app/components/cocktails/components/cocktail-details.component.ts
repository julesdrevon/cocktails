import { Component, input } from '@angular/core';
import {Cocktail} from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    @let c = cocktail();
    <div>
      <img class="mb-5 rounded-2xl max-h-80" [src]="c.imageUrl" alt=""/>
    </div>
    <h3 class="mb-5">{{ c.name }}</h3>
    <p class="mb-5">{{ c.description }}</p>
    <ul class="mb-5 list-disc list-inside text-[14px] font-semibold">
      @for (ingredient of c.ingredients; track $index) {
        <li class="my-0.5">{{ingredient}}</li>
      }
    </ul>
    <div><button class="btn btn-primary">Ajouter cocktail</button></div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }
  `
})
export class CocktailDetailsComponent {
  cocktail = input.required<Cocktail>();
}
