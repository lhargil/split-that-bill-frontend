import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible: boolean;

  constructor() {
    this.visible = false;
  }

  ngOnInit() {
  }

  hideMenu(invisible: boolean) {
    this.visible = invisible;
  }

  showMenu(isVisible: boolean) {
    this.visible = isVisible;
  }
}
