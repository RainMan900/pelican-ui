import { Component, OnInit }     from '@angular/core';
import { SpinnerService }        from "../../service/spinner/spinner.service";
import { SpinnerOverlayService } from '../../service/spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  showSpinner = true;
  spinnerInterval?: number;

  constructor(
    private spinnerService: SpinnerService,
    private spinnerOverlay: SpinnerOverlayService,
  ) {
  }

  ngOnInit(): void {
  }

  showSpinnerExample(): void {
    this.spinnerOverlay.show();
    this.spinnerInterval = setTimeout(() => {
      this.spinnerOverlay.hide();
      // this.showSpinner = false;
    }, 5000);
  }

}
