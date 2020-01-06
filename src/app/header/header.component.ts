import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible: boolean;

  constructor(private renderer2: Renderer2) {
    this.visible = false;
  }

  ngOnInit() {
  }

  showMenu(isVisible) {
    this.visible = isVisible;
  }
}
