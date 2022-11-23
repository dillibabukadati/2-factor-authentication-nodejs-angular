import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@full-fledged/alerts';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tfa-dialog',
  templateUrl: './tfa-dialog.component.html',
  styleUrls: ['./tfa-dialog.component.scss'],
})
export class TfaDialogComponent implements OnInit {
  public dataForm: FormGroup;
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<TfaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private alertService: AlertService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }
  onSubmitClick() {
    if (!this.dataForm.valid) {
      return;
    }
    if (this.data.isDisable) {
      this.authService.disableTFA(this.dataForm.value).subscribe(
        (res: any) => {
          const loggedInUser = this.storageService.get('loggedInUser');
          loggedInUser['isTFAEnabled'] = false;
          this.storageService.set('loggedInUser', loggedInUser);
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.alertService.danger(error.message);
        }
      );
    } else {
      this.authService.validateTFAOTP(this.dataForm.value).subscribe(
        (res: any) => {
          const loggedInUser = this.storageService.get('loggedInUser');
          loggedInUser['isTFAEnabled'] = true;
          this.storageService.set('loggedInUser', loggedInUser);
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.alertService.danger(error.message);
        }
      );
    }
  }
}
