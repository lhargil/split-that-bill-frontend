import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { merge, fromEvent, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('siteNav') siteNav: ElementRef;
  @ViewChild('siteTitle') siteTitle: ElementRef;
  @ViewChild('siteNavTrigger') siteNavTrigger: ElementRef;

  private destroy$ = new ReplaySubject(0);
  scrolling$ = merge(
    fromEvent(window, 'scroll'),
    fromEvent(window, 'resize')
  ).pipe(
    takeUntil(this.destroy$),
    map(ev => ev)
  );

  visible = false;
  isHome = false;

  constructor(public authService: AuthService, private renderer2: Renderer2, private router: Router) { }

  ngOnInit() {
    this.scrolling$.subscribe(() => this.onScroll());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(
          ev => ev instanceof NavigationEnd || ev instanceof NavigationStart
        )
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

  private shadowOff() {
    this.renderer2.removeClass(this.siteNav.nativeElement, 'bg-white');
    this.renderer2.removeClass(this.siteNav.nativeElement, 'shadow-md');
    this.renderer2.addClass(this.siteNav.nativeElement, 'text-white');
  }

  private shadowOn() {
    this.renderer2.addClass(this.siteNav.nativeElement, 'bg-white');
    this.renderer2.addClass(this.siteNav.nativeElement, 'shadow-md');
    this.renderer2.removeClass(this.siteNav.nativeElement, 'text-white');
  }
}
