import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
import { map, tap, switchMap, concatMap } from 'rxjs/operators';
import { PaymentDetail } from '../people/person';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  private currentUser = {
    id: 1,
    lastname: 'gil',
    firstname: 'lhar'
  };
  constructor(private accountsService: AccountsService,
    private fb: FormBuilder) { }
  vm$ = this.accountsService.getPaymentDetails(this.currentUser.id)
    .pipe(
      map(pd => {
        const form = this.createForm(pd);
        return {
          form,
          paymentDetailsList: pd,
          paymentDetails: form.get('paymentDetails') as FormArray
        };
      })
    )

  ngOnInit() {
  }

  createForm(paymentDetails: PaymentDetail[]) {
    return this.fb.group({
      paymentDetails: this.fb.array(paymentDetails.map(pd => {
        return this.createBankDetails(pd);
      }), [Validators.required])
    });
  }

  createBankDetails(pd: PaymentDetail) {
    return this.fb.group({
      id: [pd.id],
      bankName: [pd.bankName, [Validators.required]],
      accountName: [pd.accountName, [Validators.required]],
      accountNumber: [pd.accountNumber, [Validators.required]]
    });
  }

  addBankAccount(vm: { form: FormGroup, paymentDetailsList: PaymentDetail[], paymentDetails: FormArray }) {
    vm.paymentDetails.push(this.createBankDetails({
      id: 0,
      bankName: '',
      accountName: '',
      accountNumber: ''
    }));
  }

  patchBankDetails(vm: { form: FormGroup, paymentDetailsList: PaymentDetail[], paymentDetails: FormArray }, paymentDetail: PaymentDetail) {
    vm.paymentDetailsList = [...vm.paymentDetailsList, paymentDetail];
    vm.paymentDetails.patchValue(vm.paymentDetailsList);
  }

  onDelete(vm: { form: FormGroup, paymentDetailsList: PaymentDetail[], paymentDetails: FormArray }, index: number) {
    const paymentDetailsToDelete = vm.paymentDetails.value.find((_, i) => i == index);
    if (paymentDetailsToDelete == null) {
      return;
    }
    this.accountsService.deletePaymentDetails(this.currentUser.id, paymentDetailsToDelete.id)
      .pipe(
        tap(() => {
          vm.paymentDetails.removeAt(index);
          vm.paymentDetailsList = [...vm.paymentDetailsList.filter((_, i) => i != index)]
        })
      ).subscribe();
  }

  onSubmit(vm: { form: FormGroup, paymentDetailsList: PaymentDetail[], paymentDetails: FormArray }) {
    if (vm.form.invalid) {
      console.log('Invalid form')
      return;
    }

    const paymentDetails = vm.paymentDetails.value.map(pd => {
      return {
        person: this.currentUser,
        paymentDetail: {
          id: pd.id,
          bankName: pd.bankName,
          accountName: pd.accountName,
          accountNumber: pd.accountNumber
        }
      };
    });
    combineLatest(paymentDetails.map(
      pd => {
        if (pd.paymentDetail.id == 0) {
          return this.accountsService.createPaymentDetails(this.currentUser.id, pd)
            .pipe(
              switchMap(createdResult => this.accountsService.getSinglePaymentDetails(this.currentUser.id, createdResult.paymentDetails.id)),
              tap(result => this.patchBankDetails(vm, result))
            );
        } else {
          return this.accountsService.updatePaymentDetails(this.currentUser.id, pd.paymentDetail.id, pd);
        }
      }
    )).subscribe(() => {
      console.log('Bank accounts updated.');
    })
  }
}
