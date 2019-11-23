import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { merge, fromEvent, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('siteNav', {static: false}) siteNav: ElementRef;
  @ViewChild('siteTitle', {static: false}) siteTitle: ElementRef;
  @ViewChild('siteNavTrigger', {static: false}) siteNavTrigger: ElementRef;

  private destroy$ = new ReplaySubject(0);
  scrolling$ = merge(
    fromEvent(window, 'scroll'),
    fromEvent(window, 'resize')
  ).pipe(
    takeUntil(this.destroy$),
    map(ev => ev)
  );

  visible = false;

  constructor(private renderer2: Renderer2,
    private router: Router) { }

  ngOnInit() {
    this.scrolling$
      .subscribe(() => this.onScroll())    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(ev => ev instanceof NavigationEnd)
      ).subscribe(ev => {
        const activeUrl = (ev as NavigationEnd).url;
        if (activeUrl == '/home' || activeUrl == '/') {
          this.shadowOff();
        } else {
          this.shadowOn();
        }
      });
  }
  
  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 0) {
      this.shadowOn();
    } else {
      this.shadowOff();
    }
  }
  
  hideMenu(invisible: boolean) {
    this.visible = invisible;
  }
  
  showMenu() {
    this.visible = true;
  }
  
  private shadowOff() {
    this.renderer2.removeClass(this.siteNav.nativeElement, 'bg-white');
    this.renderer2.removeClass(this.siteNav.nativeElement, 'shadow-md');
    this.renderer2.addClass(this.siteNav.nativeElement, 'text-white');
    this.renderer2.removeClass(this.siteTitle.nativeElement, 'text-gray-800');
    this.renderer2.removeClass(this.siteNavTrigger.nativeElement, 'text-gray-800');
  }

  private shadowOn() {
    this.renderer2.addClass(this.siteNav.nativeElement, 'bg-white');
    this.renderer2.addClass(this.siteNav.nativeElement, 'shadow-md');
    this.renderer2.addClass(this.siteTitle.nativeElement, 'text-gray-800');
    this.renderer2.removeClass(this.siteNav.nativeElement, 'text-white');
    this.renderer2.addClass(this.siteNavTrigger.nativeElement, 'text-gray-800');
  }
}
