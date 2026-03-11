import { PrismaService } from '../prisma/prisma.service';
import { CreateTitheDto, CreateOfferingDto, CreatePledgeDto, CreatePledgePaymentDto } from './dto/finance-dtos';
export declare class FinanceService {
    private prisma;
    constructor(prisma: PrismaService);
    createTithe(createTitheDto: CreateTitheDto): import("@prisma/client").Prisma.Prisma__TitheClient<{
        id: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        memberId: string;
        amount: number;
        paymentMethod: string;
        reference: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createOffering(createOfferingDto: CreateOfferingDto): import("@prisma/client").Prisma.Prisma__OfferingClient<{
        id: string;
        type: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        amount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createPledge(createPledgeDto: CreatePledgeDto): import("@prisma/client").Prisma.Prisma__PledgeClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    addPledgePayment(pledgeId: string, paymentDto: CreatePledgePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        amount: number;
        paymentMethod: string;
        reference: string | null;
        pledgeId: string;
    }>;
    getBranchReport(branchId: string): Promise<{
        totalTithes: number;
        totalOfferings: number;
        totalPledgePayments: number;
        totalRevenue: number;
    }>;
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
}
