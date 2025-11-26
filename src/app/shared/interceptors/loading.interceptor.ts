import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.ngxSpinnerService.show();

    // Check login time before request proceeds
    const loginTimeStr = localStorage.getItem('loginTime');

    if (loginTimeStr) {
      const loginTime = new Date(loginTimeStr);
      const now = new Date();

      const diffInMs = now.getTime() - loginTime.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours > 2) {
        localStorage.clear();
        this.router.navigate(['/signin']);
        this.ngxSpinnerService.hide();
        return new Observable<HttpEvent<unknown>>(); // cancel the request
      }
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.ngxSpinnerService.hide();
      })
    );
  }
}
