import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup }       from "@angular/forms";
import { PelicanService }         from "../../service/pelican/pelican.service";
import { MatSnackBar }            from "@angular/material/snack-bar";
import { TranslationResult }      from '../../interface/translation-result';
import { Subject, takeUntil }     from 'rxjs';
import { SupportedLanguages }     from '../../constant/supportedLanguage';

@Component({
  selector: 'app-search-translation',
  templateUrl: './search-translation.component.html',
  styleUrls: ['./search-translation.component.scss'],
})
export class SearchTranslationComponent implements OnInit, OnDestroy {

  key: FormControl = new FormControl('Hello');
  selectedLanguage = new FormControl('Lithuania');
  form: FormGroup = new FormGroup({
    key: this.key,
    selectedLanguage: this.selectedLanguage,
  });

  SupportedLanguages = SupportedLanguages;
  result?: TranslationResult;
  destroy$ = new Subject<boolean>();

  constructor(
    private pelicanService: PelicanService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.result = undefined;
    });
  }

  submitForm(): void {
    this.result = undefined;
    this.pelicanService.getTranslation(this.selectedLanguage.value, this.key.value).pipe().subscribe(resp => {
      if (resp.errors?.length) {
        resp.errors.forEach(err => this.openSnackBar('Error', err));
      } else {
        this.result = resp;
      }
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        politeness: 'assertive',
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
