import { BillItemDto, BillDto } from '../bills/bills';

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    fullname?: string;
}

export interface PersonBillItems {
    person: Person;
    bills: BillItemDto[];
}

export interface Billing {
    bill: BillDto;
    peopleBilling: PersonBillItems;
}