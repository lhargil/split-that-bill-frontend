import { Person } from '../people/person';

export interface BillDto {
  id: number;
  establishmentName: string;
  billDate: string;
  remarks: string;
  externalId: string;
  billItems: BillItemDto[];
  extraCharges: ExtraChargeDto[];
  participants: BillParticipant[];
  billTotal: number;
  billTotalWithoutCharges: number;
  totalCharges: number;
  currency: string;
}

export interface BillItemDto {
  id: number;
  description: string;
  unitPrice: Money;
  priceWithCharges: Money;
  discount?: number;
}

export interface ExtraChargeDto {
  id: number;
  description: string;
  rate: number;
}

export interface Money {
  amount: number;
  currency: string;
};

export interface BillParticipant {
  id: number;
  person: Person;
  totalPayable: Money;
}
