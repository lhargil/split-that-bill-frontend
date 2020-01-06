import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [{
    id: 1,
    name: 'Home',
    url: '/',
    iconHtml: 'M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z'
  }, {
    id: 2,
    name: 'Features',
    url: '/features',
    iconHtml: 'M0 4c0-1.1.9-2 2-2h15a1 1 0 0 1 1 1v1H2v1h17a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm16.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
  }, {
    id: 3,
    name: 'Documentation',
    url: '/docs',
    iconHtml: 'M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z'
  }, {
    id: 4,
    name: 'Contact',
    url: '/contact',
    iconHtml: 'M20 18.35V19a1 1 0 0 1-1 1h-2A17 17 0 0 1 0 3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4c0 .56-.31 1.31-.7 1.7L3.16 8.84c1.52 3.6 4.4 6.48 8 8l2.12-2.12c.4-.4 1.15-.71 1.7-.71H19a1 1 0 0 1 .99 1v3.35z'
  }];
  constructor() { }

  ngOnInit() {
  }

}
