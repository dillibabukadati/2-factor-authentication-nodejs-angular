import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../side-menu-bar/side-bar-menu-model";

@Component({
  selector: 'app-side-bar-menu-group',
  templateUrl: './side-bar-menu-group.component.html',
  styleUrls: ['./side-bar-menu-group.component.scss']
})
export class SideBarMenuGroupComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
