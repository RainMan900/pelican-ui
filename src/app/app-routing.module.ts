import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { SearchTranslationComponent } from "./components/search-translation/search-translation.component";
import { AddTranslationComponent }    from "./components/add-translation/add-translation.component";
import { ViewByCountryComponent }     from './components/view-by-country/view-by-country.component';

const routes: Routes = [
  { path: 'search', component: SearchTranslationComponent },
  { path: 'add', component: AddTranslationComponent },
  { path: 'view', component: ViewByCountryComponent },
  { path: '', pathMatch: 'full', redirectTo: 'search' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
