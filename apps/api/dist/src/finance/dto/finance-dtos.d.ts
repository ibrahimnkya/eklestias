export declare class CreateTitheDto {
    branchId: string;
    memberId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
}
export declare class CreateOfferingDto {
    branchId: string;
    amount: number;
    type: string;
}
export declare class CreatePledgeDto {
    branchId: string;
    memberId: string;
    campaignName: string;
    targetAmount: number;
    dueDate?: string;
}
export declare class CreatePledgePaymentDto {
    amount: number;
    paymentMethod: string;
    reference?: string;
}
