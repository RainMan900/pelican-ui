import { AfterViewInit, Component } from '@angular/core';
import { HttpLoaderService }                   from './service/http-loader/http-loader.service';
import { SpinnerService }                      from './service/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit  {

  title = 'pelican-ui';

  constructor(
    private loaderService: HttpLoaderService,
    private spinnerService: SpinnerService,
  ) {
  }

  ngAfterViewInit(): void {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.spinnerService.show();
      } else {
        this.spinnerService.hide();
      }
    });
  }


}
