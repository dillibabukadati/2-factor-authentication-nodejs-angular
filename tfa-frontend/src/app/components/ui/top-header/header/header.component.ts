import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TfaDialogComponent } from '../../auth/tfa-dialog/tfa-dialog.component';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isTFAEnabled = false;
  constructor(
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    console.log(this.storageService.get('loggedInUser'))
    this.isTFAEnabled = this.storageService.get('loggedInUser').isTFAEnabled;
  }

  onMenuClick() {
    let sideMenu = document.getElementById('sideMenuBar');
    let header = document.getElementById('header');
    let bodyContent = document.getElementById('body-content');
    console.log(bodyContent);
    if (!header) {
      return;
    }
    if (!sideMenu) {
      return;
    }
    sideMenu.style.setProperty('width', '0px !important');
    if (sideMenu.offsetWidth > 1) {
      sideMenu.style.width = '0px';
      header.style.width = '100vw';
      bodyContent.style.left = '0';
    } else {
      sideMenu.style.width = '16rem';
      header.style.width = 'calc(100% - 16rem)';
      bodyContent.style.left = '16rem';
    }
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.storageService.clear();
        this.router.navigate(['/login']);
      },
      (err) => {
        this.storageService.clear();
        console.error(err);
      }
    );
  }
  onEnableTFAClick() {
    this.authService.enableTFA().subscribe(
      (res: any) => {
        const dialogRef = this.dialog.open(TfaDialogComponent, {
          data: res.data.token,
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          this.isTFAEnabled =
            this.storageService.get('loggedInUser').isTFAEnabled;
        });
      },
      (error) => {
        console.error(error);
        this.alertService.danger(error);
      }
    );
  }
  onDisableTFAClick() {
    const dialogRef = this.dialog.open(TfaDialogComponent, {
      data: { isDisable: true },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isTFAEnabled = this.storageService.get('loggedInUser').isTFAEnabled;
    });
  }
}
