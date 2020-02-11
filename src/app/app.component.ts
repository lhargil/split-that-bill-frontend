import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel } from '@angular/router';
import { tap, takeUntil, debounceTime } from 'rxjs/operators';
import { LoaderService } from './shared/loader/loader.service';
import { ReplaySubject, fromEvent } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { AppService } from './app.service';
import { ContentHostDirective } from './shared/directives/content-host/content-host.directive';
import { ModalService } from './shared/modal/modal.service';
import { PersonEditorShellComponent } from './billing/person-editor-shell/person-editor-shell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  title = 'splitthatbill';



  constructor(private router: Router, private loaderService: LoaderService, public authService: AuthService, private appService: AppService) { }
  @ViewChild(ContentHostDirective, { static: true }) contentHost: ContentHostDirective;

  ngOnInit() {
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
