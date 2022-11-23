import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/ui/auth/auth.guard';
import { SignUpComponent } from './components/ui/auth/sign-up/sign-up.component';
import { LayoutComponent } from './components/ui/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/ui/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
