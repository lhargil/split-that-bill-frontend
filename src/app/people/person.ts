import { BillItemDto, BillDto } from '../bills/bills';

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    fullname?: string;
    totalPayable: number;
}

export interface PersonBillItems {
    person: Person;
    bills: BillItemDto[];
}