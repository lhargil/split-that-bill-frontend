import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floatie-nav',
  templateUrl: './floatie-nav.component.html',
  styleUrls: ['./floatie-nav.component.scss']
})
export class FloatieNavComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() showMenu: EventEmitter<boolean>;
  @ViewChild('floatieNav', { static: false }) floatieNav: ElementRef;
  @ViewChild('floatieBg', { static: false }) floatieBg: ElementRef;

  private destroyed$ = new ReplaySubject(0);
  clickOut$ = fromEvent(window, 'click')
    .pipe(
      map(ev => ev)
    );
  resize$ = fromEvent(window, 'resize')
    .pipe(
      map(ev => ev)
    );

  constructor(private renderer2: Renderer2, private router: Router) {
    this.showMenu = new EventEmitter();
    this.router.events
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(_ => {
        this.hide();
      });
  }

  ngOnInit() {
    setTimeout(() => {
      this.clickOut$
        .pipe(
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

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.resize$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.hide());

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
