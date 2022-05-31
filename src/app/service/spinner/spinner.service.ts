import { Injectable }           from '@angular/core';
import { ComponentPortal }      from '@angular/cdk/portal';
import { KittSpinnerComponent } from '../../components/kitt-spinner/kitt-spinner.component';
import { Overlay, OverlayRef }  from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay
  ) { }

  // todo set message to spinner?
  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(KittSpinnerComponent);
    if (!this.overlayRef.hasAttached()) {
      const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    }

  }

  public hide() {
    // TODO intentionally delay to allow to view spinner, can remove timeout later
    setTimeout(() => {
      if (!!this.overlayRef) {
        this.overlayRef.detach();
      }
    },700)

  }

}
