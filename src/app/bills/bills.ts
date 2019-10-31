import { Person } from '../people/person';

export interface BillDto {
    id: number;
    establishmentName: string;
    billDate: string;
    remarks: string;
    billItems: BillItemDto[];
    extraCharges: ExtraChargeDto[];
    participants: BillParticipant[];
    billTotal: number;
    billTotalWithoutCharges: number;
    totalCharges: number;
}

export interface BillItemDto {
    id: number;
    description: string;
    unitPrice: { amount: number, currency: string };
    discount?: number;
}

export interface ExtraChargeDto {
    id: number;
    description: string;
    rate: number;
}

export interface BillParticipant {
    id: number;
    person: Person;
}