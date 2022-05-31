import { Component, OnInit }       from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupportedLanguages }      from '../../constant/supportedLanguage';
import { PelicanService }          from '../../service/pelican/pelican.service';
import { TranslationAddInfo }      from '../../interface/translation-add-info';
import { MatSnackBar }             from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss'],
})
export class AddTranslationComponent implements OnInit {

  addTranslationForm = this.fb.group({
    key: this.fb.control('', Validators.required),
    language: this.fb.control('', Validators.required),
    translation: this.fb.control('', Validators.required),
  });

  SupportedLanguages = SupportedLanguages;

  constructor(
    private fb: FormBuilder,
    private pelicanService: PelicanService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    const info: TranslationAddInfo = this.addTranslationForm.value;
    this.pelicanService.addTranslation(info.key, info.language, info.translation).subscribe({
      next: () => {
        this.snackBar.open('Success', 'Your translation has been saved');
      }, error: () => {
        this.snackBar.open('Error', 'Your translation could not be saved');
      },
    });
  }

}
