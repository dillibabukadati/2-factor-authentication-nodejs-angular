import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrlsRegex: RegExp[];
  private excludedUrls = ['.svg'];
  constructor(private spinner: NgxSpinnerService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedRequest: any = {};
    if (localStorage.getItem('loggedInUser')) {
      const userDetails = localStorage.getItem('loggedInUser');
      clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `${userDetails ? JSON.parse(userDetails).accessToken : ''}`
        ),
      });
    } else {
      clonedRequest = request.clone({
        headers: request.headers,
      });
    }
    // send the newly created request
    this.spinner.show();
    return next.handle(clonedRequest).pipe(finalize(() => this.spinner.hide()));
  }
}
