import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { merge, fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil, map, filter, tap } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('header') header: ElementRef;
  menuIsVisible: boolean;
  private destroyed$ = new ReplaySubject(0);
  scrolling$ = merge(
    fromEvent(window, 'scroll'),
    fromEvent(window, 'resize')
  ).pipe(
    map(ev => ev),
  );
  isHome = true;

  constructor(private renderer2: Renderer2, private router: Router, private appService: AppService) {
    this.menuIsVisible = false;
    this.router.events
      .pipe(
        filter(
          ev => ev instanceof NavigationEnd || ev instanceof NavigationStart
        ),
        takeUntil(this.destroyed$),
      )
      .subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          const activeUrl = (ev as NavigationEnd).url;
          this.isHome = activeUrl == '/home' || activeUrl == '/';
          if (this.isHome) {
            this.shadowOff();
          } else {
            this.shadowOn();
          }
        }
      });
  }

  ngOnInit() {
    this.scrolling$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.onScroll());
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGetStarted() {
    this.appService.getStarted();
  }

  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (!this.isHome) {
      this.shadowOn();
    } else if (scrollY > 0) {
      this.shadowOn();
    } else {
      this.shadowOff();
    }
  }

  showMenu(isVisible: boolean) {
    this.menuIsVisible = isVisible;
  }

  private shadowOff() {
    if (!this.header) { return; }
    this.renderer2.removeClass(this.header.nativeElement, 'bg-white');
    this.renderer2.removeClass(this.header.nativeElement, 'shadow-md');
    this.renderer2.addClass(this.header.nativeElement, 'text-white');
  }

  private shadowOn() {
    if (!this.header) { return; }
    this.renderer2.addClass(this.header.nativeElement, 'bg-white');
    this.renderer2.addClass(this.header.nativeElement, 'shadow-md');
    this.renderer2.removeClass(this.header.nativeElement, 'text-white');
  }
}
