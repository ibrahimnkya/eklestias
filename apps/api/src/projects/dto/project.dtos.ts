export class CreateProjectDto {
    organizationId: string;
    branchId?: string;
    name: string;
    description?: string;
    budget: number;
}

export class AddProjectContributionDto {
    memberId?: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
}

export class AddProjectExpenseDto {
    amount: number;
    description: string;
}
