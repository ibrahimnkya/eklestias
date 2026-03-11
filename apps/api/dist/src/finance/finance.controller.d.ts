import { FinanceService } from './finance.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { CreateTitheDto, CreateOfferingDto, CreatePledgeDto, CreatePledgePaymentDto } from './dto/finance-dtos';
export declare class FinanceController {
    private readonly financeService;
    private readonly auditLogsService;
    constructor(financeService: FinanceService, auditLogsService: AuditLogsService);
    getSummary(query: any): Promise<{
        totalTithes: number;
        totalOfferings: number;
        totalPledges: number;
        totalRevenue: number;
    }>;
    getRecords(query: any): Promise<({
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        };
        member: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
            branchId: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            gender: string | null;
            maritalStatus: string | null;
            occupation: string | null;
            baptismStatus: boolean;
            emergencyContact: string | null;
            photoUrl: string | null;
            status: import("@prisma/client").$Enums.MemberStatus;
            joinDate: Date;
            deletedAt: Date | null;
            departmentId: string | null;
            registeredById: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        memberId: string;
        amount: number;
        paymentMethod: string;
        reference: string | null;
    })[] | ({
        branch: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            address: string | null;
        };
    } & {
        id: string;
        type: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        amount: number;
    })[] | ({
        pledge: {
            member: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                organizationId: string;
                address: string | null;
                branchId: string;
                firstName: string;
                lastName: string;
                phone: string | null;
                gender: string | null;
                maritalStatus: string | null;
                occupation: string | null;
                baptismStatus: boolean;
                emergencyContact: string | null;
                photoUrl: string | null;
                status: import("@prisma/client").$Enums.MemberStatus;
                joinDate: Date;
                deletedAt: Date | null;
                departmentId: string | null;
                registeredById: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            branchId: string;
            status: string;
            memberId: string;
            campaignName: string;
            targetAmount: number;
            totalPaid: number;
            dueDate: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        date: Date;
        amount: number;
        paymentMethod: string;
        reference: string | null;
        pledgeId: string;
    })[]>;
    getReport(query: any): Promise<{
        totalTithes: number;
        totalOfferings: number;
        totalPledges: number;
        totalRevenue: number;
    }>;
    createTithe(createTitheDto: CreateTitheDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        memberId: string;
        amount: number;
        paymentMethod: string;
        reference: string | null;
    }>;
    createOffering(createOfferingDto: CreateOfferingDto, req: any): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        amount: number;
    }>;
    createPledge(createPledgeDto: CreatePledgeDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        branchId: string;
        status: string;
        memberId: string;
        campaignName: string;
        targetAmount: number;
        totalPaid: number;
        dueDate: Date | null;
    }>;
    addPledgePayment(id: string, paymentDto: CreatePledgePaymentDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        amount: number;
        paymentMethod: string;
        reference: string | null;
        pledgeId: string;
    }>;
}
