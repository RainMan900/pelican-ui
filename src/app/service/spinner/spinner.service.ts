import { Injectable }          from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private showSubject = new Subject<boolean>();

  constructor() {
  }

  showSpinner(): void {
    this.showSubject.next(true);
  }

  hideSpinner(): void {
    this.showSubject.next(false);
  }

  getSpinnerObs(): Observable<boolean> {
    return this.showSubject.asObservable();
  }

}
