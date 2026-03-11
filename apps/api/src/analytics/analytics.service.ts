import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getDashboardStats(organizationId: string) {
        const totalMembers = await this.prisma.member.count({
            where: { organizationId, deletedAt: null },
        });

        const activeMembers = await this.prisma.member.count({
            where: { organizationId, deletedAt: null, status: 'ACTIVE_MEMBER' },
        });

        const currentMonth = new Date();
        currentMonth.setDate(1);

        const tithes = await this.prisma.tithe.aggregate({
            where: { member: { organizationId }, date: { gte: currentMonth } },
            _sum: { amount: true },
        });

        const offerings = await this.prisma.offering.aggregate({
            where: { branch: { organizationId }, date: { gte: currentMonth } },
            _sum: { amount: true },
        });

        return {
            totalMembers,
            activeMembers,
            monthGiving: (tithes._sum.amount || 0) + (offerings._sum.amount || 0),
        };
    }
}
