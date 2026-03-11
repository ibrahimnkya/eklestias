export declare class CreateProjectDto {
    organizationId: string;
    branchId?: string;
    name: string;
    description?: string;
    budget: number;
}
export declare class AddProjectContributionDto {
    memberId?: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
}
export declare class AddProjectExpenseDto {
    amount: number;
    description: string;
}
