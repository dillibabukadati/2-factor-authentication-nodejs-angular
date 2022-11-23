import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(LOCAL_STORAGE) private storageService: StorageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.storageService.clear();
          this.router.navigate(['/login']);
        }
        const error = err.error.message ||err.error.devMessage || err.statusText;
        return throwError(error);
      })
    );
  }
}
