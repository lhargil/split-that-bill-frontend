import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel } from '@angular/router';
import { tap, takeUntil, debounceTime } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { ReplaySubject, fromEvent } from 'rxjs';
import { AppService } from './app.service';
import { ContentHostDirective } from './shared/directives/content-host/content-host.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  title = 'splitthatbill';

  constructor(private router: Router, private loaderService: LoaderService, private appService: AppService) { }
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
