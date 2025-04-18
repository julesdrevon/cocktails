import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {CocktailsComponent} from './components/cocktails/cocktails.component';
import {FooterComponent} from './components/footer.component';
// import {seedData} from './shared/data/seed';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CocktailsComponent,
    FooterComponent
  ],
  template: `
    <app-header/>
    <app-cocktails class="flex-auto"/>
    <app-footer/>
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `
})
export class AppComponent {

}
