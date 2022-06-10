import { Component, OnInit }     from '@angular/core';
import { SpinnerService }        from "../../service/spinner/spinner.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  spinnerInterval?: number;

  constructor(
    private spinnerService: SpinnerService,
  ) {
  }

  ngOnInit(): void {
  }

  showSpinnerExample(): void {
    this.spinnerService.show();
    this.spinnerInterval = setTimeout(() => {
      this.spinnerService.hide();
      // this.showSpinner = false;
    }, 5000);
  }

}
