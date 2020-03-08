import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  features = [{
    id: 1,
    heading: 'List',
    image: this.domSanitizer.bypassSecurityTrustHtml('<svg class="icon h-8 block mr-0 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"/></svg>'),
    description: 'List the items that you and your friends have partaken.'
  }, {
    id: 2,
    heading: 'Split',
    image: this.domSanitizer.bypassSecurityTrustHtml('<svg class="icon h-8 block mr-0 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" /></svg>'),
    description: 'Assign each of the bill items to each of your friends.'
  }, {
    id: 3,
    heading: 'Generate',
    image: this.domSanitizer.bypassSecurityTrustHtml('<svg class="icon h-8 block mr-0 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z" /></svg>'),
    description: 'Generate the receipt on the fly then send your friends their payables.'
  },];
  constructor(private domSanitizer: DomSanitizer, private meta: Meta) {
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: '@splitthatbill' });
    this.meta.addTag({ name: 'twitter:title', content: 'Split that bill' });
    this.meta.addTag({ name: 'twitter:description', content: 'An easy-to-use bill splitter app powered by Angular and ASP.NET CORE.' });
    this.meta.addTag({ name: 'twitter:image', content: `${environment.siteUrl}/assets/images/thumbnail.png` });
    this.meta.addTags([
      { name: 'robots', content: 'INDEX, FOLLOW' },
      { name: 'author', content: 'lhar santillan gil' },
      { name: 'keywords', content: 'TypeScript, Angular, ASP.NET CORE, dotnet, Angular Universal, Prerender, csharp, bill splitter, split that bill, easy split' },
      { name: 'date', content: '2020-03-08', scheme: 'YYYY-MM-DD' },
      { httpEquiv: 'Content-Type', content: 'text/html' },
      { property: 'og:title', content: 'Split that bill' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url', content: `${environment.siteUrl}`
      },
      {
        property: 'og:description', content: 'An easy-to-use bill splitter app powered by Angular and ASP.NET CORE.'
      },
      {
        property: 'og:site_name', content: 'splitthatbill app'
      },
      { property: 'og:image', content: `${environment.siteUrl}/assets/images/thumbnail.png` },
      { charset: 'UTF-8' }
    ]);
  }

  ngOnInit() {
  }

}
