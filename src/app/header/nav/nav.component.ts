import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links: {[key: string]: string}[];
  hidden = true;
  constructor() { }

  ngOnInit() {
    this.links = [
      { key: 'Home', value: '/' },
      { key: 'Friends', value: '/people' },
      { key: 'Bills', value: '/bills' },
      { key: 'My account', value: '/accounts' }
    ];
  }

  toggle() {
    this.hidden = !this.hidden;
  }
}
