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

  hey = __Yoyo__;

  constructor(private router: Router, private loaderService: LoaderService, private appService: AppService) { }
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  ngOnInit() {
    console.log(this.hey);
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        tap(ev => {
          if (ev instanceof RouteConfigLoadStart || ev instanceof NavigationStart) {
            this.loaderService.show();
          } else if (ev instanceof RouteConfigLoadEnd || ev instanceof NavigationEnd || ev instanceof NavigationCancel) {
            this.loaderService.hide();
          }
        })
      ).subscribe();
    this.appService.getStarted$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => this.router.navigate(['/billing']));


  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
