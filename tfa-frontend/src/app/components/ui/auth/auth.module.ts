import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from 'src/app/shared/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TfaDialogComponent } from './tfa-dialog/tfa-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [SignUpComponent, SignInComponent, TfaDialogComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MatIconModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
})
export class AuthModule {}
