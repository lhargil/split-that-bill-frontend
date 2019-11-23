import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { merge, fromEvent, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
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
  toggleClass = 'from-right';

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.scrolling$
      .subscribe(() => this.onScroll())
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 0) {
      this.renderer2.addClass(this.siteNav.nativeElement, 'bg-white');
      this.renderer2.addClass(this.siteNav.nativeElement, 'shadow-md');
      this.renderer2.addClass(this.siteTitle.nativeElement, 'text-gray-800');
      this.renderer2.addClass(this.siteNavTrigger.nativeElement, 'text-gray-800');
    } else {
      this.renderer2.removeClass(this.siteNav.nativeElement, 'bg-white');
      this.renderer2.removeClass(this.siteNav.nativeElement, 'shadow-md');
      this.renderer2.removeClass(this.siteTitle.nativeElement, 'text-gray-800');
      this.renderer2.removeClass(this.siteNavTrigger.nativeElement, 'text-gray-800');
    }
  }

  hideMenu(invisible: boolean) {
    this.visible = invisible;
  }

  showMenu() {
    this.visible = true;
  }
}
