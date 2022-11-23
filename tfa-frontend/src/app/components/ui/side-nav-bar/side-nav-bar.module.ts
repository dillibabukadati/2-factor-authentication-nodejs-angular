import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideBarMenuDeviderComponent} from "./side-bar-menu-devider/side-bar-menu-devider.component";
import {SideBarMenuCollapsableComponent} from "./side-bar-menu-collapsable/side-bar-menu-collapsable.component";
import {SideBarMenuGroupComponent} from "./side-bar-menu-group/side-bar-menu-group.component";
import {SideBarMenuItemComponent} from "./side-bar-menu-item/side-bar-menu-item.component";
import {SideMenuBarComponent} from "./side-menu-bar/side-menu-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    SideBarMenuCollapsableComponent,
    SideBarMenuDeviderComponent,
    SideBarMenuGroupComponent,
    SideBarMenuItemComponent,
    SideMenuBarComponent
  ],
  exports: [
    SideMenuBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ]
})
export class SideNavBarModule {
}
