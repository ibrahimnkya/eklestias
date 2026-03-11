export class CreateMemberDto {
    organizationId: string;
    branchId: string;
    firstName: string;
    lastName: string;
    phone?: string;
    gender?: string;
    address?: string;
    maritalStatus?: string;
    occupation?: string;
    baptismStatus?: boolean;
    emergencyContact?: string;
    departmentId?: string;
}
