import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel } from '@angular/router';
import { tap, takeUntil, debounceTime } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { ReplaySubject, fromEvent } from 'rxjs';
import { AppService } from './app.service';
import { ContentHostDirective } from './shared/directives/content-host/content-host.directive';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  title = 'splitthatbill';

  constructor(private router: Router, private loaderService: LoaderService, private appService: AppService, private meta: Meta) {
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
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  ngOnInit() {
    this.router.events
      .pipe(
        tap(ev => {
          if (ev instanceof RouteConfigLoadStart || ev instanceof NavigationStart) {
            this.loaderService.show();
          } else if (ev instanceof RouteConfigLoadEnd || ev instanceof NavigationEnd || ev instanceof NavigationCancel) {
            this.loaderService.hide();
          }
        }),
        takeUntil(this.destroyed$),
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
