export interface BillDto {
    id: number;
    establishmentName: string;
    billDate: string;
    remarks: string;
    billItems: BillItemDto[];
    extraCharges: ExtraChargeDto[];
}

export interface BillItemDto {
    id: number;
    description: string;
    unitPrice: { amount: number, currency: string };
}

export interface ExtraChargeDto {
    id: number;
    description: string;
    rate: number;
}