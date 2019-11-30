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
} from "@angular/core";
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: "app-floatie-nav",
  templateUrl: "./floatie-nav.component.html",
  styleUrls: ["./floatie-nav.component.scss"]
})
export class FloatieNavComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() showMenu: EventEmitter<boolean>;
  @ViewChild("floatieNav", { static: false }) floatieNav: ElementRef;
  @ViewChild('floatieBg', {static: false}) floatieBg: ElementRef;

  private isDestroyed$ = new ReplaySubject(0);
  clickOut$ = fromEvent(window, 'click')
    .pipe(
      takeUntil(this.isDestroyed$),
      map(ev => ev)
    );
  resize$ = fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.isDestroyed$),
        map(ev => ev)
      );

  constructor(private renderer2: Renderer2) {
    this.showMenu = new EventEmitter();
  }

  ngOnInit() {
    setTimeout(() => {
      this.clickOut$
      .subscribe(ev => {
        const clickedInside = this.floatieNav.nativeElement.contains(ev.target);
        if (!clickedInside) {
          this.hide();
        }
      });  
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  ngAfterViewInit() {
    this.resize$
      .subscribe(() => this.hide());

    this.show();
  }

  show() {
    setTimeout(() => {
      this.renderer2.removeClass(this.floatieNav.nativeElement, "floatie-off");
      this.renderer2.addClass(this.floatieNav.nativeElement, "floatie-on");
      this.renderer2.addClass(this.floatieBg.nativeElement, 'floatie-bg');
    }, 50);
  }

  hide() {
    this.renderer2.addClass(this.floatieNav.nativeElement, "floatie-off");
    this.renderer2.removeClass(this.floatieNav.nativeElement, "floatie-on");
    this.renderer2.removeClass(this.floatieBg.nativeElement, 'floatie-bg');
    setTimeout(() => {
      this.showMenu.emit(false);
    }, 201);
  }
}
