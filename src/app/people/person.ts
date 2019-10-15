import { BillItemDto } from '../bills/bills';

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
}

export interface PersonBillItems {
    person: Person;
    bills: BillItemDto[];
}