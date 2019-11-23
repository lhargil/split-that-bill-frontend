import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-floatie-nav",
  templateUrl: "./floatie-nav.component.html",
  styleUrls: ["./floatie-nav.component.scss"]
})
export class FloatieNavComponent implements OnInit, AfterViewInit {
  @Output() showMenu: EventEmitter<boolean>;
  @ViewChild("floatieNav", { static: false }) floatieNav: ElementRef;
  @ViewChild('floatieBg', {static: false}) floatieBg: ElementRef;

  constructor(private renderer2: Renderer2) {
    this.showMenu = new EventEmitter();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
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
