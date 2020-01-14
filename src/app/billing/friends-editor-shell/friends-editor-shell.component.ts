import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WizardService } from 'src/app/wizard/wizard.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { WizardStep } from 'src/app/wizard/models';

@Component({
  selector: 'app-friends-editor-shell',
  templateUrl: './friends-editor-shell.component.html',
  styles: []
})
export class FriendsEditorShellComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(0);
  friendsForm: FormGroup;
  personForm: FormGroup;
  // wizardStep$: Observable<WizardStep>;
  constructor(private fb: FormBuilder, private wizardService: WizardService) {
    this.friendsForm = this.fb.group({
      participants: this.fb.array([{
        id: 1,
        fullname: 'lhar gil',
        selected: true,
        bpId: 1
      }].map(p => {
        return this.fb.group({
          id: [p.id],
          fullname: [p.fullname],
          selected: [p.selected],
          bpId: [p.bpId]
        });
      }))
    });
    this.personForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  wizardStep$ = this.wizardService.wizardStep$;

  ngOnInit() {
    this.wizardService.nextStep$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(nextData => {
        if (nextData == null) return;

        this.formSubmit(_ => nextData.next());
      });
    this.wizardService.backStep$
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(backData => {
        if (backData == null) return;
        this.formSubmit(_ => backData.back());
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private formSubmit(callback) {
    callback();
  }
}
