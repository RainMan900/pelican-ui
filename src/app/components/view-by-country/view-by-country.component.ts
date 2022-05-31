import { Component, OnInit }                     from '@angular/core';
import { SupportedLanguage, SupportedLanguages } from 'src/app/constant/supportedLanguage';
import { FormControl }                           from '@angular/forms';
import { startWith, Subject, takeUntil }         from 'rxjs';
import { PelicanService }                        from '../../service/pelican/pelican.service';
import { CountryTranslationResponse }            from '../../interface/country-translation-response';

@Component({
  selector: 'app-view-by-country',
  templateUrl: './view-by-country.component.html',
  styleUrls: ['./view-by-country.component.scss']
})
export class ViewByCountryComponent implements OnInit {

  SupportedLanguages = SupportedLanguages;

  selectedLanguage = new FormControl(SupportedLanguage.ESTONIA)
  displayedColumns: string[] = ['key', 'translation'];
  destroy$ = new Subject<boolean>();

  data: CountryTranslationResponse[] = [];

  constructor(
    private pelicanService: PelicanService,
  ) { }

  ngOnInit(): void {
    this.selectedLanguage.valueChanges.pipe(startWith(this.selectedLanguage.value), takeUntil(this.destroy$)).subscribe(lang => {
      this.pelicanService.getAllByLanguage(lang).subscribe(resp => {
        this.data = resp;
      })
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
