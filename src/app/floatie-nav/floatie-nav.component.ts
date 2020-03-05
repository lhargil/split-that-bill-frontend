import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-floatie-nav',
  templateUrl: './floatie-nav.component.html',
  styleUrls: ['./floatie-nav.component.scss']
})
export class FloatieNavComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() showMenu: EventEmitter<boolean>;
  @ViewChild('floatieNav') floatieNav: ElementRef;
  @ViewChild('floatieBg') floatieBg: ElementRef;

  private destroyed$ = new ReplaySubject(0);

  isBrowser: boolean;
  constructor(private renderer2: Renderer2, private router: Router, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.showMenu = new EventEmitter();
    this.router.events
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(_ => {
        this.hide();
      });
  }

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        fromEvent(window, 'resize')
          .pipe(
            map(ev => ev),
            takeUntil(this.destroyed$),
          )
          .subscribe(ev => {
            const clickedInside = this.floatieNav.nativeElement.contains(ev.target);
            if (!clickedInside) {
              this.hide();
            }
          });
      });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      fromEvent(window, 'resize')
        .pipe(
          map(ev => ev),
          takeUntil(this.destroyed$),
        )
        .subscribe(() => this.hide());
    }

    this.show();
  }

  show() {
    setTimeout(() => {
      this.renderer2.removeClass(this.floatieNav.nativeElement, 'floatie-off');
      this.renderer2.addClass(this.floatieNav.nativeElement, 'floatie-on');
      this.renderer2.addClass(this.floatieBg.nativeElement, 'floatie-bg');
    }, 50);
  }

  hide() {
    this.renderer2.addClass(this.floatieNav.nativeElement, 'floatie-off');
    this.renderer2.removeClass(this.floatieNav.nativeElement, 'floatie-on');
    this.renderer2.removeClass(this.floatieBg.nativeElement, 'floatie-bg');
    setTimeout(() => {
      this.showMenu.emit(false);
    }, 201);
  }
}
