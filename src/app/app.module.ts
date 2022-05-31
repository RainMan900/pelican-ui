import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';

import { AppRoutingModule }           from './app-routing.module';
import { AppComponent }                        from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { MatSliderModule }            from "@angular/material/slider";
import { MainMenuComponent }          from './components/main-menu/main-menu.component';
import { MatToolbarModule }           from "@angular/material/toolbar";
import { MatIconModule }              from "@angular/material/icon";
import { MatButtonModule }            from "@angular/material/button";
import { MatMenuModule }              from "@angular/material/menu";
import { SearchTranslationComponent } from './components/search-translation/search-translation.component';
import { MatFormFieldModule }         from "@angular/material/form-field";
import { MatInputModule }             from "@angular/material/input";
import { MatSelectModule }            from "@angular/material/select";
import { ReactiveFormsModule }        from "@angular/forms";
import { MatSnackBarModule }          from "@angular/material/snack-bar";
import { AddTranslationComponent }    from './components/add-translation/add-translation.component';
import { ViewByCountryComponent }     from './components/view-by-country/view-by-country.component';
import { KittSpinnerComponent }       from './components/kitt-spinner/kitt-spinner.component';
import { MatTableModule }    from '@angular/material/table';
import { LoaderInterceptor } from './service/loader-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SearchTranslationComponent,
    AddTranslationComponent,
    ViewByCountryComponent,
    KittSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [KittSpinnerComponent]
})
export class AppModule {
}
