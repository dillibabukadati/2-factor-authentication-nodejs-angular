import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { apiConfig } from 'src/api.config';
import { CommonService } from 'src/app/shared/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CommonService {
  API_ENDPOINT: string;
  constructor(private httpClient: HttpClient) {
    super();
    this.API_ENDPOINT = environment.api_endpoint;
  }

  login(payload: any) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.login}`, payload)
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }

  checkIfTFAEnabled(payload: any) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.checkIfTFAEnabled}`, payload)
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
  enableTFA() {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.enableTFA}`, {})
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
  disableTFA(payload) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.disableTFA}`, payload)
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
  validateTFAOTP(payload: any) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.validateTFAOTP}`, payload)
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
  logout() {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.logout}`, {})
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
  register(value: any) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.register}`, value)
      .pipe(
        map((response) => response),
        catchError((err) => throwError(err))
      );
  }
}
