import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { Subject } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  constructor(private router: Router, private loaderService: LoaderService, private meta: Meta) {
    this.setMeta();
  }

  private setMeta() {
    const siteThumbnail = `${environment.siteUrl}/assets/images/thumbnail.png`;

    const format = 'yyyy-MM-dd';
    const utcDateInString = this.getCurrentDate(DateTime.local(), format);

    this.meta.addTags([
      { name: 'robots', content: 'INDEX, FOLLOW' },
      { name: 'author', content: 'lhar santillan gil' },
      { name: 'keywords', content: 'TypeScript, Angular, ASP.NET CORE, dotnet, Angular Universal, Prerender, csharp, bill splitter, split that bill, easy split, splitter app' },
      { name: 'date', content: utcDateInString, scheme: format.toUpperCase() },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@splitthatbill' },
      { name: 'twitter:title', content: 'Split that bill' },
      { name: 'twitter:description', content: 'An easy-to-use bill splitter app for people who love convenience and transparency.' },
      { name: 'twitter:image', content: siteThumbnail },
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
      { property: 'og:image', content: siteThumbnail },
      { charset: 'UTF-8' },
    ]);
  }

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
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getCurrentDate(currentDate: DateTime, format: string) {
    return currentDate.toFormat(format);
  }
}
