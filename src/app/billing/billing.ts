import { BillDto, BillItemDto } from '../bills/bills';
import { Person } from '../people/person';

export interface Billing {
  bill: BillDto;
  peopleBilling: PeopleBilling[];
}

export interface PeopleBilling {
  billItem: BillItemDto;
  person: Person;
}
