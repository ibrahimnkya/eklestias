import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(organizationId: string): Promise<{
        totalMembers: number;
        activeMembers: number;
        monthGiving: number;
    }>;
}
