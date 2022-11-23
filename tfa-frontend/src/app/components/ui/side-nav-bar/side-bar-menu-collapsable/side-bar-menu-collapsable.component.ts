import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../side-menu-bar/side-bar-menu-model";

@Component({
  selector: 'app-side-bar-menu-collapsable',
  templateUrl: './side-bar-menu-collapsable.component.html',
  styleUrls: ['./side-bar-menu-collapsable.component.scss']
})
export class SideBarMenuCollapsableComponent implements OnInit {
  @Input() item: MenuItem;
  isExpanded: any = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
