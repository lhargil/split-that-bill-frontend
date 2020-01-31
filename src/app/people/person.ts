import { BillItemDto, BillDto } from '../bills/bills';

export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  fullname?: string;
  totalPayable: number;
  externalId: string;
}

export interface PersonBillItems {
  person: Person;
  bills: BillItemDto[];
}

export interface PaymentDetail {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
}
