import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../side-menu-bar/side-bar-menu-model";

@Component({
  selector: 'app-side-bar-menu-item',
  templateUrl: './side-bar-menu-item.component.html',
  styleUrls: ['./side-bar-menu-item.component.scss']
})
export class SideBarMenuItemComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
