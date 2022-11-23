import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './shared/icons.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideNavBarModule } from './components/ui/side-nav-bar/side-nav-bar.module';
import { TopHeaderModule } from './components/ui/top-header/top-header.module';
import { LayoutComponent } from './components/ui/layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './components/ui/auth/auth.guard';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { ErrorInterceptor } from './interceptors/error-interceptor.service';
import { AlertModule } from '@full-fledged/alerts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    IconsModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SideNavBarModule,
    TopHeaderModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({
      maxMessages: 5,
      timeout: 5000,
      positionX: 'right',
      positionY: 'top',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
