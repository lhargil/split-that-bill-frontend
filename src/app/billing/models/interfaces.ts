export interface BillItem {
  id: number;
  description: string;
  amount: number;
  discount?: number;
}

export interface ExtraCharge {
  id: number;
  amount: number;
  description: string;
}

export interface Currency {
  code: string;
  name: string;
}
