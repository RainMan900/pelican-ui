import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup }       from "@angular/forms";
import { PelicanService }         from "../../service/pelican/pelican.service";
import { MatSnackBar }            from "@angular/material/snack-bar";
import { SpinnerService }         from "../../service/spinner/spinner.service";
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
    private spinner: SpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.result = undefined;
    });
  }

  submitForm(): void {
    console.log(this.form.value);
    this.result = undefined;
    this.spinner.showSpinner();
    this.pelicanService.getTranslation(this.selectedLanguage.value, this.key.value).pipe().subscribe(resp => {

      // TODO intentionally delay to see spinner, remove later
      setTimeout(() => {
        if (resp.errors?.length) {
          resp.errors.forEach(err => this.openSnackBar('Error', err));
        } else {
          this.result = resp;
        }
        this.spinner.hideSpinner();
      }, 2000);

      // if (resp.errors?.length) {
      //   resp.errors.forEach(err => this.openSnackBar('Error', err));
      // } else {
      //   this.result = resp;
      // }
      // this.spinner.hideSpinner();
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
