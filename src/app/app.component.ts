import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  title = 'splitthatbill';

  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        tap(ev => {
          if (ev instanceof NavigationStart) {
            this.loaderService.show();
          } else {
            this.loaderService.hide();
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
