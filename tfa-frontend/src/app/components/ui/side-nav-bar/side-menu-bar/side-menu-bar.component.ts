import {Component, OnInit} from '@angular/core';
import {MenuItem} from "./side-bar-menu-model";
import {sideMenu} from "../side-menu-items";

@Component({
  selector: 'app-side-menu-bar',
  templateUrl: './side-menu-bar.component.html',
  styleUrls: ['./side-menu-bar.component.scss']
})
export class SideMenuBarComponent implements OnInit {

  sideMenu: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.sideMenu = sideMenu;
  }

}
