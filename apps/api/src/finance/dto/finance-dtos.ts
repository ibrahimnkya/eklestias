export class CreateTitheDto {
    branchId: string;
    memberId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
}

export class CreateOfferingDto {
    branchId: string;
    amount: number;
    type: string;
}

export class CreatePledgeDto {
    branchId: string;
    memberId: string;
    campaignName: string;
    targetAmount: number;
    dueDate?: string;
}

export class CreatePledgePaymentDto {
    amount: number;
    paymentMethod: string;
    reference?: string;
}
