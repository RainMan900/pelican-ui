import { Component, OnInit }  from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { SpinnerService }     from "../../service/spinner/spinner.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  showSpinner = true;
  spinnerInterval?: number;
  showSpinnerForTime = 5000;
  destroy$ = new Subject<void>();

  constructor(
    private spinnerService: SpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.showSpinnerAndClearAfterTime();
    this.spinnerService.getSpinnerObs().pipe(takeUntil(this.destroy$)).subscribe(show => {
      if (show) {
        this.showSpinnerAndClearAfterTime();
      } else {
        this.hideSpinner();
      }
    });
  }

  showSpinnerAndClearAfterTime(): void {
    this.showSpinner = true;
    this.spinnerInterval = setTimeout(() => {
      this.showSpinner = false;
    }, this.showSpinnerForTime);
  }

  hideSpinner(): void {
    this.showSpinner = false;
  }

}
