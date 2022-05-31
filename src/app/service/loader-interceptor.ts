import { Injectable }                                           from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { HttpLoaderService }    from './http-loader/http-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(
    private loaderService: HttpLoaderService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderService.setHttpProgressStatus(true);
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.setHttpProgressStatus(false);
        }
      }));
  }
}
