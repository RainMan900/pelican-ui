import { Injectable }                 from '@angular/core';
import { HttpClient }                 from "@angular/common/http";
import { Observable }                 from "rxjs";
import { TranslationResult }          from '../../interface/translation-result';
import { CountryTranslationResponse } from '../../interface/country-translation-response';

@Injectable({
  providedIn: 'root',
})
export class PelicanService {

  constructor(private http: HttpClient) {
  }

  getTranslation(country: string, key: string): Observable<TranslationResult> {
    return this.http.get<TranslationResult>('/api/country/' + country + '/' + key);
  }

  addTranslation(key: string, country: string, translation: string): Observable<void> {
    return this.http.post<void>('/api/country/' + country + '/' + key + '/' + translation, {});
  }

  getAllByLanguage(language: string): Observable<CountryTranslationResponse[]> {
    return this.http.get<CountryTranslationResponse[]>('/api/country/' + language);
  }

}
